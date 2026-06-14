import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.WATSONX_API_KEY;
    const projectId = process.env.WATSONX_PROJECT_ID;
    const region = process.env.WATSONX_REGION || "us-south";

    const envStatus = {
      apiKeyPresent: !!apiKey,
      projectIdPresent: !!projectId,
      region,
      apiLength: apiKey ? apiKey.length : 0,
      projectLength: projectId ? projectId.length : 0
    };

    if (!apiKey || !projectId) {
      return NextResponse.json({
        status: "FAILED",
        error: "WATSONX_API_KEY or WATSONX_PROJECT_ID environment variables are missing from .env.local",
        envStatus
      }, { status: 200 });
    }

    // Step 1: Try getting IAM token
    let iamToken;
    try {
      const tokenRes = await fetch("https://iam.cloud.ibm.com/identity/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
      });
      if (!tokenRes.ok) {
        throw new Error(`IAM HTTP ${tokenRes.status}: ${await tokenRes.text()}`);
      }
      const tokenData = await tokenRes.json();
      iamToken = tokenData.access_token;
    } catch (err) {
      return NextResponse.json({
        status: "FAILED",
        stage: "IAM_TOKEN_GENERATION",
        error: `Could not generate IBM IAM token: ${err.message}`,
        envStatus
      }, { status: 200 });
    }

    // Step 2: Try simple watsonx hello query
    try {
      const watsonRes = await fetch(
        `https://${region}.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${iamToken}`,
          },
          body: JSON.stringify({
            model_id: "ibm/granite-3-8b-instruct",
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
      const text = data.results?.[0]?.generated_text?.trim() || "";

      return NextResponse.json({
        status: "OK",
        model: "ibm/granite-3-8b-instruct",
        response: text,
        envStatus
      }, { status: 200 });

    } catch (err) {
      return NextResponse.json({
        status: "FAILED",
        stage: "WATSONX_QUERY",
        error: `Could not contact watsonx.ai Text Generation endpoint: ${err.message}`,
        envStatus
      }, { status: 200 });
    }

  } catch (error) {
    return NextResponse.json({
      status: "FAILED",
      error: `Unexpected diagnostic failure: ${error.message}`
    }, { status: 500 });
  }
}
