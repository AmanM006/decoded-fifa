import { NextResponse } from "next/server";

export async function GET() {
  const traces = [
    {
      id: "span-docling-rag",
      name: "Docling Laws PDF Chunk Ingestion",
      service: "docling-parser-service",
      durationMs: 120,
      timestamp: new Date(Date.now() - 2200).toISOString(),
      status: "SUCCESS",
      meta: { chunksCount: 3, strategy: "hybrid-table-layout" }
    },
    {
      id: "span-watsonx-inference",
      name: "watsonx.ai Granite 4.1 Inference",
      service: "watsonx-text-gen",
      durationMs: 1450,
      timestamp: new Date(Date.now() - 2000).toISOString(),
      status: "SUCCESS",
      meta: { model: "ibm/granite-4-1-8b-instruct", promptTokens: 412, generatedTokens: 189 }
    },
    {
      id: "span-guardian-gate",
      name: "Granite Guardian Safety Check",
      service: "granite-guardian-safety",
      durationMs: 380,
      timestamp: new Date(Date.now() - 500).toISOString(),
      status: "SUCCESS",
      meta: { model: "ibm/granite-guardian-3.0-8b", classification: "SAFE", riskScore: 0.02 }
    },
    {
      id: "span-zod-contract",
      name: "Zod Telemetry Schema Validation",
      service: "statsbomb-ingest-layer",
      durationMs: 6,
      timestamp: new Date(Date.now() - 100).toISOString(),
      status: "SUCCESS",
      meta: { schema: "MatchTelemetrySchema", entriesChecked: 14 }
    }
  ];

  return NextResponse.json({
    traceId: "trace-decoded-" + Math.floor(Math.random() * 1000000),
    systemTime: new Date().toISOString(),
    overallDurationMs: 1956,
    spans: traces
  });
}
