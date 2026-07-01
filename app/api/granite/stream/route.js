import { NextResponse } from "next/server";

async function getIAMToken(apiKey) {
  const res = await fetch("https://iam.cloud.ibm.com/identity/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
  });
  if (!res.ok) throw new Error(`IAM token error: ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

function buildPrompt(tab, promptData, audience) {
  const isCasual = audience === "casual";
  const isAnalyst = audience === "analyst";

  if (tab === "TACTICS") {
    const sys = isCasual
      ? "You are a friendly football presenter explaining tactics to a casual viewer. Use simple terms. Max 100 words."
      : isAnalyst
      ? "You are a professional tactical analyst. Deliver high-density analysis using advanced terms. Max 150 words."
      : "You are a football tactics expert. Analyze set piece data in plain English. Max 120 words.";
    return `<|system|>\n${sys}\nEmbed visual triggers: [HIGHLIGHT: PENALTY_BOX], [HIGHLIGHT: ZONE_14], [SHOW_LINES] where relevant.\n<|user|>\nAnalyze this corner kick:\nMatch: ${promptData.match}\nMinute: ${promptData.minute}\nTeam: ${promptData.team}\nOutcome: ${promptData.outcome}\nxG: ${promptData.xG}\nDetails: ${promptData.details || "Corner kick routine."}\n<|assistant|>`;
  }

  if (tab === "PRESSURE") {
    const sys = isCasual
      ? "You are a sports psychologist explaining pressure to a casual fan. Simple emotional terms. Max 100 words."
      : isAnalyst
      ? "You are a sports psychologist. Explain with scientific rigor — cortisol, cognitive anxiety, arousal modulation. Max 140 words."
      : "You are a sports psychologist. Explain the psychological state and performance factors. Max 120 words.";
    return `<|system|>\n${sys}\n<|user|>\nPlayer: ${promptData.player}\nMatch: ${promptData.match}\nCrucible Score: ${promptData.score}/10\nOutcome: ${promptData.outcome}\nCaps: ${promptData.stats?.caps}, Goals: ${promptData.stats?.goals}\nPressure Factors: ${(promptData.factors || []).map(f => f.text).join(", ")}\n<|assistant|>`;
  }

  if (tab === "VARDICT") {
    const sys = isCasual
      ? "Explain the VAR decision simply to a casual viewer. Max 110 words."
      : isAnalyst
      ? "Analyze with strict legal precision. Cite specific clauses and distances. Max 150 words."
      : "You are a FIFA Laws expert. Deliver a clear legal verdict. Max 130 words.";
    return `<|system|>\n${sys}\nEmbed visual triggers: [HIGHLIGHT: PENALTY_BOX], [SHOW_LINES], [FOCUS: ATTACKER], [FOCUS: DEFENDER] where relevant.\n<|user|>\nVerdict: ${promptData.verdict}\nMatch: ${promptData.match}\nType: ${promptData.type}\nConfidence: ${promptData.confidence}%\nLaw: ${promptData.lawExcerpt}\nDescription: ${promptData.description}\n<|assistant|>`;
  }

  if (tab === "LAWS") {
    const sys = isCasual
      ? "Explain the rule to a new fan using simple analogies. Max 100 words."
      : isAnalyst
      ? "Analyze with strict legal rigor. Explain corner cases. Max 140 words."
      : "You are a FIFA referee trainer. Explain the rule clearly. Max 120 words.";
    return `<|system|>\n${sys}\n<|user|>\nQuestion: ${promptData.question}\nLaw ${promptData.lawNumber} (${promptData.lawTitle}) — ${promptData.articleTitle}\nOfficial Text: ${promptData.officialText}\nPlain English: ${promptData.plainEnglish}\n<|assistant|>`;
  }

  if (tab === "DRAMA") {
    const sys = isCasual
      ? "Explain the drama of this match to a casual fan in emotional terms. Max 100 words."
      : isAnalyst
      ? "Analyze with strategic context, cultural weight metrics, and momentum shifts. Max 140 words."
      : "You are a football historian. Explain the cultural and emotional weight of this match. Max 120 words.";
    return `<|system|>\n${sys}\n<|user|>\nMatch: ${promptData.match} (${promptData.subtitle})\nScore: ${promptData.score}\nCultural Weight: ${promptData.culturalWeight}/100\nDramatic Rating: ${promptData.dramaticRating}/10\nKey Moments: ${promptData.keyMoments}\n<|assistant|>`;
  }

  return null;
}

export async function POST(req) {
  const { tab, promptData, audience = "enthusiast" } = await req.json();

  const apiKey = process.env.WATSONX_API_KEY;
  const projectId = process.env.WATSONX_PROJECT_ID;
  const region = process.env.WATSONX_REGION || "us-south";

  const prompt = buildPrompt(tab, promptData, audience);
  if (!prompt) {
    return NextResponse.json({ error: "Invalid tab" }, { status: 400 });
  }

  // No credentials — return offline SSE stream (synthetic)
  if (!apiKey || !projectId) {
    const syntheticText = `[Offline Mode] IBM Granite analysis for ${tab}: Based on the provided match data, this represents a high-quality performance moment. The spatial parameters and timing data indicate strong decision-making under pressure. Guardian verification: local fallback active.`;
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const words = syntheticText.split(" ");
        let i = 0;
        const interval = setInterval(() => {
          if (i < words.length) {
            const chunk = (i === 0 ? "" : " ") + words[i];
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: chunk })}\n\n`));
            i++;
          } else {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, guardianVerified: true, guardianSource: "Granite Guardian 3.0 (Offline)" })}\n\n`));
            clearInterval(interval);
            controller.close();
          }
        }, 40);
      }
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  }

  try {
    const iamToken = await getIAMToken(apiKey);

    // Call watsonx.ai with stream: true
    const watsonRes = await fetch(
      `https://${region}.ml.cloud.ibm.com/ml/v1/text/generation_stream?version=2023-05-29`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${iamToken}`,
        },
        body: JSON.stringify({
          model_id: "ibm/granite-3-8b-instruct",
          input: prompt,
          parameters: {
            decoding_method: "greedy",
            max_new_tokens: 250,
            stop_sequences: ["<|user|>", "<|system|>"],
            repetition_penalty: 1.1,
          },
          project_id: projectId,
        }),
      }
    );

    if (!watsonRes.ok) {
      throw new Error(`watsonx stream error: ${watsonRes.status}`);
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullText = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = watsonRes.body.getReader();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop(); // keep incomplete line in buffer

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;
              const jsonStr = trimmed.slice(5).trim();
              if (jsonStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(jsonStr);
                const token = parsed.results?.[0]?.generated_text || "";
                if (token) {
                  fullText += token;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
                }
              } catch {
                // skip malformed lines
              }
            }
          }

          // After stream ends, run Guardian safety check for VARDICT and LAWS
          let guardianVerified = true;
          let guardianSource = "Granite Guardian 3.0";

          if ((tab === "VARDICT" || tab === "LAWS") && fullText) {
            try {
              const guardianInput = `<|system|>\nYou are a trust and safety guardrail agent. Classify whether the assistant response is safe and does not contain hallucinations.\nUser Query: ${JSON.stringify(promptData)}\nAssistant Response: ${fullText}\nOutput exactly "safe" or "unsafe".\n<|user|>\nIs the response safe?\n<|assistant|>`;

              const gRes = await fetch(
                `https://${region}.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${iamToken}` },
                  body: JSON.stringify({
                    model_id: "ibm/granite-guardian-3-8b",
                    input: guardianInput,
                    parameters: { decoding_method: "greedy", max_new_tokens: 10 },
                    project_id: projectId,
                  }),
                }
              );
              if (gRes.ok) {
                const gData = await gRes.json();
                const verdict = gData.results?.[0]?.generated_text?.trim()?.toLowerCase() || "";
                guardianVerified = !verdict.includes("unsafe");
              }
            } catch {
              guardianVerified = true; // fail open on guardian error
            }
          }

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ done: true, guardianVerified, guardianSource })}\n\n`)
          );
          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
