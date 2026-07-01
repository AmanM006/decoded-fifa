import { NextResponse } from "next/server";

// Add ±20% natural jitter to simulate real pipeline timing variance
function jitter(base) {
  const variance = 0.20;
  const delta = base * variance;
  return Math.round(base + (Math.random() * 2 - 1) * delta);
}

export async function GET() {
  const now = Date.now();

  const doclingMs   = jitter(120);
  const watsonxMs   = jitter(1450);
  const guardianMs  = jitter(380);
  const zodMs       = jitter(6);
  const totalMs     = doclingMs + watsonxMs + guardianMs + zodMs;

  const traces = [
    {
      id: "span-docling-rag",
      name: "Docling Laws PDF Chunk Ingestion",
      service: "docling-parser-service",
      durationMs: doclingMs,
      timestamp: new Date(now - totalMs).toISOString(),
      status: "SUCCESS",
      meta: { chunksCount: 3, strategy: "hybrid-table-layout" }
    },
    {
      id: "span-watsonx-inference",
      name: "watsonx.ai Granite 3.0 Inference",
      service: "watsonx-text-gen",
      durationMs: watsonxMs,
      timestamp: new Date(now - totalMs + doclingMs).toISOString(),
      status: "SUCCESS",
      meta: { model: "ibm/granite-3-8b-instruct", promptTokens: 412, generatedTokens: jitter(189) }
    },
    {
      id: "span-guardian-gate",
      name: "Granite Guardian Safety Check",
      service: "granite-guardian-safety",
      durationMs: guardianMs,
      timestamp: new Date(now - guardianMs - zodMs).toISOString(),
      status: "SUCCESS",
      meta: { model: "ibm/granite-guardian-3-8b", classification: "SAFE", riskScore: parseFloat((Math.random() * 0.04).toFixed(3)) }
    },
    {
      id: "span-zod-contract",
      name: "Zod Telemetry Schema Validation",
      service: "statsbomb-ingest-layer",
      durationMs: zodMs,
      timestamp: new Date(now - zodMs).toISOString(),
      status: "SUCCESS",
      meta: { schema: "MatchTelemetrySchema", entriesChecked: 14 }
    }
  ];

  return NextResponse.json({
    traceId: "trace-decoded-" + Math.floor(Math.random() * 1000000),
    systemTime: new Date().toISOString(),
    overallDurationMs: totalMs,
    spans: traces
  });
}
