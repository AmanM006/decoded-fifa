import { NextResponse } from "next/server";

/**
 * IBM watsonx.ai — Granite 3.3 API Route
 * Flow: API key → IAM token → watsonx.ai text generation
 */

async function getIAMToken(apiKey) {
  const res = await fetch("https://iam.cloud.ibm.com/identity/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`IAM token error: ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

export async function POST(req) {
  try {
    const { tab, promptData } = await req.json();

    const apiKey = process.env.WATSONX_API_KEY;
    const projectId = process.env.WATSONX_PROJECT_ID;
    const region = process.env.WATSONX_REGION || "us-south";

    if (!apiKey || !projectId) {
      return NextResponse.json(
        { error: "WATSONX_API_KEY or WATSONX_PROJECT_ID not set in .env.local" },
        { status: 400 }
      );
    }

    // Build prompt based on tab
    let prompt = "";

    if (tab === "TACTICS") {
      prompt = `<|system|>
You are a football tactics expert with deep knowledge of World Cup history. Analyze set piece data and explain tactical decisions in plain English that any fan can understand. Be specific about player positions, vulnerabilities, and why the play worked or failed. Be concise — max 120 words.
<|user|>
Analyze this corner kick routine:
Match: ${promptData.match}
Minute: ${promptData.minute}
Possession Team: ${promptData.team}
Outcome: ${promptData.outcome}
xG: ${promptData.xG}
Shot Probability: ${promptData.shotProb}%
Details: ${promptData.details || "Corner kick setup inside the penalty area."}
<|assistant|>`;

    } else if (tab === "PRESSURE") {
      prompt = `<|system|>
You are a sports psychologist specializing in high-pressure performance at the World Cup. Given a player's pressure metrics, explain the psychological state and performance factors. Reference real sports psychology concepts. Be empathetic but analytical. Max 150 words.
<|user|>
Analyze the psychological profile of this player:
Player: ${promptData.player}
Match: ${promptData.match}
Crucible Score: ${promptData.score}/10
Outcome: ${promptData.outcome}
Caps: ${promptData.stats?.caps}, Goals: ${promptData.stats?.goals}
Wait time: ${promptData.stats?.waitTime}, Crowd: ${promptData.stats?.crowdSize}
Pressure Factors: ${(promptData.factors || []).map(f => f.text).join(", ")}
<|assistant|>`;

    } else if (tab === "VARDICT") {
      prompt = `<|system|>
You are a FIFA Laws of the Game expert and referee analyst. Given an incident and the relevant law article, deliver a clear legal verdict. Explain which specific law applies, what the technology showed, and whether the decision was correct. Be authoritative but acknowledge controversy where it exists. Max 150 words.
<|user|>
Deliver a refereeing verdict on this VAR decision:
Match: ${promptData.match}
Minute: ${promptData.minute}
Decision Type: ${promptData.type}
Verdict: ${promptData.verdict}
Confidence: ${promptData.confidence}%
FIFA Law: ${promptData.lawExcerpt}
Description: ${promptData.description}
Players: ${(promptData.players || []).map(p => `${p.name} (${p.role})`).join(", ")}
<|assistant|>`;

    } else {
      return NextResponse.json({ error: "Invalid tab" }, { status: 400 });
    }

    // Get IAM token
    const iamToken = await getIAMToken(apiKey);

    // Call IBM Granite 3.3 on watsonx.ai
    const watsonRes = await fetch(
      `https://${region}.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${iamToken}`,
        },
        body: JSON.stringify({
          model_id: "ibm/granite-3-3-8b-instruct",
          input: prompt,
          parameters: {
            decoding_method: "greedy",
            max_new_tokens: 200,
            stop_sequences: ["<|user|>", "<|system|>"],
            repetition_penalty: 1.1,
          },
          project_id: projectId,
        }),
      }
    );

    if (!watsonRes.ok) {
      const errText = await watsonRes.text();
      console.error("watsonx.ai error:", errText);
      return NextResponse.json(
        { error: `watsonx.ai error: ${errText}` },
        { status: watsonRes.status }
      );
    }

    const data = await watsonRes.json();
    const text = data.results?.[0]?.generated_text?.trim() || "";

    if (!text) {
      return NextResponse.json({ error: "Empty response from Granite" }, { status: 500 });
    }

    return NextResponse.json({ text });

  } catch (error) {
    console.error("API route error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
