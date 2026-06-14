/**
 * Standalone credentials diagnostic script for IBM watsonx.ai
 * Run: node verifyWatsonx.js
 */

const fs = require("fs");
const path = require("path");

console.log("=========================================");
console.log("   DECODED watsonx.ai STARTUP DIAGNOSTIC ");
console.log("=========================================\n");

// Read .env.local if present
const envPath = path.join(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
  console.log("✓ Found .env.local file. Loading variables...");
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach(line => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim();
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
} else {
  console.log("⚠️ No .env.local file found. Checking global environment variables...");
}

const apiKey = process.env.WATSONX_API_KEY;
const projectId = process.env.WATSONX_PROJECT_ID;
const region = process.env.WATSONX_REGION || "us-south";

console.log(`- API Key Configured: ${apiKey ? "YES (starts with " + apiKey.slice(0, 5) + "...)" : "NO"}`);
console.log(`- Project ID Configured: ${projectId ? "YES (starts with " + projectId.slice(0, 5) + "...)" : "NO"}`);
console.log(`- Region: ${region}\n`);

if (!apiKey || !projectId) {
  console.error("❌ ERROR: WATSONX_API_KEY or WATSONX_PROJECT_ID are missing.");
  console.error("Please configure them in your environment or in a local .env.local file.");
  process.exit(1);
}

async function runDiagnostic() {
  try {
    console.log("Stage 1: Attempting IAM token generation...");
    const iamRes = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
    });

    if (!iamRes.ok) {
      throw new Error(`IAM HTTP ${iamRes.status}: ${await iamRes.text()}`);
    }

    const iamData = await iamRes.json();
    const token = iamData.access_token;
    console.log("✓ Stage 1 SUCCESS: IAM token generated successfully.\n");

    console.log("Stage 2: Querying watsonx.ai Text Generation API (Granite 4.1)...");
    const watsonRes = await fetch(
      `https://${region}.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model_id: "ibm/granite-4-1-8b-instruct",
          input: "<|user|>\nHello. Output exactly the word 'SUCCESS' if you read this.\n<|assistant|>",
          parameters: {
            decoding_method: "greedy",
            max_new_tokens: 10,
          },
          project_id: projectId,
        }),
      }
    );

    if (!watsonRes.ok) {
      throw new Error(`Watsonx HTTP ${watsonRes.status}: ${await watsonRes.text()}`);
    }

    const data = await watsonRes.json();
    const response = data.results?.[0]?.generated_text?.trim() || "";
    console.log("✓ Stage 2 SUCCESS: watsonx.ai responded.");
    console.log(`- Model Response: "${response}"\n`);

    console.log("=========================================");
    console.log("✓ ALL DIAGNOSTIC TESTS PASSED: WATSONX IS READY!");
    console.log("=========================================");

  } catch (error) {
    console.error(`\n❌ DIAGNOSTIC FAILED: ${error.message}`);
    console.error("Please verify that your Watsonx credentials are correct and region is accessible.");
    process.exit(1);
  }
}

runDiagnostic();
