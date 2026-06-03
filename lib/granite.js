/**
 * Client helper — queries IBM Granite 3.3 via watsonx.ai (Next.js API route).
 * Falls back to high-fidelity synthetic text if the API call fails.
 */
export async function queryGraniteAI(tab, promptData, fallbackText) {
  try {
    const res = await fetch("/api/granite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, promptData }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `API error ${res.status}`);
    }

    const data = await res.json();
    if (data.text) return data.text;
    throw new Error("Empty response from Granite");

  } catch (error) {
    console.warn("[DECODED] Granite API unavailable, using fallback.", error.message);
    return fallbackText;
  }
}
