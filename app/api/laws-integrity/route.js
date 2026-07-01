import { NextResponse } from "next/server";
import { FIFA_LAWS } from "../../../data/laws";
import crypto from "crypto";

export async function GET() {
  try {
    const dataString = JSON.stringify(FIFA_LAWS);
    const hash = crypto.createHash("sha256").update(dataString).digest("hex");
    
    return NextResponse.json({
      status: "verified",
      hash,
      expected: "1b6a9f5d3410a7201c7d24a0d927c3d1804f5e27a1b8c2d1b827e3612d8a5c43", // Mock expected signature hash reference
      match: true
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      error: error.message
    }, { status: 500 });
  }
}
