const fs = require("fs");
const path = require("path");

// Read .env.local
const envPath = path.join(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
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
}

const apiKey = process.env.WATSONX_API_KEY;
const region = process.env.WATSONX_REGION || "us-south";

async function listModels() {
  try {
    const iamRes = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
    });
    const iamData = await iamRes.json();
    const token = iamData.access_token;

    const res = await fetch(`https://${region}.ml.cloud.ibm.com/ml/v1/foundation_model_specs?version=2023-05-29`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log("Supported Models:");
    const models = data.resources || [];
    models.forEach(m => {
      if (m.model_id.includes("granite")) {
        console.log(`- ${m.model_id} (Name: ${m.label || m.name})`);
      }
    });
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
