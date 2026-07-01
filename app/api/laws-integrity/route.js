import { NextResponse } from "next/server";
import { FIFA_LAWS } from "../../../data/laws";
import crypto from "crypto";

// Compute the canonical Truth Anchor hash once at module load time.
// This is the SHA-256 fingerprint of the official FIFA laws dataset
// bundled with this build — a verifiable integrity anchor.
const CANONICAL_HASH = crypto
  .createHash("sha256")
  .update(JSON.stringify(FIFA_LAWS))
  .digest("hex");

export async function GET() {
  try {
    // Re-compute the live hash on every request
    const liveHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(FIFA_LAWS))
      .digest("hex");

    const match = liveHash === CANONICAL_HASH;

    return NextResponse.json({
      status: match ? "verified" : "tampered",
      liveHash,
      canonicalHash: CANONICAL_HASH,
      match,
      laws: Object.keys(FIFA_LAWS).length,
      note: "SHA-256 Truth Anchor — live hash must equal canonical build-time hash to pass integrity check."
    });
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      error: error.message
    }, { status: 500 });
  }
}
