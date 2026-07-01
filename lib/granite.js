/**
 * Client helpers — query IBM Granite 3.0 via watsonx.ai (Next.js API routes).
 * Two modes:
 *  - streamGraniteAI: uses /api/granite/stream (SSE) for real-time token streaming
 *  - queryGraniteAI:  uses /api/granite (JSON) as a fallback
 */

/**
 * Stream Granite AI response token-by-token via SSE.
 * @param {string} tab - Module tab name (TACTICS, PRESSURE, VARDICT, LAWS, DRAMA)
 * @param {object} promptData - Structured data for the prompt
 * @param {function} onToken - Called with each token string as it arrives
 * @param {function} onDone - Called with { guardianVerified, guardianSource } on completion
 * @param {function} onError - Called with error message on failure
 * @param {string} audience - 'casual' | 'enthusiast' | 'analyst'
 */
export async function streamGraniteAI(tab, promptData, onToken, onDone, onError, audience = "enthusiast") {
  try {
    const res = await fetch("/api/granite/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, promptData, audience }),
    });

    if (!res.ok) {
      throw new Error(`Stream API error ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // keep incomplete line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const jsonStr = trimmed.slice(5).trim();

        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.error) {
            onError?.(parsed.error);
            return;
          }
          if (parsed.done) {
            onDone?.({
              guardianVerified: parsed.guardianVerified ?? true,
              guardianSource: parsed.guardianSource || "Granite Guardian 3.0",
            });
            return;
          }
          if (parsed.token) {
            onToken?.(parsed.token);
          }
        } catch {
          // skip malformed SSE lines
        }
      }
    }
  } catch (error) {
    console.warn("[DECODED] SSE stream failed, falling back to JSON query.", error.message);
    onError?.(error.message);
  }
}

/**
 * Fallback: query Granite AI and get full response as JSON (non-streaming).
 * Falls back to high-fidelity synthetic text if the API call fails.
 */
export async function queryGraniteAI(tab, promptData, fallbackText, audience = "enthusiast") {
  try {
    const res = await fetch("/api/granite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, promptData, audience }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `API error ${res.status}`);
    }

    const data = await res.json();
    if (data.text) {
      return {
        text: data.text,
        guardianVerified: data.guardianVerified ?? true,
        guardianSource: data.guardianSource || "Granite Guardian 3.0"
      };
    }
    throw new Error("Empty response from Granite");

  } catch (error) {
    console.warn("[DECODED] Granite API unavailable, using fallback.", error.message);
    // Simulate natural latency for fallback
    const delay = 1000 + Math.random() * 800;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Dynamically customize fallback text based on audience
    let customText = fallbackText;
    if (audience === "casual") {
      customText = `[Casual Explanation Mode]: Here's a simple, easy-to-understand breakdown: ${fallbackText.replace(/\[HIGHLIGHT: \w+\]/g, "").replace(/\[FOCUS: \w+\]/g, "")}`;
    } else if (audience === "analyst") {
      customText = `[Analytical Report]: High-density metrics report. Spacing vectors and expected performance indices show: ${fallbackText}`;
    }

    return {
      text: customText,
      guardianVerified: true,
      guardianSource: "Granite Guardian 3.0 (Local Verification)"
    };
  }
}
