export const FIFA_LAWS = [
  {
    id: "law-1",
    number: 1,
    title: "The Field of Play",
    emoji: "🏟️",
    color: "#00c2a8",
    summary: "Rules about the size and markings of the pitch.",
    articles: [
      {
        id: "law-1-1",
        title: "Field Surface",
        keywords: ["pitch", "grass", "surface", "turf", "artificial", "field", "ground"],
        officialText: "Matches may be played on natural or artificial surfaces, according to the rules of the competition. The colour of artificial surfaces must be green. Where artificial surfaces are used in either domestic or international competition between representative teams, the surface must comply with the FIFA Quality Programme for Football Turf or the International Match Standard, unless a special dispensation is given by FIFA.",
        plainEnglish: "Football can be played on real grass or artificial turf, but artificial pitches must be green and meet FIFA's quality standards. Both are totally legal — your favourite stadium might use either!"
      },
      {
        id: "law-1-2",
        title: "Field Dimensions",
        keywords: ["size", "length", "width", "dimensions", "pitch size", "big", "small", "how big"],
        officialText: "The field of play must be rectangular and marked with continuous lines. The length of the touch line must be greater than the length of the goal line. Length: minimum 90m – maximum 120m. Width: minimum 45m – maximum 90m. International matches: Length: minimum 100m – maximum 110m. Width: minimum 64m – maximum 75m.",
        plainEnglish: "A standard pitch is roughly 100m long and 68m wide — about the size of 1.4 American football fields. International stadiums must use a slightly more specific size range. That's why some pitches feel bigger or smaller depending on the club!"
      }
    ]
  },
  {
    id: "law-3",
    number: 3,
    title: "The Players",
    emoji: "👥",
    color: "#2b66ff",
    summary: "How many players, substitutions, and team rules.",
    articles: [
      {
        id: "law-3-1",
        title: "Number of Players",
        keywords: ["players", "eleven", "team", "how many", "minimum", "squad"],
        officialText: "A match is played by two teams, each with a maximum of eleven players; one must be the goalkeeper. A match may not start or continue if either team has fewer than seven players.",
        plainEnglish: "Each team plays with 11 players including the goalkeeper. If injuries or red cards reduce a team to 6 players, the game must be abandoned. A team can never have more than 11 on the pitch."
      },
      {
        id: "law-3-2",
        title: "Substitutions",
        keywords: ["substitute", "sub", "swap", "change", "replace", "extra time", "fifth sub"],
        officialText: "In official competitions, teams are permitted a maximum of five substitutions, with an additional substitution in extra time. If a match goes to extra time, a team that has not used all its substitutions may use one more substitution in extra time, regardless of the number used in normal time.",
        plainEnglish: "Teams get 5 substitutions in a normal game, plus a bonus 6th if extra time is played. This rule was introduced during COVID-19 and became permanent from 2022. You'll often see teams save one sub specifically for extra time — it's a tactical chess move."
      }
    ]
  },
  {
    id: "law-4",
    number: 4,
    title: "The Players' Equipment",
    emoji: "👕",
    color: "#ffd700",
    summary: "Rules about kits, boots, shinguards and accessories.",
    articles: [
      {
        id: "law-4-1",
        title: "Mandatory Equipment",
        keywords: ["kit", "shirt", "boots", "shinguards", "socks", "equipment", "uniform", "wear"],
        officialText: "The mandatory equipment of a player comprises: a jersey or shirt with sleeves; shorts; socks – if undershorts or tights are worn, they must be the same colour as the shorts; shinguards; footwear.",
        plainEnglish: "Every player MUST wear: a jersey, shorts, socks, shinguards, and boots. If a player wears tights under their shorts, they must be the same colour. Referees can and do send players off the pitch to fix this — even in big matches!"
      },
      {
        id: "law-4-2",
        title: "Jewellery & Electronic Devices",
        keywords: ["jewellery", "watch", "ring", "earring", "jewelry", "bracelet", "device", "camera"],
        officialText: "Players must not use or wear electronic communication devices. Players must not wear any item of jewellery (necklaces, rings, bracelets, earrings, leather bands, rubber bands, etc.).",
        plainEnglish: "No jewellery allowed on the pitch — rings, necklaces, earrings, even rubber bands. No smart watches or earphones either. Players tape over wedding rings or remove them entirely. This is purely a safety rule — jewellery can cause serious cuts in challenges."
      }
    ]
  },
  {
    id: "law-5",
    number: 5,
    title: "The Referee",
    emoji: "👨‍⚖️",
    color: "#ff6f00",
    summary: "The referee's authority, powers, and decisions.",
    articles: [
      {
        id: "law-5-1",
        title: "Authority of the Referee",
        keywords: ["referee", "decision", "authority", "final", "overrule", "wrong decision", "mistake"],
        officialText: "Each match is controlled by a referee who has full authority to enforce the Laws of the Game in connection with the match to which they have been appointed.",
        plainEnglish: "The referee is essentially the judge, jury, and executioner on the pitch. Their call is final for anything that happens during the game. Even if they make a clear mistake, their decisions cannot be appealed during the match — only through official post-match processes."
      },
      {
        id: "law-5-2",
        title: "VAR Checks",
        keywords: ["VAR", "video", "replay", "review", "check", "technology", "screen", "assistant"],
        officialText: "The referee may only review an incident if the VAR has communicated that there is a 'clear and obvious error' or a 'serious missed incident'. After the review, the referee's decision is final.",
        plainEnglish: "VAR doesn't replace the referee — it only intervenes for 'clear and obvious errors.' The bar is deliberately high so refs aren't second-guessed on every decision. Once the referee reviews the screen and makes a final call, that's it — even VAR can't override it a second time."
      }
    ]
  },
  {
    id: "law-7",
    number: 7,
    title: "The Duration of the Match",
    emoji: "⏱️",
    color: "#00c2a8",
    summary: "Match timing, added time, and extra time rules.",
    articles: [
      {
        id: "law-7-1",
        title: "Periods of Play",
        keywords: ["90 minutes", "halftime", "periods", "how long", "duration", "time", "minutes"],
        officialText: "The match lasts for two equal halves of 45 minutes, which may only be reduced if agreed between the referee and the two teams before the start of play and is in accordance with competition rules.",
        plainEnglish: "A standard match is 2 × 45 minutes = 90 minutes. The halftime break is 15 minutes. Only in very rare circumstances (like extreme heat or technical issues) can the halves be shortened. Friendly matches sometimes have shorter periods by mutual agreement."
      },
      {
        id: "law-7-2",
        title: "Added Time (Stoppage Time)",
        keywords: ["stoppage", "added time", "injury time", "extra minutes", "how much time", "why so long", "6 minutes"],
        officialText: "Allowance is made by the referee in each half for all time lost in that half through: substitutions, assessment of injured players, removal of injured players, time wasting, disciplinary sanctions, drinks/cooling breaks, VAR checks, goal celebrations and any other cause.",
        plainEnglish: "The referee adds back all the time wasted — every substitution (30 seconds each), VAR check, goal celebration, injury assessment, and any player who wastes time. Since 2022 Qatar World Cup, FIFA instructed referees to be much stricter, leading to those 8–10 minute stoppage times that shocked everyone. It was always the rule — refs were just finally enforcing it."
      }
    ]
  },
  {
    id: "law-10",
    number: 10,
    title: "Determining the Outcome",
    emoji: "⚽",
    color: "#ffd700",
    summary: "How goals are scored, own goals, and penalty shootouts.",
    articles: [
      {
        id: "law-10-1",
        title: "Method of Scoring",
        keywords: ["goal", "score", "line", "crossbar", "hand", "offside goal", "own goal"],
        officialText: "A goal is scored when the whole of the ball passes over the goal line, between the goalposts and under the crossbar, provided that no offence has been committed by the team scoring the goal or the ball has not been deliberately handled by a player (including the goalkeeper).",
        plainEnglish: "The WHOLE ball must cross the WHOLE goal line — not just touch it or be partially over. This is where goal-line technology became critical. An own goal counts as a goal for the opposition. A goal scored directly from a throw-in does NOT count — it's a corner or goal kick instead."
      },
      {
        id: "law-10-2",
        title: "Kicks from the Penalty Mark (Shootout)",
        keywords: ["penalty shootout", "penalties", "kicks", "miss", "save", "coin toss", "sudden death"],
        officialText: "Each team selects 5 players to take kicks. After 5 kicks each, if still level, kicks continue (sudden death) until one team scores and the other misses from the same number of kicks. All eligible players (including the goalkeeper) may take a kick.",
        plainEnglish: "In a shootout, both teams take 5 penalties each. If still tied, it goes to sudden death — first team to score when the other misses wins. Every eligible player can take one, including the goalkeeper. The side chosen depends on a coin toss. The goalkeeper defending and the one taking can be different players."
      }
    ]
  },
  {
    id: "law-11",
    number: 11,
    title: "Offside",
    emoji: "🚩",
    color: "#ff3b30",
    summary: "The offside rule — when a player is in an illegal position.",
    articles: [
      {
        id: "law-11-1",
        title: "Offside Position",
        keywords: ["offside", "position", "nearer", "goal line", "ahead", "defender", "last man", "second last"],
        officialText: "It is not an offence to be in an offside position. A player is in an offside position if: any part of the head, body or feet is in the opponents' half (excluding the halfway line) and any part of the head, body or feet is nearer to the opponents' goal line than both the ball and the second-last opponent.",
        plainEnglish: "Being offside isn't automatically a foul — you're only punished if you're INVOLVED in the play. You're in an offside position if any part of your body (not your arms!) that can legally touch the ball is: 1) in the opponent's half AND 2) ahead of the ball AND 3) ahead of the second-to-last defender (usually the last outfield player). Even a toe counts."
      },
      {
        id: "law-11-2",
        title: "Offside Offence",
        keywords: ["offside offence", "active", "involved", "interfere", "play", "touching", "playable"],
        officialText: "A player in an offside position at the moment the ball is played or touched by a team-mate is only penalised on becoming involved in active play by: interfering with play, interfering with an opponent, or gaining an advantage by being in that position.",
        plainEnglish: "Being in an offside position is only a foul if you then get INVOLVED. If the ball comes to a player who was offside, they're penalised. But if someone else plays the ball instead, nothing happens. This is why you see players in offside positions who don't get flagged — they weren't part of the action."
      },
      {
        id: "law-11-3",
        title: "No Offside Situations",
        keywords: ["not offside", "no offside", "goal kick", "corner", "throw in", "own half", "cannot be offside"],
        officialText: "There is no offside offence if a player receives the ball directly from: a goal kick, a throw-in, a corner kick. A player who is level with the second-last opponent is not in an offside position.",
        plainEnglish: "You literally CANNOT be offside from a corner kick, a goal kick, or a throw-in. It's impossible. Also, being exactly level with the last defender is ONSIDE — the defender must be ahead of you to make you offside. This is why VAR sometimes rules players onside by literally millimetres."
      }
    ]
  },
  {
    id: "law-12",
    number: 12,
    title: "Fouls and Misconduct",
    emoji: "🟡",
    color: "#ffd700",
    summary: "What counts as a foul, yellow card, or red card offence.",
    articles: [
      {
        id: "law-12-1",
        title: "Direct Free Kick Offences",
        keywords: ["foul", "tackle", "kick", "push", "hold", "charge", "trip", "direct free kick", "penalty"],
        officialText: "A direct free kick is awarded if a player commits any of the following offences: kicks or attempts to kick an opponent, trips or attempts to trip, jumps at, charges, strikes or attempts to strike, pushes, makes contact with the opponent before touching the ball when making a tackle, bites or spits at, throws an object.",
        plainEnglish: "These are the 'classic' fouls — kicking, tripping, pushing, holding, or making contact with the player before the ball in a tackle. If these happen inside the penalty box, it's a penalty kick instead of a free kick. Biting and spitting are also included here (yes, it has to be written down)."
      },
      {
        id: "law-12-2",
        title: "Handball",
        keywords: ["handball", "hand", "arm", "deliberate", "natural", "accidental", "armpit", "elbow"],
        officialText: "It is an offence if a player: deliberately touches the ball with their hand/arm, touches the ball with their hand/arm when it has made their body unnaturally bigger, scores or creates a goal-scoring opportunity after touching the ball with their hand/arm.",
        plainEnglish: "Handball is one of the most debated rules. 'Natural position' arms are generally fine — if your arm is tucked in and the ball hits it, usually no foul. But if your arm makes you wider/bigger than your natural body shape, it's handball. The armpit is included. Scoring a goal after ANY handball (even accidental) is disallowed."
      },
      {
        id: "law-12-3",
        title: "Yellow Card Offences",
        keywords: ["yellow card", "booking", "caution", "simulation", "diving", "time wasting", "disrespect", "celebration"],
        officialText: "A player is cautioned if they: unsporting behaviour, dissent by word or action, persistent infringement, delaying the restart of play, failing to respect the required distance, entering, re-entering or deliberately leaving without the referee's permission, excessively celebrate.",
        plainEnglish: "Yellow cards cover a wide range: diving/simulation, arguing too aggressively with the referee, deliberately wasting time, taking off your shirt to celebrate, running to the fans behind the goal (too far from pitch), and repeat fouling. Two yellows = red card and you're off."
      },
      {
        id: "law-12-4",
        title: "Red Card / Violent Conduct",
        keywords: ["red card", "sent off", "violent", "serious foul", "DOGSO", "last man", "kung fu", "elbow", "headbutt"],
        officialText: "A player, substitute or substituted player is sent off if they commit: serious foul play, violent conduct, biting or spitting, denying a goal or obvious goal-scoring opportunity (DOGSO), using offensive, insulting or abusive language or gestures, receiving a second caution.",
        plainEnglish: "Straight red cards are for: violent tackles (studs up to someone's legs at full pace), headbutts/elbows, biting/spitting, and DOGSO — Denying an Obvious Goal Scoring Opportunity, i.e. the 'last man' tackle or deliberate handball to stop a goal. DOGSO earns both a red card AND a penalty if it happens in the box."
      }
    ]
  },
  {
    id: "law-14",
    number: 14,
    title: "The Penalty Kick",
    emoji: "🥅",
    color: "#ff3b30",
    summary: "All the rules for taking penalty kicks during the game.",
    articles: [
      {
        id: "law-14-1",
        title: "When a Penalty is Awarded",
        keywords: ["penalty", "spot kick", "twelve yards", "penalty area", "box", "foul in box"],
        officialText: "A penalty kick is awarded when a player commits a direct free kick offence inside their own penalty area or off the field as part of play as outlined in Laws 12 and 13. A goal may be scored directly from a penalty kick.",
        plainEnglish: "Any foul that would normally be a direct free kick, if committed inside the penalty box, becomes a penalty instead. The ball is placed on the penalty spot (11 metres from goal). One player takes the shot, with only the goalkeeper to beat. Every other player must be outside the box and arc until the ball is kicked."
      },
      {
        id: "law-14-2",
        title: "Goalkeeper Encroachment",
        keywords: ["goalkeeper", "move", "line", "penalty save", "step off line", "cheat", "retake", "encroachment"],
        officialText: "When the kick is taken, the defending goalkeeper must remain on the goal line, facing the kicker, between the goalposts, until the ball is kicked. The goalkeeper may move along the goal line before the ball is in play.",
        plainEnglish: "The goalkeeper must stay on the goal line until the ball is kicked — but they CAN move sideways along the line. The famous 'goalkeeper off the line' penalty retake only happens if the keeper steps OFF the line (forward or too early). Modern VAR can check this. If the kick is already saved when the infringement is spotted, the keeper keeps the save AND gets a yellow card."
      }
    ]
  },
  {
    id: "law-17",
    number: 17,
    title: "The Corner Kick",
    emoji: "📐",
    color: "#2b66ff",
    summary: "Rules for corner kicks — when and how they're taken.",
    articles: [
      {
        id: "law-17-1",
        title: "Procedure",
        keywords: ["corner kick", "corner", "how taken", "arc", "flag", "position", "defending"],
        officialText: "The ball is placed inside the corner arc nearest to the point where it crossed the goal line. Opponents must be at least 9.15m from the corner arc until the ball is in play. The ball is in play when it is kicked and clearly moves.",
        plainEnglish: "A corner is awarded when the defending team puts the ball out over their own goal line (not a goal). The attacking team places the ball in the quarter-circle (corner arc) and all defenders must stand at least 9.15m away. You can't be offside directly from a corner kick — making it a prime set-piece opportunity."
      }
    ]
  }
];
