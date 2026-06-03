// Emotional sentiment data for famous World Cup matches
// Emotion values are 0–100 at each key minute
// Emotions: hope, anxiety, tension, jubilation, heartbreak

export const DRAMA_MATCHES = [
  {
    id: "france-brazil-1998",
    title: "France vs Brazil",
    subtitle: "1998 World Cup Semi-Final · Stade de France",
    score: "3 – 0",
    winner: "France",
    attendance: "79,000",
    flag1: "🇫🇷", flag2: "🇧🇷",
    team1: "France", team2: "Brazil",
    color: "#2b66ff",
    era: "Pre-VAR Era",
    culturalWeight: 98,
    dramaticRating: 9.2,
    graniteNarrative: `This was the night France stopped being a nation and became a dream.

Brazil arrived as the defending champions, led by Ronaldo — the greatest footballer on earth. France had never won a World Cup. The pre-match atmosphere was electric with a nation holding its breath.

Then came the most surreal subplot in football history: Ronaldo's mysterious pre-match episode. Reports of a seizure, or convulsions, circulated. He was left off the teamsheet, then reinstated. Nobody knew what was real. Brazil's greatest weapon arrived diminished, and the stadium could sense it.

Zidane was messianic. His two headed goals from corners — identical in almost every geometric detail — were acts of mathematical perfection delivered with the grace of a man who had been waiting his whole life for this moment.

The emotional arc of this match isn't about tactics. It's about a nation of immigrants — Zidane, the son of Algerian workers, leading Les Bleus — rewriting who France was. When Petit slid the third in at 90 minutes, an entire country became one thing: joy.`,
    keyMoments: [
      { minute: 0,  annotation: "Kick-off — Ronaldo's shock recall to starting lineup" },
      { minute: 27, annotation: "⚽ Zidane Header #1 (27')" },
      { minute: 45, annotation: "⚽ Zidane Header #2 (45+1') — HT 2-0 France" },
      { minute: 68, annotation: "Ronaldo substituted off — Brazil desperate" },
      { minute: 90, annotation: "⚽ Petit (90+3') seals it — France World Champions" }
    ],
    emotionCurve: [
      { minute: 0,  hope: 72, anxiety: 35, tension: 50, jubilation: 10, heartbreak: 5 },
      { minute: 5,  hope: 74, anxiety: 38, tension: 55, jubilation: 10, heartbreak: 5 },
      { minute: 15, hope: 70, anxiety: 42, tension: 58, jubilation: 10, heartbreak: 8 },
      { minute: 22, hope: 68, anxiety: 45, tension: 62, jubilation: 8,  heartbreak: 10 },
      { minute: 27, hope: 95, anxiety: 20, tension: 40, jubilation: 88, heartbreak: 2 },
      { minute: 35, hope: 92, anxiety: 22, tension: 38, jubilation: 80, heartbreak: 15 },
      { minute: 45, hope: 97, anxiety: 18, tension: 35, jubilation: 95, heartbreak: 20 },
      { minute: 50, hope: 93, anxiety: 25, tension: 45, jubilation: 72, heartbreak: 28 },
      { minute: 60, hope: 88, anxiety: 30, tension: 55, jubilation: 65, heartbreak: 35 },
      { minute: 68, hope: 82, anxiety: 38, tension: 60, jubilation: 58, heartbreak: 42 },
      { minute: 80, hope: 85, anxiety: 32, tension: 55, jubilation: 62, heartbreak: 38 },
      { minute: 90, hope: 99, anxiety: 5,  tension: 10, jubilation: 99, heartbreak: 5  }
    ]
  },
  {
    id: "italy-france-2006",
    title: "Italy vs France",
    subtitle: "2006 World Cup Final · Olympiastadion Berlin",
    score: "1 – 1 (5–3 pens)",
    winner: "Italy",
    attendance: "69,000",
    flag1: "🇮🇹", flag2: "🇫🇷",
    team1: "Italy", team2: "France",
    color: "#00c2a8",
    era: "Pre-VAR Era",
    culturalWeight: 100,
    dramaticRating: 10.0,
    graniteNarrative: `There are moments in sport that transcend sport. The 2006 World Cup Final is one of them.

Zidane, playing his last professional match ever, gave France the lead with an audacious Panenka penalty — a chip lofted straight down the middle, impossibly arrogant, perfectly placed. The crowd fell silent in disbelief. Then roared.

Materazzi equalised. The match drifted. Extra time. Zidane, the artist, the genius, the captain — was about to play his final 14 minutes of professional football.

Then came the headbutt.

What was said will never be fully known. Materazzi claimed he insulted Zidane's sister. Zidane said it was worse. Whatever the words, the man who had carried France for a generation, who had returned from retirement for this tournament, turned and delivered one of sport's most iconic acts of self-destruction.

Red card. Exit. Italy won on penalties.

The cultural weight is immeasurable: a champion's farewell turned into a tragedy. Not just a football match — a Shakespearean drama played out in front of a billion people.`,
    keyMoments: [
      { minute: 7,  annotation: "⚽ Zidane Panenka penalty — France 1-0" },
      { minute: 19, annotation: "⚽ Materazzi header — Italy equalise 1-1" },
      { minute: 45, annotation: "Half-Time — tension at maximum" },
      { minute: 90, annotation: "Full-Time 1-1 — Extra Time" },
      { minute: 110, annotation: "🟥 Zidane headbutt — sent off" },
      { minute: 120, annotation: "Penalty shootout — Italy win 5-3" }
    ],
    emotionCurve: [
      { minute: 0,   hope: 78, anxiety: 30, tension: 55, jubilation: 10, heartbreak: 5 },
      { minute: 7,   hope: 96, anxiety: 15, tension: 35, jubilation: 92, heartbreak: 3 },
      { minute: 19,  hope: 60, anxiety: 55, tension: 72, jubilation: 40, heartbreak: 45 },
      { minute: 30,  hope: 62, anxiety: 52, tension: 70, jubilation: 35, heartbreak: 42 },
      { minute: 45,  hope: 60, anxiety: 55, tension: 75, jubilation: 30, heartbreak: 44 },
      { minute: 55,  hope: 58, anxiety: 58, tension: 78, jubilation: 28, heartbreak: 46 },
      { minute: 70,  hope: 56, anxiety: 60, tension: 80, jubilation: 25, heartbreak: 48 },
      { minute: 90,  hope: 52, anxiety: 65, tension: 88, jubilation: 20, heartbreak: 52 },
      { minute: 100, hope: 50, anxiety: 68, tension: 90, jubilation: 18, heartbreak: 54 },
      { minute: 110, hope: 20, anxiety: 88, tension: 95, jubilation: 5,  heartbreak: 90 },
      { minute: 115, hope: 18, anxiety: 85, tension: 92, jubilation: 8,  heartbreak: 88 },
      { minute: 120, hope: 50, anxiety: 70, tension: 95, jubilation: 45, heartbreak: 60 }
    ]
  },
  {
    id: "brazil-germany-2014",
    title: "Brazil vs Germany",
    subtitle: "2014 World Cup Semi-Final · Estádio Mineirão",
    score: "1 – 7",
    winner: "Germany",
    attendance: "58,141",
    flag1: "🇧🇷", flag2: "🇩🇪",
    team1: "Brazil", team2: "Germany",
    color: "#ffd700",
    era: "Pre-VAR Era",
    culturalWeight: 100,
    dramaticRating: 10.0,
    graniteNarrative: `Football has its Hiroshimas. The Mineirazo is Brazil's.

Brazil entered this semi-final as the hosts, without Neymar (broken vertebra) and without their captain Thiago Silva (suspended). They entered with the weight of five World Cup titles, the expectation of 200 million people, and the fragility of a team held together by emotional tape.

In 18 minutes — from minute 23 to 29 — Germany scored four goals. Four. The stadium fell silent in a way that was beyond grief. People wept. Fans looked at each other in disbelief. Some laughed, because the human brain sometimes can't process devastation.

The final score was 7-1. In their own stadium. In a World Cup semi-final. In front of their own people.

This wasn't just a football result. It was the shattering of a national identity. Brazil's relationship with football is spiritual, existential. They don't just love the game — they believe they ARE the game. The Mineirazo challenged that belief to its foundation.

Germany lifted the trophy. Brazil spent months in national mourning for a sporting event.`,
    keyMoments: [
      { minute: 11,  annotation: "⚽ Müller (11') — Germany 1-0" },
      { minute: 23,  annotation: "⚽ Klose (23') — 2-0 (Record 16th WC goal)" },
      { minute: 24,  annotation: "⚽ Kroos (24') — 3-0" },
      { minute: 26,  annotation: "⚽ Kroos (26') — 4-0" },
      { minute: 29,  annotation: "⚽ Khedira (29') — 5-0 (18 min nightmare)" },
      { minute: 69,  annotation: "⚽ Schürrle (69') — 6-0" },
      { minute: 79,  annotation: "⚽ Schürrle (79') — 7-0" },
      { minute: 90,  annotation: "⚽ Oscar (90+1') — 7-1 consolation" }
    ],
    emotionCurve: [
      { minute: 0,  hope: 85, anxiety: 38, tension: 55, jubilation: 15, heartbreak: 5 },
      { minute: 11, hope: 30, anxiety: 75, tension: 82, jubilation: 5,  heartbreak: 60 },
      { minute: 18, hope: 25, anxiety: 80, tension: 85, jubilation: 3,  heartbreak: 70 },
      { minute: 23, hope: 10, anxiety: 88, tension: 90, jubilation: 2,  heartbreak: 82 },
      { minute: 24, hope: 5,  anxiety: 92, tension: 92, jubilation: 1,  heartbreak: 90 },
      { minute: 26, hope: 3,  anxiety: 95, tension: 93, jubilation: 1,  heartbreak: 95 },
      { minute: 29, hope: 2,  anxiety: 96, tension: 94, jubilation: 1,  heartbreak: 98 },
      { minute: 45, hope: 5,  anxiety: 90, tension: 85, jubilation: 2,  heartbreak: 95 },
      { minute: 60, hope: 8,  anxiety: 85, tension: 78, jubilation: 3,  heartbreak: 92 },
      { minute: 69, hope: 3,  anxiety: 88, tension: 82, jubilation: 2,  heartbreak: 96 },
      { minute: 79, hope: 2,  anxiety: 90, tension: 84, jubilation: 1,  heartbreak: 98 },
      { minute: 90, hope: 12, anxiety: 70, tension: 60, jubilation: 8,  heartbreak: 88 }
    ]
  },
  {
    id: "baggio-1994",
    title: "Italy vs Brazil",
    subtitle: "1994 World Cup Final · Rose Bowl, Pasadena",
    score: "0 – 0 (3–2 pens)",
    winner: "Brazil",
    attendance: "94,194",
    flag1: "🇮🇹", flag2: "🇧🇷",
    team1: "Italy", team2: "Brazil",
    color: "#00c2a8",
    era: "Pre-VAR Era",
    culturalWeight: 99,
    dramaticRating: 9.8,
    graniteNarrative: `Roberto Baggio's miss wasn't just a penalty miss. It was the weight of an entire nation's expectations crashing down in Pasadena's summer heat.

Italy had scraped through to this final — Baggio the lone saviour, dragging them through knockout rounds with goals that seemed to materialise from pure willpower. He wasn't just a player; he was Italy's emotional engine, their Buddhist monk-footballer who meditated before matches and wept after them.

The 1994 final was a game of extraordinary tension and bewildering goallessness. 120 minutes. No goals. The first penalty shootout in World Cup Final history.

When Baggio stepped up for Italy's last kick, they needed it to stay alive. He struck it over the bar. High and wide. Gone.

The image — Baggio, head bowed, hands on hips, ponytail still, surrounded by Brazilian celebration — is one of sport's most indelible photographs. He said years later: "That penalty still wakes me up at night. It will follow me to the grave."

Brazil became four-time champions. But the world remembers the miss.`,
    keyMoments: [
      { minute: 0,   annotation: "First World Cup Final in Pasadena heat" },
      { minute: 45,  annotation: "Half-Time 0-0 — tightest final in years" },
      { minute: 90,  annotation: "Full-Time 0-0 — Extra Time" },
      { minute: 120, annotation: "Shootout begins — Baresi misses first" },
      { minute: 122, annotation: "Baggio misses — Brazil champions" }
    ],
    emotionCurve: [
      { minute: 0,   hope: 75, anxiety: 35, tension: 60, jubilation: 8,  heartbreak: 5 },
      { minute: 20,  hope: 72, anxiety: 38, tension: 65, jubilation: 6,  heartbreak: 8 },
      { minute: 45,  hope: 68, anxiety: 42, tension: 70, jubilation: 5,  heartbreak: 12 },
      { minute: 60,  hope: 65, anxiety: 48, tension: 75, jubilation: 5,  heartbreak: 15 },
      { minute: 90,  hope: 55, anxiety: 60, tension: 85, jubilation: 4,  heartbreak: 30 },
      { minute: 100, hope: 50, anxiety: 65, tension: 88, jubilation: 4,  heartbreak: 38 },
      { minute: 110, hope: 48, anxiety: 68, tension: 90, jubilation: 3,  heartbreak: 42 },
      { minute: 120, hope: 45, anxiety: 72, tension: 95, jubilation: 3,  heartbreak: 50 },
      { minute: 121, hope: 10, anxiety: 85, tension: 96, jubilation: 2,  heartbreak: 95 },
      { minute: 122, hope: 5,  anxiety: 20, tension: 20, jubilation: 5,  heartbreak: 99 }
    ]
  },
  {
    id: "england-croatia-2018",
    title: "England vs Croatia",
    subtitle: "2018 World Cup Semi-Final · Luzhniki Stadium",
    score: "1 – 2",
    winner: "Croatia",
    attendance: "78,011",
    flag1: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", flag2: "🇭🇷",
    team1: "England", team2: "Croatia",
    color: "#ff3b30",
    era: "VAR Era",
    culturalWeight: 88,
    dramaticRating: 8.5,
    graniteNarrative: `"It's coming home." Three words that carried the weight of 52 years of hurt — and then didn't.

England had been magnificent in this tournament. Southgate, the manager who missed a penalty himself in 1996, had rebuilt English football's emotional DNA. Young, fearless, penalty-taking, tournament-believing. For 45 minutes, they were 1-0 up and the entire English nation was preparing itself for something impossible.

Then Croatia — a nation of 4 million people, having already played extra time in the quarter-final — simply refused to lose. Perišić equalised with a volleyed howitzer. Mandžukić scored in extra time. England were out.

The cultural weight cuts deeply: Croatia's population is smaller than London. They were playing their fourth match in 15 days, against a fresh England. Luka Modrić, 32, covered more ground than players ten years younger. This was a victory of collective will over individual talent, of nation over noise.

For England, 52 years became 56. But something changed. They believed again. That might matter more than the result.`,
    keyMoments: [
      { minute: 5,  annotation: "⚽ Trippier free-kick — England 1-0" },
      { minute: 45, annotation: "Half-Time 1-0 — England dreaming" },
      { minute: 68, annotation: "⚽ Perišić volley — 1-1" },
      { minute: 90, annotation: "Full-Time 1-1 — Extra Time" },
      { minute: 109, annotation: "⚽ Mandžukić — Croatia 2-1" },
      { minute: 120, annotation: "Final whistle — Croatia reach the Final" }
    ],
    emotionCurve: [
      { minute: 0,  hope: 80, anxiety: 30, tension: 55, jubilation: 10, heartbreak: 5 },
      { minute: 5,  hope: 98, anxiety: 12, tension: 28, jubilation: 95, heartbreak: 2 },
      { minute: 25, hope: 95, anxiety: 18, tension: 35, jubilation: 80, heartbreak: 5 },
      { minute: 45, hope: 96, anxiety: 20, tension: 40, jubilation: 82, heartbreak: 6 },
      { minute: 60, hope: 88, anxiety: 35, tension: 58, jubilation: 65, heartbreak: 20 },
      { minute: 68, hope: 45, anxiety: 65, tension: 80, jubilation: 25, heartbreak: 72 },
      { minute: 80, hope: 48, anxiety: 62, tension: 78, jubilation: 22, heartbreak: 68 },
      { minute: 90, hope: 44, anxiety: 68, tension: 85, jubilation: 18, heartbreak: 72 },
      { minute: 100,hope: 42, anxiety: 70, tension: 88, jubilation: 16, heartbreak: 75 },
      { minute: 109,hope: 10, anxiety: 88, tension: 90, jubilation: 5,  heartbreak: 95 },
      { minute: 120,hope: 5,  anxiety: 30, tension: 20, jubilation: 3,  heartbreak: 98 }
    ]
  },
  {
    id: "argentina-france-2022",
    title: "Argentina vs France",
    subtitle: "2022 World Cup Final · Lusail Stadium",
    score: "3 – 3 (4–2 pens)",
    winner: "Argentina",
    attendance: "88,966",
    flag1: "🇦🇷", flag2: "🇫🇷",
    team1: "Argentina", team2: "France",
    color: "#00c2a8",
    era: "VAR Era",
    culturalWeight: 100,
    dramaticRating: 10.0,
    graniteNarrative: `This was not a football match. It was the greatest sporting event in human history.

Argentina led 2-0 with 10 minutes remaining. Messi's World Cup, his redemption arc after the 2014 final loss, was 10 minutes from completion. The stadium was preparing for a coronation.

Then Mbappé.

In 97 seconds, France scored twice. Mbappé — 23 years old — had the composure of a machine and the talent of a deity. The match was level. The stadium lost its mind. 88,966 people simultaneously processed something their brains couldn't fully compute.

Extra time: Messi scored again to make it 3-2. Mbappé scored again from the penalty spot to make it 3-3. A hat-trick in a World Cup Final, in the last 10 minutes of normal time and extra time, coming from 2-0 down.

In the shootout, Argentina held their nerve. Messi finally won the only trophy that had eluded him. He wept. His teammates wept. A nation that had waited 36 years wept.

Mbappé scored his penalty in the shootout too — a hat-trick in a losing cause, top scorer of the tournament. He played like a champion in a losing team.

This match will be studied, discussed, and replayed for a hundred years. It was everything football can be.`,
    keyMoments: [
      { minute: 23,  annotation: "⚽ Messi penalty (23') — Argentina 1-0 (Di María fouled)" },
      { minute: 36,  annotation: "⚽ Di María goal (36') — Argentina 2-0" },
      { minute: 80,  annotation: "France down 2-0 — Mbappé steps up" },
      { minute: 80,  annotation: "⚽ Mbappé penalty (80') — 2-1" },
      { minute: 81,  annotation: "⚽ Mbappé volley (81') — 2-2" },
      { minute: 90,  annotation: "Full-Time 2-2 — Extra Time" },
      { minute: 108, annotation: "⚽ Messi (108') — Argentina 3-2" },
      { minute: 118, annotation: "⚽ Mbappé penalty (118') — 3-3" },
      { minute: 120, annotation: "Shootout — Messi wins the World Cup (4-2 pens)" }
    ],
    emotionCurve: [
      { minute: 0,   hope: 82, anxiety: 32, tension: 60, jubilation: 10, heartbreak: 5 },
      { minute: 23,  hope: 96, anxiety: 15, tension: 35, jubilation: 90, heartbreak: 3 },
      { minute: 36,  hope: 98, anxiety: 10, tension: 25, jubilation: 95, heartbreak: 2 },
      { minute: 60,  hope: 95, anxiety: 18, tension: 40, jubilation: 85, heartbreak: 5 },
      { minute: 75,  hope: 92, anxiety: 22, tension: 45, jubilation: 80, heartbreak: 8 },
      { minute: 80,  hope: 98, anxiety: 10, tension: 28, jubilation: 92, heartbreak: 3 },
      { minute: 80,  hope: 50, anxiety: 70, tension: 85, jubilation: 40, heartbreak: 60 },
      { minute: 81,  hope: 20, anxiety: 88, tension: 95, jubilation: 15, heartbreak: 85 },
      { minute: 90,  hope: 45, anxiety: 75, tension: 92, jubilation: 35, heartbreak: 65 },
      { minute: 100, hope: 48, anxiety: 72, tension: 90, jubilation: 38, heartbreak: 62 },
      { minute: 108, hope: 88, anxiety: 40, tension: 75, jubilation: 85, heartbreak: 35 },
      { minute: 118, hope: 40, anxiety: 80, tension: 96, jubilation: 30, heartbreak: 75 },
      { minute: 120, hope: 55, anxiety: 75, tension: 98, jubilation: 50, heartbreak: 55 }
    ]
  }
];
