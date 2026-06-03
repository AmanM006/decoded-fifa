export const VAR_INCIDENTS = [
  {
    id: "griezmann-2022",
    title: "Griezmann SAOT Offside Check",
    match: "ARG vs FRA · 2022 FINAL",
    description: "SAOT armpit-offside check on Griezmann positioning (78')",
    minute: "78'",
    type: "OFFSIDE",
    stadium: "Lusail Stadium",
    attendance: "88,966",
    players: [
      { name: "Antoine Griezmann", team: "FRA", role: "Attacker", flag: "🇫🇷" },
      { name: "Nahuel Molina", team: "ARG", role: "Defender", flag: "🇦🇷" },
      { name: "Szymon Marciniak", team: "POL", role: "Referee", flag: "🇵🇱" }
    ],
    duration: "4:32",
    lawNumber: "11",
    lawTitle: "Law 11 — Offside",
    lawExcerpt: "A player is in an offside position if any part of their head, body or feet is in the opponents' half (excluding the halfway line) and is nearer to the opponents' goal line than both the ball and the second-last opponent.",
    verdict: "CORRECT",
    confidence: 87,
    lawCited: "Under FIFA Law 11, Article 2...",
    graniteAnalysis: `This incident represents the defining SAOT (Semi-Automated Offside Technology) controversy of the 2022 World Cup — the role of body-part precision in offside calls.

FIFA's SAOT system tracks 29 body keypoints at 50 frames per second. At the precise frame of the pass, the system identified Griezmann's forward shoulder/armpit position relative to Molina's trailing heel.

The armpit is classified under FIFA Law 11 as a 'scoring surface' — therefore it counts for offside calculation. The margin of 2.3cm is within the system's declared accuracy band of ±4cm, making this one of the most contested SAOT calls in tournament history.

The decision was technically correct per the letter of Law 11, though the armpit standard remains widely criticised as counterintuitive to football's original offside intent.

VERDICT: CORRECT — but legally disputed at the highest levels of the game.`,
    drawingData: {
      defender: { x: 380, y: 250, label: "Molina (ARG)", num: "26" },
      attacker: { x: 420, y: 250, label: "Griezmann (FRA)", num: "7" },
      gap: 2.3,
      offsideLineX: 380
    },
    limbData: {
      attackingPlayer: {
        name: "Griezmann",
        team: "FRA",
        joints: {
          nose:          { x: 425, y: 145 },
          leftShoulder:  { x: 405, y: 175 },
          rightShoulder: { x: 447, y: 173 },
          leftElbow:     { x: 393, y: 210 },
          rightElbow:    { x: 459, y: 207 },
          leftWrist:     { x: 385, y: 242 },
          rightWrist:    { x: 466, y: 238 },
          leftHip:       { x: 410, y: 255 },
          rightHip:      { x: 440, y: 253 },
          leftKnee:      { x: 407, y: 305 },
          rightKnee:     { x: 444, y: 302 },
          leftAnkle:     { x: 404, y: 355 },
          rightAnkle:    { x: 448, y: 350 },
          leftHeel:      { x: 401, y: 362 },
          rightHeel:     { x: 452, y: 357 },
        },
        offsideLimb: "rightShoulder",
        offsideLimbLabel: "Right Armpit / Shoulder",
      },
      lastDefender: {
        name: "Molina",
        team: "ARG",
        joints: {
          nose:          { x: 365, y: 148 },
          leftShoulder:  { x: 348, y: 178 },
          rightShoulder: { x: 384, y: 176 },
          leftElbow:     { x: 337, y: 212 },
          rightElbow:    { x: 395, y: 208 },
          leftWrist:     { x: 330, y: 244 },
          rightWrist:    { x: 402, y: 239 },
          leftHip:       { x: 352, y: 257 },
          rightHip:      { x: 378, y: 255 },
          leftKnee:      { x: 348, y: 305 },
          rightKnee:     { x: 382, y: 302 },
          leftAnkle:     { x: 344, y: 355 },
          rightAnkle:    { x: 386, y: 350 },
          leftHeel:      { x: 341, y: 362 },
          rightHeel:     { x: 390, y: 357 },
        },
        referencePoint: "rightHeel",
        referenceLabel: "Trailing Heel",
      },
      offsideLineX: 447,
      defenderLineX: 390,
      marginCm: 2.3,
      verdict: "OFFSIDE",
      explanation: "The SAOT system tracked Griezmann's right armpit/shoulder at X=447px — 2.3cm ahead of Molina's trailing right heel at X=390px at the exact frame of the pass. The armpit is a valid scoring surface under FIFA Law 11."
    },
    polls: { correct: 61, wrong: 39, count: 47293 }
  },
  {
    id: "lewandowski-2022",
    title: "Lewandowski Penalty Appeal",
    match: "POL vs ARG · 2022 GROUP C",
    description: "Handball check inside the penalty box",
    minute: "38'",
    type: "HANDBALL",
    stadium: "Stadium 974",
    attendance: "44,089",
    players: [
      { name: "Robert Lewandowski", team: "POL", role: "Attacker", flag: "🇵🇱" },
      { name: "Nicolás Otamendi", team: "ARG", role: "Defender", flag: "🇦🇷" },
      { name: "Danny Makkelie", team: "NED", role: "Referee", flag: "🇳🇱" }
    ],
    duration: "2:15",
    lawNumber: "12",
    lawTitle: "Law 12 — Fouls and Misconduct",
    lawExcerpt: "It is an offence if a player touches the ball with their hand/arm when it has made their body unnaturally bigger. A player is considered to have made their body unnaturally bigger when the position of their hand/arm is not a consequence of, or justifiable by, the player's body movement.",
    verdict: "CONTROVERSIAL",
    confidence: 68,
    lawCited: "Under FIFA Law 12, Article 1...",
    graniteAnalysis: `Under Law 12, a handball offense occurs if a player touches the ball with their hand or arm when it has made their body unnaturally bigger.

Analysis shows Otamendi's arm was positioned at a 42-degree angle, extending away from his torso. However, the contact occurred immediately following a deflection from his own chest, which under current FIFA guidelines often negates a handball infraction.

The VAR review determined that because the arm was in an unnatural silhouette, the penalty should stand, creating intense controversy given the short reaction time.

VERDICT: CONTROVERSIAL — chest deflection makes this a marginal decision.`,
    drawingData: {
      player: { x: 350, y: 200, armAngle: 42, label: "Otamendi (ARG)" },
      contactPoint: { x: 375, y: 190 },
      ballPath: [ {x: 200, y: 220}, {x: 375, y: 190}, {x: 420, y: 120} ]
    },
    limbData: {
      attackingPlayer: {
        name: "Otamendi",
        team: "ARG",
        joints: {
          nose:          { x: 358, y: 142 },
          leftShoulder:  { x: 338, y: 172 },
          rightShoulder: { x: 378, y: 170 },
          leftElbow:     { x: 316, y: 198 },
          rightElbow:    { x: 402, y: 193 },
          leftWrist:     { x: 300, y: 222 },
          rightWrist:    { x: 418, y: 212 },
          leftHip:       { x: 342, y: 252 },
          rightHip:      { x: 374, y: 250 },
          leftKnee:      { x: 338, y: 300 },
          rightKnee:     { x: 378, y: 297 },
          leftAnkle:     { x: 334, y: 348 },
          rightAnkle:    { x: 382, y: 344 },
          leftHeel:      { x: 331, y: 355 },
          rightHeel:     { x: 386, y: 351 },
        },
        offsideLimb: "rightElbow",
        offsideLimbLabel: "Right Elbow / Arm",
      },
      lastDefender: null,
      offsideLineX: null,
      defenderLineX: null,
      marginCm: null,
      contactPoint: { x: 402, y: 193 },
      armAngleDeg: 42,
      verdict: "CONTROVERSIAL",
      explanation: "The SAOT system tracked Otamendi's right elbow at 42° angle from the torso — classified as 'unnaturally bigger' silhouette. However, the preceding chest deflection (tracked at the sternum keypoint) creates a legal ambiguity under Law 12. The arm expanded the body outline by ~18% beyond natural resting position."
    },
    polls: { correct: 44, wrong: 56, count: 31802 }
  },
  {
    id: "por-kor-2022",
    title: "Hwang Goal Verification",
    match: "POR vs KOR · 2022 GROUP H",
    description: "Verification of Korean last-minute winner",
    minute: "91'",
    type: "OFFSIDE",
    stadium: "Education City Stadium",
    attendance: "44,097",
    players: [
      { name: "Hwang Hee-chan", team: "KOR", role: "Attacker", flag: "🇰🇷" },
      { name: "João Cancelo", team: "POR", role: "Defender", flag: "🇵🇹" },
      { name: "Facundo Tello", team: "ARG", role: "Referee", flag: "🇦🇷" }
    ],
    duration: "1:48",
    lawNumber: "11",
    lawTitle: "Law 11 — Offside",
    lawExcerpt: "A player is in an offside position if they are nearer to the opponents' goal line than both the ball and the second-last opponent at the moment the ball is played to them.",
    verdict: "CORRECT",
    confidence: 94,
    lawCited: "Under FIFA Law 11, Article 1...",
    graniteAnalysis: `Hwang Hee-chan was in a legal position at the exact moment of Son Heung-min's progressive pass.

VAR tracking confirms that João Cancelo's trailing heel was positioned 12.4cm closer to the goal line than Hwang's chest. Since the chest is a legal playing part and Hwang was behind the defender's rearmost legal point, the attack was onside.

The technology validated the referee's initial call within 108 seconds, demonstrating the speed of semi-automated positioning tracking.

VERDICT: CORRECT — clear onside verified by the system.`,
    drawingData: {
      defender: { x: 410, y: 230, label: "Cancelo (POR)", num: "20" },
      attacker: { x: 395, y: 230, label: "Hwang (KOR)", num: "11" },
      gap: 12.4,
      offsideLineX: 410
    },
    limbData: {
      attackingPlayer: {
        name: "Hwang",
        team: "KOR",
        joints: {
          nose:          { x: 370, y: 142 },
          leftShoulder:  { x: 352, y: 172 },
          rightShoulder: { x: 390, y: 170 },
          leftElbow:     { x: 341, y: 207 },
          rightElbow:    { x: 401, y: 203 },
          leftWrist:     { x: 334, y: 239 },
          rightWrist:    { x: 408, y: 234 },
          leftHip:       { x: 356, y: 252 },
          rightHip:      { x: 384, y: 250 },
          leftKnee:      { x: 352, y: 300 },
          rightKnee:     { x: 388, y: 297 },
          leftAnkle:     { x: 348, y: 348 },
          rightAnkle:    { x: 392, y: 344 },
          leftHeel:      { x: 345, y: 355 },
          rightHeel:     { x: 396, y: 351 },
        },
        offsideLimb: null,
        offsideLimbLabel: "Chest (Onside)",
      },
      lastDefender: {
        name: "Cancelo",
        team: "POR",
        joints: {
          nose:          { x: 422, y: 142 },
          leftShoulder:  { x: 404, y: 172 },
          rightShoulder: { x: 442, y: 170 },
          leftElbow:     { x: 393, y: 207 },
          rightElbow:    { x: 453, y: 203 },
          leftWrist:     { x: 386, y: 239 },
          rightWrist:    { x: 460, y: 234 },
          leftHip:       { x: 408, y: 252 },
          rightHip:      { x: 436, y: 250 },
          leftKnee:      { x: 404, y: 300 },
          rightKnee:     { x: 440, y: 297 },
          leftAnkle:     { x: 400, y: 348 },
          rightAnkle:    { x: 444, y: 344 },
          leftHeel:      { x: 397, y: 355 },
          rightHeel:     { x: 448, y: 351 },
        },
        referencePoint: "leftHeel",
        referenceLabel: "Trailing Heel",
      },
      offsideLineX: 396,
      defenderLineX: 397,
      marginCm: 12.4,
      verdict: "ONSIDE",
      explanation: "SAOT confirmed Hwang's leading chest keypoint at X=390px was behind Cancelo's trailing left heel at X=397px. The 12.4cm gap clearly places Hwang onside at the exact frame Son's pass was released. VERDICT: ONSIDE — 108-second VAR confirmation."
    },
    polls: { correct: 92, wrong: 8, count: 59312 }
  },
  {
    id: "eng-ger-2010",
    title: "Lampard Disallowed Ghost Goal",
    match: "GER vs ENG · 2010 ROUND OF 16",
    description: "Lampard's shot crosses the line but not given",
    minute: "38'",
    type: "PENALTY",
    stadium: "Free State Stadium",
    attendance: "40,510",
    players: [
      { name: "Frank Lampard", team: "ENG", role: "Attacker", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { name: "Manuel Neuer", team: "GER", role: "Goalkeeper", flag: "🇩🇪" },
      { name: "Jorge Larrionda", team: "URU", role: "Referee", flag: "🇺🇾" }
    ],
    duration: "0:00",
    lawNumber: "14",
    lawTitle: "Law 10 — Determining the Outcome of a Match",
    lawExcerpt: "A goal is scored when the whole of the ball passes over the goal line, between the goalposts and under the crossbar, provided that no offence has been committed by the team scoring the goal.",
    verdict: "WRONG",
    confidence: 100,
    lawCited: "Under FIFA Law 10, Article 1...",
    graniteAnalysis: `Frank Lampard's long-range shot struck the crossbar, bounced downwards, and clearly crossed the goal line by 33 centimeters.

Because this tournament predated Goal-Line Technology (GLT) and VAR, the match officials had to rely on human sight lines from the center circle. Manuel Neuer quickly scooped the ball back into play, confusing the referee.

This critical error directly accelerated FIFA's adoption of Goal-Line Technology, making it a foundational moment in football technology history.

VERDICT: WRONG — the ball crossed the line by 33cm.`,
    drawingData: {
      goalLineX: 500,
      ballX: 533,
      ballY: 200,
      goalkeeper: { x: 480, y: 200, label: "Neuer (GER)" }
    },
    limbData: {
      attackingPlayer: null,
      lastDefender: null,
      offsideLineX: null,
      defenderLineX: null,
      marginCm: 33,
      verdict: "WRONG",
      explanation: "No SAOT available in 2010 — this pre-dated semi-automated technology. Modern goal-line technology uses 14 high-speed cameras and triangulation algorithms tracking the ball's 3D position 500 times per second. With GLT, this decision would have been flagged within 1 second: ball-centroid at 33cm past the line. This case directly drove FIFA to mandate GLT from 2012 onwards.",
      isHistorical: true,
      technologyNote: "No technology existed in 2010. Modern Goal-Line Technology (Hawk-Eye, GoalControl-4D) would have provided an immediate GOAL signal."
    },
    polls: { correct: 2, wrong: 98, count: 88102 }
  },
  {
    id: "wales-iran-2022",
    title: "Hennessey Red Card Incident",
    match: "IRI vs WAL · 2022 GROUP B",
    description: "Goalkeeper tackle outside the box checked for Red Card",
    minute: "86'",
    type: "RED CARD",
    stadium: "Ahmad bin Ali Stadium",
    attendance: "41,721",
    players: [
      { name: "Mehdi Taremi", team: "IRI", role: "Attacker", flag: "🇮🇷" },
      { name: "Wayne Hennessey", team: "WAL", role: "Goalkeeper", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
      { name: "Mario Escobar", team: "GUA", role: "Referee", flag: "🇬🇹" }
    ],
    duration: "3:05",
    lawNumber: "12",
    lawTitle: "Law 12 — Fouls and Misconduct",
    lawExcerpt: "A player, substitute or substituted player who commits any of the following offences is sent off: denying an obvious goal-scoring opportunity (DOGSO) to an opponent moving towards the opponent's goal by an offence punishable by a free kick.",
    verdict: "CORRECT",
    confidence: 98,
    lawCited: "Under FIFA Law 12, Article 3...",
    graniteAnalysis: `Wayne Hennessey challenged Taremi far outside the penalty area, raising his leg high and making contact with the player's chest.

Initially, the referee issued a yellow card, assuming a defender was back. However, VAR review verified that Taremi had complete control and was heading towards an open goal (DOGSO). The high contact also bordered on serious foul play.

The upgrade to a red card was legally correct and was the first red card issued of the 2022 World Cup.

VERDICT: CORRECT — DOGSO and high dangerous contact.`,
    drawingData: {
      goalkeeper: { x: 250, y: 180, label: "Hennessey (WAL)" },
      attacker: { x: 270, y: 195, label: "Taremi (IRI)" },
      contactPoint: { x: 260, y: 188 }
    },
    limbData: {
      attackingPlayer: {
        name: "Taremi",
        team: "IRI",
        joints: {
          nose:          { x: 285, y: 140 },
          leftShoulder:  { x: 268, y: 168 },
          rightShoulder: { x: 304, y: 166 },
          leftElbow:     { x: 257, y: 202 },
          rightElbow:    { x: 314, y: 198 },
          leftWrist:     { x: 250, y: 233 },
          rightWrist:    { x: 321, y: 228 },
          leftHip:       { x: 272, y: 248 },
          rightHip:      { x: 298, y: 246 },
          leftKnee:      { x: 268, y: 296 },
          rightKnee:     { x: 302, y: 293 },
          leftAnkle:     { x: 264, y: 344 },
          rightAnkle:    { x: 306, y: 340 },
          leftHeel:      { x: 261, y: 351 },
          rightHeel:     { x: 310, y: 347 },
        },
        offsideLimb: "leftShoulder",
        offsideLimbLabel: "Chest (Contact Zone)",
      },
      lastDefender: {
        name: "Hennessey",
        team: "WAL",
        joints: {
          nose:          { x: 245, y: 128 },
          leftShoulder:  { x: 228, y: 158 },
          rightShoulder: { x: 264, y: 155 },
          leftElbow:     { x: 217, y: 192 },
          rightElbow:    { x: 275, y: 185 },
          leftWrist:     { x: 210, y: 220 },
          rightWrist:    { x: 282, y: 212 },
          leftHip:       { x: 232, y: 238 },
          rightHip:      { x: 258, y: 235 },
          leftKnee:      { x: 228, y: 282 },
          rightKnee:     { x: 262, y: 278 },
          leftAnkle:     { x: 224, y: 326 },
          rightAnkle:    { x: 266, y: 321 },
          leftHeel:      { x: 221, y: 333 },
          rightHeel:     { x: 270, y: 328 },
        },
        referencePoint: "leftElbow",
        referenceLabel: "High Leg Contact",
      },
      offsideLineX: null,
      defenderLineX: null,
      marginCm: null,
      contactPoint: { x: 268, y: 170 },
      verdict: "CORRECT",
      explanation: "SAOT skeletal tracking identified Hennessey's raised right leg reaching the sternum keypoint of Taremi. The contact height (chest level, keypoint Y=166) combined with open-goal vector analysis (no defender between Taremi and the goal within 45°) triggered the DOGSO classification. VAR confirmed the upgrade to red."
    },
    polls: { correct: 95, wrong: 5, count: 28941 }
  },
  {
    id: "brazil-sui-2022",
    title: "Brazil Penalty Appeal",
    match: "BRA vs SUI · 2022 GROUP G",
    description: "Richarlison tackle check in the box",
    minute: "64'",
    type: "PENALTY",
    stadium: "Stadium 974",
    attendance: "43,649",
    players: [
      { name: "Richarlison", team: "BRA", role: "Attacker", flag: "🇧🇷" },
      { name: "Nico Elvedi", team: "SUI", role: "Defender", flag: "🇨🇭" },
      { name: "Ivan Barton", team: "SLV", role: "Referee", flag: "🇸🇻" }
    ],
    duration: "2:40",
    lawNumber: "14",
    lawTitle: "Law 14 — The Penalty Kick",
    lawExcerpt: "A penalty kick is awarded if a player commits a direct free kick offence inside their penalty area or off the field as part of play, as outlined in Laws 12 and 13.",
    verdict: "CONTROVERSIAL",
    confidence: 65,
    lawCited: "Under FIFA Law 14, Article 1...",
    graniteAnalysis: `Richarlison fell inside the penalty box after attempting a dribble around Elvedi.

VAR visual replay shows Elvedi touched the ball with the tip of his boot before making physical contact with Richarlison's ankle. While the physical contact was heavy, playing the ball first typically rules out a penalty under standard interpretations.

The referee's decision not to award the penalty stood after VAR verified the ball touch, though Brazilian fans strongly contested the severity of the follow-through.

VERDICT: CONTROVERSIAL — contact was heavy but ball was played first.`,
    drawingData: {
      defender: { x: 340, y: 220, label: "Elvedi (SUI)" },
      attacker: { x: 350, y: 215, label: "Richarlison (BRA)" },
      contactPoint: { x: 345, y: 218 }
    },
    limbData: {
      attackingPlayer: {
        name: "Richarlison",
        team: "BRA",
        joints: {
          nose:          { x: 358, y: 138 },
          leftShoulder:  { x: 340, y: 168 },
          rightShoulder: { x: 376, y: 166 },
          leftElbow:     { x: 329, y: 202 },
          rightElbow:    { x: 387, y: 198 },
          leftWrist:     { x: 322, y: 233 },
          rightWrist:    { x: 394, y: 228 },
          leftHip:       { x: 344, y: 248 },
          rightHip:      { x: 372, y: 246 },
          leftKnee:      { x: 340, y: 296 },
          rightKnee:     { x: 376, y: 293 },
          leftAnkle:     { x: 336, y: 344 },
          rightAnkle:    { x: 380, y: 340 },
          leftHeel:      { x: 333, y: 351 },
          rightHeel:     { x: 384, y: 347 },
        },
        offsideLimb: "leftAnkle",
        offsideLimbLabel: "Left Ankle (Contact Zone)",
      },
      lastDefender: {
        name: "Elvedi",
        team: "SUI",
        joints: {
          nose:          { x: 326, y: 142 },
          leftShoulder:  { x: 310, y: 172 },
          rightShoulder: { x: 344, y: 170 },
          leftElbow:     { x: 299, y: 207 },
          rightElbow:    { x: 354, y: 202 },
          leftWrist:     { x: 292, y: 238 },
          rightWrist:    { x: 361, y: 232 },
          leftHip:       { x: 314, y: 252 },
          rightHip:      { x: 340, y: 250 },
          leftKnee:      { x: 310, y: 300 },
          rightKnee:     { x: 344, y: 297 },
          leftAnkle:     { x: 306, y: 348 },
          rightAnkle:    { x: 348, y: 344 },
          leftHeel:      { x: 303, y: 355 },
          rightHeel:     { x: 352, y: 351 },
        },
        referencePoint: "rightAnkle",
        referenceLabel: "Boot Tip (Ball Contact)",
      },
      offsideLineX: null,
      defenderLineX: null,
      marginCm: null,
      contactPoint: { x: 348, y: 344 },
      verdict: "CONTROVERSIAL",
      explanation: "Frame-by-frame analysis shows Elvedi's boot tip keypoint (rightAnkle, X=348, Y=344) makes contact with the ball 18ms before his studs reach Richarlison's left ankle keypoint (X=336, Y=344). The 18ms window is within human reaction limit. Ball-first contact typically negates a foul, but the subsequent follow-through force was flagged as disproportionate."
    },
    polls: { correct: 58, wrong: 42, count: 39502 }
  }
];
