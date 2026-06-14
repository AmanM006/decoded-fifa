export function calculateCrucibleScore({ caps, goals, waitTime, crowdSize, factors, venueType }) {
  let score = 5.0;
  
  // 1. Wait time impact (additional delay increases cortisol levels)
  if (waitTime) {
    const parts = String(waitTime).split(":");
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;
    const totalSeconds = minutes * 60 + seconds;
    
    // Each minute of waiting adds +0.5 pressure
    score += (totalSeconds / 60) * 0.5;
  }
  
  // 2. Crowd size impact (social evaluation apprehension)
  if (crowdSize) {
    const size = parseInt(String(crowdSize).replace(/,/g, "")) || 0;
    // Base scale: 80,000 capacity adds +1.6 pressure
    score += (size / 50000);
  }
  
  // 3. Experience buffer (caps reduce raw situational pressure)
  if (caps) {
    const capsNum = parseInt(caps) || 0;
    // Elite caps (100+) shave off up to -1.0 pressure
    score -= Math.min(1.0, capsNum / 100);
  }
  
  // 4. Custom Factor Modifiers
  if (factors && Array.isArray(factors)) {
    factors.forEach(factor => {
      const match = factor.text?.match(/([+-]\d+(?:\.\d+)?)/);
      if (match) {
        score += parseFloat(match[1]);
      }
    });
  }

  // 5. Match Venue Context Modifier
  if (venueType === "home") {
    score += 0.8; // Heavy pressure of home fan expectations
  } else if (venueType === "away") {
    score += 0.4; // Hostile away crowd noise stress
  }
  
  // Clamp score between 1.0 and 10.0 and round to 1 decimal place
  return Math.min(10.0, Math.max(1.0, parseFloat(score.toFixed(1))));
}

export function computeMetricDelta(current, career) {
  const diff = current - career;
  const sign = diff >= 0 ? "+" : "";
  return {
    diff: parseFloat(diff.toFixed(2)),
    text: `${sign}${diff.toFixed(2)}`,
    status: diff >= 0 ? "positive" : "negative"
  };
}
