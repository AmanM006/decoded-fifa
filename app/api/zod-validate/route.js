import { NextResponse } from "next/server";
import { MatchTelemetrySchema } from "../../../lib/statsbomb";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = MatchTelemetrySchema.safeParse(body);
    
    if (result.success) {
      return NextResponse.json({
        status: "SUCCESS",
        data: result.data
      });
    } else {
      return NextResponse.json({
        status: "INVALID",
        errors: result.error.errors
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "JSON_ERROR",
      message: error.message
    }, { status: 400 });
  }
}
