export const PRESSURE_MOMENTS = [
  {
    id: "mbappe-2022",
    player: "Kylian Mbappé",
    team: "FRA",
    flag: "🇫🇷",
    position: "Forward",
    match: "France vs Argentina · 2022 Final",
    score: 9.2,
    outcome: "SCORED",
    stats: {
      caps: 66,
      goals: 34,
      history: "8.2 avg",
      conversion: "67%",
      waitTime: "4:20",
      crowdSize: "88,966"
    },
    factors: [
      { icon: "AlertTriangle", text: "VAR delay: +2.1 pressure" },
      { icon: "Users", text: "88k crowd: +1.4 pressure" },
      { icon: "Clock", text: "ET: +3.2 pressure" },
      { icon: "Trophy", text: "Final: +2.8 pressure" }
    ],
    pentagon: {
      composure: { current: 0.88, career: 0.82 },
      clutch: { current: 0.95, career: 0.88 },
      fatigue: { current: 0.45, career: 0.25 }, // inverted in UI if needed, but we keep raw scale 0-1
      crowd: { current: 0.21, career: 0.35 },
      experience: { current: 0.90, career: 0.70 }
    },
    graniteAnalysis: `Kylian Mbappé approached this penalty carrying a Crucible Score of 9.2 — the second-highest recorded in our dataset.

The VAR check added 4 minutes and 20 seconds of waiting. Sports psychology research shows conversion rates drop approximately 12% for every 3 minutes of additional wait time.

Yet Mbappé's composure metric (0.88) remains elite. He has converted penalties under equivalent pressure in 7 of his previous 9 attempts.

The crowd noise peaked at 94 decibels during his run-up. His historical sensitivity to crowd pressure: low (0.21).

Prediction: 71% conversion probability.
Result: SCORED.`
  },
  {
    id: "coman-2022",
    player: "Kingsley Coman",
    team: "FRA",
    flag: "🇫🇷",
    position: "Winger",
    match: "France vs Argentina · 2022 Final (Shootout)",
    score: 9.4,
    outcome: "MISSED",
    stats: {
      caps: 55,
      goals: 12,
      history: "7.1 avg",
      conversion: "50%",
      waitTime: "2:50",
      crowdSize: "88,966"
    },
    factors: [
      { icon: "AlertTriangle", text: "Shootout momentum: +2.5 pressure" },
      { icon: "Users", text: "Hostile crowd: +1.8 pressure" },
      { icon: "Clock", text: "Fatigue: +1.9 pressure" },
      { icon: "Trophy", text: "World Cup Final: +3.2 pressure" }
    ],
    pentagon: {
      composure: { current: 0.52, career: 0.75 },
      clutch: { current: 0.58, career: 0.70 },
      fatigue: { current: 0.78, career: 0.30 },
      crowd: { current: 0.65, career: 0.40 },
      experience: { current: 0.60, career: 0.65 }
    },
    graniteAnalysis: `Kingsley Coman faced a Crucible Score of 9.4 in the penalty shootout. 

The mental strain was compounded by the shootout order and Martinez's psychological antics, adding +2.5 to his pressure levels. Coman's composure index dropped significantly below his career baseline (0.52 vs 0.75), indicating high situational stress.

Additionally, his fatigue index (0.78) was highly elevated after a long physical final. The high crowd sensitivity (0.65) was exposed by the loud Argentine section.

Prediction: 48% conversion probability.
Result: MISSED.`
  },
  {
    id: "baggio-1994",
    player: "Roberto Baggio",
    team: "ITA",
    flag: "🇮🇹",
    position: "Forward",
    match: "Italy vs Brazil · 1994 Final",
    score: 9.8,
    outcome: "MISSED",
    stats: {
      caps: 56,
      goals: 27,
      history: "8.9 avg",
      conversion: "86%",
      waitTime: "5:15",
      crowdSize: "94,194"
    },
    factors: [
      { icon: "AlertTriangle", text: "Must-score penalty: +3.8 pressure" },
      { icon: "Users", text: "94k crowd noise: +2.1 pressure" },
      { icon: "Clock", text: "Extreme Heat/120m: +3.5 pressure" },
      { icon: "Trophy", text: "World Cup Title: +3.9 pressure" }
    ],
    pentagon: {
      composure: { current: 0.40, career: 0.90 },
      clutch: { current: 0.50, career: 0.94 },
      fatigue: { current: 0.95, career: 0.20 },
      crowd: { current: 0.55, career: 0.25 },
      experience: { current: 0.85, career: 0.80 }
    },
    graniteAnalysis: `Roberto Baggio stood over the ball under a Crucible Score of 9.8 — the highest pressure profile in World Cup history.

Physically depleted by playing 120 minutes in Pasadena's 36°C heat (fatigue: 0.95), and knowing a miss would lose the World Cup, Baggio's composure dropped to 0.40 compared to his stellar career average of 0.90. 

His historical clutch rating was 0.94, but the compounding physical fatigue and psychological weight of the 'must-score' status disrupted his biomechanics.

Prediction: 42% conversion probability.
Result: MISSED.`
  },
  {
    id: "messi-2016",
    player: "Lionel Messi",
    team: "ARG",
    flag: "🇦🇷",
    position: "Forward",
    match: "Argentina vs Chile · 2016 Copa Final",
    score: 9.1,
    outcome: "MISSED",
    stats: {
      caps: 172,
      goals: 58,
      history: "8.5 avg",
      conversion: "78%",
      waitTime: "3:10",
      crowdSize: "82,026"
    },
    factors: [
      { icon: "AlertTriangle", text: "Consecutive finals: +2.9 pressure" },
      { icon: "Users", text: "82k fans: +1.2 pressure" },
      { icon: "Clock", text: "First shootout kick: +2.2 pressure" },
      { icon: "Trophy", text: "Title Drought: +3.5 pressure" }
    ],
    pentagon: {
      composure: { current: 0.68, career: 0.89 },
      clutch: { current: 0.72, career: 0.92 },
      fatigue: { current: 0.60, career: 0.28 },
      crowd: { current: 0.35, career: 0.30 },
      experience: { current: 0.95, career: 0.85 }
    },
    graniteAnalysis: `Lionel Messi carried a Crucible Score of 9.1, heavy with the weight of Argentina's 23-year trophy drought and previous finals losses.

As the first kicker for Argentina, the pressure to set the tone was immense. His composure metric fell to 0.68 (career 0.89), influenced by the psychological baggage of past finals. 

The physical fatigue of 120 minutes of intense physical marking (0.60) also influenced the trajectory of his shot, which sailed over the crossbar.

Prediction: 65% conversion probability.
Result: MISSED.`
  },
  {
    id: "zidane-2006",
    player: "Zinedine Zidane",
    team: "FRA",
    flag: "🇫🇷",
    position: "Midfielder",
    match: "France vs Italy · 2006 Final",
    score: 8.8,
    outcome: "SCORED",
    stats: {
      caps: 108,
      goals: 31,
      history: "9.0 avg",
      conversion: "82%",
      waitTime: "1:45",
      crowdSize: "69,000"
    },
    factors: [
      { icon: "AlertTriangle", text: "Buffon in goal: +2.4 pressure" },
      { icon: "Users", text: "69k fans: +1.1 pressure" },
      { icon: "Clock", text: "7th minute: +1.2 pressure" },
      { icon: "Trophy", text: "Panenka decision: +3.8 pressure" }
    ],
    pentagon: {
      composure: { current: 0.94, career: 0.91 },
      clutch: { current: 0.98, career: 0.93 },
      fatigue: { current: 0.10, career: 0.22 },
      crowd: { current: 0.12, career: 0.25 },
      experience: { current: 0.96, career: 0.88 }
    },
    graniteAnalysis: `Zinedine Zidane faced a Crucible Score of 8.8 early in the 2006 Final. He famously opted for a high-risk Panenka penalty against Gianluigi Buffon.

His composure rating rose to 0.94 (above his 0.91 baseline), indicating extreme cognitive confidence and emotional control. Because this occurred in the 7th minute, physical fatigue was non-existent (0.10), and his big game experience (0.96) allowed him to execute the audacity of the chip.

This is a classic study in elite self-efficacy overriding external pressure metrics.

Prediction: 79% conversion probability.
Result: SCORED.`
  },
  {
    id: "ronaldo-2022",
    player: "Cristiano Ronaldo",
    team: "POR",
    flag: "🇵🇹",
    position: "Forward",
    match: "Portugal vs Morocco · 2022 QF (Bench)",
    score: 8.4,
    outcome: "SCORED",
    stats: {
      caps: 191,
      goals: 118,
      history: "8.7 avg",
      conversion: "84%",
      waitTime: "2:05",
      crowdSize: "44,198"
    },
    factors: [
      { icon: "AlertTriangle", text: "Bench role stress: +2.2 pressure" },
      { icon: "Users", text: "Hostile whistle: +1.5 pressure" },
      { icon: "Clock", text: "Late sub: +1.8 pressure" },
      { icon: "Trophy", text: "Final World Cup: +3.0 pressure" }
    ],
    pentagon: {
      composure: { current: 0.85, career: 0.88 },
      clutch: { current: 0.92, career: 0.95 },
      fatigue: { current: 0.25, career: 0.25 },
      crowd: { current: 0.28, career: 0.32 },
      experience: { current: 0.99, career: 0.92 }
    },
    graniteAnalysis: `Cristiano Ronaldo faced a Crucible Score of 8.4. Having been benched earlier in the tournament, he came on as a substitute under intense scrutiny.

Ronaldo's experience rating (0.99) is the highest in the dataset. This career-long experience insulated his composure metric (0.85), despite the hostile Moroccan whistles and the desperation of the final minutes of his World Cup career.

His clutch conversion remains highly reliable (0.92) due to mechanical muscle memory.

Prediction: 76% conversion probability.
Result: SCORED.`
  },
  {
    id: "kane-2022",
    player: "Harry Kane",
    team: "ENG",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    position: "Forward",
    match: "England vs France · 2022 QF",
    score: 9.3,
    outcome: "MISSED",
    stats: {
      caps: 80,
      goals: 54,
      history: "8.1 avg",
      conversion: "85%",
      waitTime: "3:40",
      crowdSize: "68,895"
    },
    factors: [
      { icon: "AlertTriangle", text: "Second pen vs teammate: +3.5 pressure" },
      { icon: "Users", text: "68k stadium: +1.3 pressure" },
      { icon: "Clock", text: "84th minute: +2.4 pressure" },
      { icon: "Trophy", text: "Equalizer weight: +3.1 pressure" }
    ],
    pentagon: {
      composure: { current: 0.55, career: 0.87 },
      clutch: { current: 0.62, career: 0.85 },
      fatigue: { current: 0.65, career: 0.28 },
      crowd: { current: 0.40, career: 0.33 },
      experience: { current: 0.82, career: 0.78 }
    },
    graniteAnalysis: `Harry Kane faced a Crucible Score of 9.3 when taking his second penalty of the match against Tottenham teammate Hugo Lloris.

Psychologically, facing the same goalkeeper for a second penalty in a single match introduces high cognitive load. The delay of 3 minutes and 40 seconds further exacerbated the pressure. 

Kane's composure score dipped to 0.55 (career 0.87). His physical fatigue was moderate (0.65), contributing to a biomechanical over-extension, leading him to blast the penalty over the bar.

Prediction: 55% conversion probability.
Result: MISSED.`
  },
  {
    id: "grosso-2006",
    player: "Fabio Grosso",
    team: "ITA",
    flag: "🇮🇹",
    position: "Defender",
    match: "Italy vs France · 2006 Final (Shootout)",
    score: 8.9,
    outcome: "SCORED",
    stats: {
      caps: 48,
      goals: 4,
      history: "6.8 avg",
      conversion: "75%",
      waitTime: "1:15",
      crowdSize: "69,000"
    },
    factors: [
      { icon: "AlertTriangle", text: "Winning kick weight: +3.6 pressure" },
      { icon: "Users", text: "69k fans: +1.2 pressure" },
      { icon: "Clock", text: "Shootout: +2.1 pressure" },
      { icon: "Trophy", text: "World Cup clincher: +3.9 pressure" }
    ],
    pentagon: {
      composure: { current: 0.90, career: 0.72 },
      clutch: { current: 0.94, career: 0.75 },
      fatigue: { current: 0.72, career: 0.35 },
      crowd: { current: 0.30, career: 0.45 },
      experience: { current: 0.70, career: 0.55 }
    },
    graniteAnalysis: `Fabio Grosso stepped up with a Crucible Score of 8.9 to take the decisive fifth penalty.

Despite a lower experience score (0.70) than his teammates, Grosso was riding high on situational confidence after scoring the semi-final winner against Germany. His composure index peaked at 0.90, significantly above his baseline (0.72).

This flow-state clutch rating (0.94) insulated him from the pressure of the moment, culminating in a confident strike into the top corner to win the World Cup.

Prediction: 73% conversion probability.
Result: SCORED.`
  }
];
