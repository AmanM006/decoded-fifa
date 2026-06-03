export const SET_PIECE_MATCHES = [
  {
    id: "fra-cro-2018",
    name: "FRANCE vs CROATIA · 2018 FIFA WORLD CUP FINAL",
    score: "4 — 2",
    year: "2018",
    corners: [
      {
        id: "fra-cro-18",
        minute: "18' FREE KICK",
        team: "FRA",
        outcome: "GOAL",
        xG: 0.23,
        shotProb: 34,
        formationFilter: "Goals",
        tacticalBreakdown: "France's 18' free kick by Griezmann from the left flank was delivered with inswinging pace aimed at the near post. Croatia's wall and zonal defensive structure left a dangerous gap between Subašić and his defenders. Mandžukić, tracking back to defend, misjudged the flight and glanced it into his own net — the first OG in a World Cup Final. The delivery's trajectory (34° inswing angle) was designed to exploit this specific defensive gap.",
        ballStart: { x: 750, y: 10 },
        targetZone: { x: 670, y: 220, rx: 40, ry: 25 },
        goalkeeper: { x: 730, y: 250, name: "Subašić", num: "23" },
        attackers: [
          { x: 660, y: 210, name: "Mandžukić (OG)", num: "17", runX: 675, runY: 225 },
          { x: 680, y: 190, name: "Griezmann", num: "7", runX: 690, runY: 205 },
          { x: 630, y: 230, name: "Varane", num: "4", runX: 650, runY: 225 },
          { x: 620, y: 280, name: "Pogba", num: "6", runX: 640, runY: 250 }
        ],
        defenders: [
          { x: 710, y: 210, name: "Lovren", num: "6", trackX: 690, trackY: 215 },
          { x: 700, y: 260, name: "Vida", num: "21", trackX: 680, trackY: 250 },
          { x: 685, y: 235, name: "Brozović", num: "11", trackX: 675, trackY: 230 },
          { x: 665, y: 170, name: "Perišić", num: "4", trackX: 675, trackY: 185 }
        ],
        similarCorners: [
          { match: "FRA vs BEL 2018 SF", outcome: "GOAL (Umtiti header from corner)", linkId: "fra-cro-18" },
          { match: "ENG vs SWE 2018 QF", outcome: "GOAL (Maguire header from corner)", linkId: "fra-cro-18" },
          { match: "ARG vs FRA 2022 Final", outcome: "Cleared (Otamendi)", linkId: "fra-cro-18" }
        ]
      },
      {
        id: "fra-cro-67",
        minute: "67'",
        team: "CRO",
        outcome: "Saved",
        xG: 0.08,
        shotProb: 12,
        formationFilter: "Shots",
        tacticalBreakdown: "Croatia's 67' corner (outswinging) from the right aimed at the edge of the 6-yard box. Lovren made a strong run to the near post but Lloris — playing one of the best goalkeeper performances in a World Cup Final — made a confident catch above the Croatian attackers. France's defensive line squeezed quickly, reducing Lovren's approach angle. Croatia had 5 set-pieces in this match and converted none.",
        ballStart: { x: 750, y: 490 },
        targetZone: { x: 650, y: 270, rx: 40, ry: 25 },
        goalkeeper: { x: 740, y: 250, name: "Lloris", num: "1" },
        attackers: [
          { x: 630, y: 260, name: "Lovren", num: "6", runX: 645, runY: 265 },
          { x: 620, y: 210, name: "Vida", num: "21", runX: 635, runY: 230 },
          { x: 650, y: 290, name: "Perišić", num: "4", runX: 660, runY: 280 }
        ],
        defenders: [
          { x: 690, y: 240, name: "Varane", num: "4", trackX: 660, trackY: 255 },
          { x: 700, y: 270, name: "Pogba", num: "6", trackX: 680, trackY: 275 },
          { x: 660, y: 200, name: "Hernández", num: "21", trackX: 650, trackY: 215 }
        ],
        similarCorners: [
          { match: "CRO vs RUS 2018", outcome: "GOAL (Vida)", linkId: "fra-cro-67" },
          { match: "BEL vs ENG 2018", outcome: "Cleared (Kompany)", linkId: "fra-cro-67" },
          { match: "BRA vs SUI 2018", outcome: "Saved (Silva)", linkId: "fra-cro-67" }
        ]
      }
    ]
  },
  {
    id: "arg-fra-2022",
    name: "ARGENTINA vs FRANCE · 2022 FIFA WORLD CUP FINAL",
    score: "3 — 3 (4-2 p)",
    year: "2022",
    corners: [
      {
        id: "arg-fra-23",
        minute: "23'",
        team: "ARG",
        outcome: "Cleared",
        xG: 0.04,
        shotProb: 8,
        formationFilter: "Cleared",
        tacticalBreakdown: "Di María attempted a short-corner setup with Messi to pull Varane out of the central zone. The crossing delivery was low and inswinging, but Konaté read the flight perfectly and headed the ball clear at the near post before Mac Allister could make contact.",
        ballStart: { x: 750, y: 10 },
        targetZone: { x: 690, y: 180, rx: 35, ry: 20 },
        goalkeeper: { x: 740, y: 245, name: "Lloris", num: "1" },
        attackers: [
          { x: 720, y: 80, name: "Messi", num: "10", runX: 710, runY: 120 },
          { x: 650, y: 190, name: "Mac Allister", num: "20", runX: 680, runY: 185 },
          { x: 620, y: 240, name: "Otamendi", num: "19", runX: 640, runY: 220 }
        ],
        defenders: [
          { x: 690, y: 160, name: "Konaté", num: "24", trackX: 690, trackY: 175 },
          { x: 680, y: 220, name: "Varane", num: "4", trackX: 660, trackY: 200 },
          { x: 700, y: 200, name: "Rabiot", num: "14", trackX: 700, trackY: 190 }
        ],
        similarCorners: [
          { match: "ARG vs NED 2022", outcome: "Cleared (Van Dijk)", linkId: "arg-fra-23" },
          { match: "ARG vs CRO 2022", outcome: "Saved (Lovren)", linkId: "arg-fra-23" },
          { match: "FRA vs MAR 2022", outcome: "Cleared (Saïss)", linkId: "arg-fra-23" }
        ]
      },
      {
        id: "arg-fra-104",
        minute: "104'",
        team: "FRA",
        outcome: "Shot",
        xG: 0.15,
        shotProb: 22,
        formationFilter: "Shots",
        tacticalBreakdown: "Coman delivered a whipping inswinger targeting the back post. Upamecano leaped above Romero and connected with a powerful header that flew just wide of Martinez's left post. A minor block from Tagliafico altered the trajectory slightly.",
        ballStart: { x: 750, y: 490 },
        targetZone: { x: 640, y: 290, rx: 40, ry: 25 },
        goalkeeper: { x: 735, y: 250, name: "Martínez", num: "23" },
        attackers: [
          { x: 620, y: 280, name: "Upamecano", num: "18", runX: 635, runY: 285 },
          { x: 610, y: 240, name: "Mbappé", num: "10", runX: 625, runY: 250 },
          { x: 650, y: 310, name: "Varane", num: "4", runX: 645, runY: 300 }
        ],
        defenders: [
          { x: 680, y: 260, name: "Romero", num: "13", trackX: 645, trackY: 280 },
          { x: 670, y: 290, name: "Tagliafico", num: "3", trackX: 655, trackY: 295 },
          { x: 690, y: 230, name: "Otamendi", num: "19", trackX: 660, trackY: 240 }
        ],
        similarCorners: [
          { match: "FRA vs ENG 2022", outcome: "GOAL (Giroud)", linkId: "arg-fra-104" },
          { match: "FRA vs POL 2022", outcome: "Shot (Varane)", linkId: "arg-fra-104" },
          { match: "MAR vs POR 2022", outcome: "GOAL (En-Nesyri)", linkId: "arg-fra-104" }
        ]
      }
    ]
  },
  {
    id: "bra-ger-2014",
    name: "BRAZIL vs GERMANY · 2014 FIFA SEMI FINAL",
    score: "1 — 7",
    year: "2014",
    corners: [
      {
        id: "bra-ger-11",
        minute: "11'",
        team: "GER",
        outcome: "GOAL",
        xG: 0.31,
        shotProb: 40,
        formationFilter: "Goals",
        tacticalBreakdown: "Kroos corner kick targeted the penalty spot. Thomas Müller broke free from David Luiz's loose man-marking with a sharp forward dart and side-footed it in completely unmarked. Brazil's lack of communication on the blocking scheme was exposed instantly.",
        ballStart: { x: 750, y: 10 },
        targetZone: { x: 640, y: 250, rx: 40, ry: 25 },
        goalkeeper: { x: 730, y: 250, name: "Júlio César", num: "12" },
        attackers: [
          { x: 610, y: 230, name: "Müller", num: "13", runX: 640, runY: 245 },
          { x: 630, y: 200, name: "Klose", num: "11", runX: 645, runY: 210 },
          { x: 600, y: 270, name: "Hummels", num: "5", runX: 620, runY: 260 }
        ],
        defenders: [
          { x: 650, y: 220, name: "David Luiz", num: "4", trackX: 645, trackY: 235 },
          { x: 670, y: 250, name: "Fernandinho", num: "5", trackX: 660, trackY: 248 },
          { x: 640, y: 280, name: "Maicon", num: "23", trackX: 635, trackY: 275 }
        ],
        similarCorners: [
          { match: "GER vs FRA 2014", outcome: "GOAL (Hummels)", linkId: "bra-ger-11" },
          { match: "BRA vs COL 2014", outcome: "GOAL (Silva)", linkId: "bra-ger-11" },
          { match: "GER vs POR 2014", outcome: "GOAL (Hummels)", linkId: "bra-ger-11" }
        ]
      }
    ]
  },
  {
    id: "esp-ned-2010",
    name: "SPAIN vs NETHERLANDS · 2010 FIFA WORLD CUP FINAL",
    score: "1 — 0",
    year: "2010",
    corners: [
      {
        id: "esp-ned-48",
        minute: "48'",
        team: "ESP",
        outcome: "Saved",
        xG: 0.12,
        shotProb: 18,
        formationFilter: "Shots",
        tacticalBreakdown: "Xavi's inswinging corner picked out Puyol at the near post. Puyol generated tremendous power but headed it straight into Stekelenburg's hands. The Dutch zonal block was disorganized, allowing Puyol an unimpeded header.",
        ballStart: { x: 750, y: 10 },
        targetZone: { x: 670, y: 200, rx: 35, ry: 20 },
        goalkeeper: { x: 730, y: 240, name: "Stekelenburg", num: "1" },
        attackers: [
          { x: 630, y: 180, name: "Puyol", num: "5", runX: 665, runY: 195 },
          { x: 620, y: 230, name: "Piqué", num: "3", runX: 640, runY: 220 },
          { x: 640, y: 270, name: "Villa", num: "7", runX: 650, runY: 260 }
        ],
        defenders: [
          { x: 680, y: 190, name: "Heitinga", num: "3", trackX: 670, trackY: 192 },
          { x: 690, y: 220, name: "Mathijsen", num: "4", trackX: 675, trackY: 215 },
          { x: 660, y: 250, name: "Van Bommel", num: "6", trackX: 655, trackY: 245 }
        ],
        similarCorners: [
          { match: "ESP vs GER 2010", outcome: "GOAL (Puyol)", linkId: "esp-ned-48" },
          { match: "NED vs BRA 2010", outcome: "GOAL (Sneijder)", linkId: "esp-ned-48" },
          { match: "ESP vs PAR 2010", outcome: "Saved (Piqué)", linkId: "esp-ned-48" }
        ]
      }
    ]
  },
  {
    id: "eng-col-2018",
    name: "ENGLAND vs COLOMBIA · 2018 FIFA WORLD CUP R16",
    score: "1 — 1 (4-3 p)",
    year: "2018",
    corners: [
      {
        id: "eng-col-93",
        minute: "93'",
        team: "COL",
        outcome: "GOAL",
        xG: 0.28,
        shotProb: 38,
        formationFilter: "Goals",
        tacticalBreakdown: "Yerry Mina scored a dramatic late equalizer by rising above the English defense on a Cuadrado outswinging corner. Trippier on the line tried to block but the header's bounce carried it into the roof of the net. Mina's running leap was completely unchecked.",
        ballStart: { x: 750, y: 490 },
        targetZone: { x: 650, y: 260, rx: 45, ry: 25 },
        goalkeeper: { x: 730, y: 250, name: "Pickford", num: "1" },
        attackers: [
          { x: 610, y: 280, name: "Mina", num: "13", runX: 645, runY: 265 },
          { x: 620, y: 230, name: "Falcao", num: "9", runX: 635, runY: 240 },
          { x: 600, y: 200, name: "Davinson Sánchez", num: "23", runX: 615, runY: 215 }
        ],
        defenders: [
          { x: 660, y: 270, name: "Maguire", num: "6", trackX: 650, trackY: 268 },
          { x: 670, y: 240, name: "Stones", num: "5", trackX: 655, trackY: 245 },
          { x: 740, y: 280, name: "Trippier (line)", num: "12", trackX: 740, trackY: 280 },
          { x: 650, y: 210, name: "Kane", num: "9", trackX: 640, trackY: 215 }
        ],
        similarCorners: [
          { match: "COL vs SEN 2018", outcome: "GOAL (Mina)", linkId: "eng-col-93" },
          { match: "COL vs POL 2018", outcome: "GOAL (Mina)", linkId: "eng-col-93" },
          { match: "ENG vs CRO 2018", outcome: "GOAL (Perišić)", linkId: "eng-col-93" }
        ]
      }
    ]
  }
];
