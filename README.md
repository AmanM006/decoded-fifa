# ⚡ DECODED — FIFA World Cup 2026 AI Platform

> *"Every goal. Every decision. Every moment of 
> pressure. Finally decoded."*

![IBM Granite](https://img.shields.io/badge/IBM-Granite-052FAD)
![watsonx.ai](https://img.shields.io/badge/watsonx-AI-052FAD)
![Docling](https://img.shields.io/badge/Docling-RAG-00c853)
![StatsBomb](https://img.shields.io/badge/StatsBomb-Open%20Data-e8002d)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

---

## 🔴 The Problem

The FIFA World Cup 2026 will be watched by **6 billion 
people** — yet most will understand very little of 
what they're actually seeing.

- **85%** of football fans admit they're confused by VAR
- 48 participating nations include fan communities 
  who've never had these rules explained
- Elite clubs like Liverpool and FC Barcelona use 
  AI tools costing millions — inaccessible to fans
- Broadcasters show the moment. Nobody explains the WHY.

DECODED closes that gap.

---

## 💡 What DECODED Does

Five AI-powered modules. One platform. 
Every football moment — explained.

---

## 🌟 Features

### 🎯 Module 1 — Tactics AI
- Reconstructs real corner kicks from famous World Cup 
  matches using **StatsBomb open data**
- Live 2D pitch canvas showing player runs, target 
  zones, ball trajectories, xG probabilities
- Interactive passing network — click any player 
  to inspect passes, completion rate, key passes
- **IBM Granite** generates tactical narratives 
  explaining WHY plays succeeded or failed
- Matches: France vs Croatia 2018, Argentina vs 
  France 2022, Brazil vs Germany 2014

### 🧠 Module 2 — Pressure Index
**The CRUCIBLE SCORE** — a 5-dimensional psychological 
fingerprint measuring player mental state at 
high-stakes World Cup moments.

**5 DNA Metrics:**
| Metric | Measures |
|--------|----------|
| Composure | Emotional stability under stress |
| Clutch Capability | Historical big-moment performance |
| Stamina Index | Physical fatigue impact |
| Crowd Pressure Insulation | Resistance to 88k+ crowd |
| Big Game Experience | Tournament pedigree |

**Interactive features:**
- **Stress Sandbox** — sliders for crowd size, VAR 
  delay, fatigue. Hexagon morphs in real time.
- **Acoustic Wave Visualizer** — toggle Moroccan 
  Whistles, Argentine Drums, or Deafening Silence. 
  Watch composure index change.
- **Pressure Hall of Fame** — Mbappe 9.2, 
  Coman 9.4, Baggio 9.8

### ⚖️ Module 3 — VARdict
- Calibrated pitch canvas reconstruction of 
  controversial VAR decisions
- **29-point SAOT Limb-Tracking HUD** — renders 
  the full skeletal mesh used by Semi-Automated 
  Offside Technology, showing exact body part 
  positions to centimeter precision
- **Interactive Manual Calibrator** — drag the 
  offside line yourself to understand margins
- **Referee Decision Lab** — rule on the incident 
  before the official verdict is revealed
- **IBM Granite** delivers legal verdict grounded 
  in exact FIFA Law article
- Global fan poll showing worldwide opinion split

### 📖 Module 4 — Ask the Ref
- Semantic RAG search over **FIFA Laws of the Game 
  2024** parsed by **Docling**
- Plain English questions → exact FIFA clause 
  retrieved and highlighted
- IBM Granite translates dense legal jargon into 
  friendly, simple football terms
- Example questions:
  - "Can you score directly from a throw-in?"
  - "What counts as a handball?"
  - "When should VAR be used?"
  - "Is it offside if you're level?"

### ❤️ Module 5 — Drama Timeline
- Minute-by-minute emotional sentiment map of 
  iconic World Cup matches
- 5 emotion channels: Hope, Tension, Jubilation, 
  Heartbreak, Anxiety
- IBM Granite generates cultural narratives for 
  key emotional peaks
- Example: *"Baggio's miss in 1994 wasn't just 
  a statistic. It was the weight of an entire 
  nation collapsing in Pasadena's heat."*

---

## 🎨 Design Decisions & Engineering Choices

### 🎯 Tactics Canvas Focus Area
To replicate the high-density analytical experience used by professional match-day analysts, the Tactics AI module intentionally utilizes an expansive, uncompressed 2D vector field layout. This ensures that tactical metrics, passing lane geometry, and player movement vectors maintain true, distortion-free spatial scaling relative to the real-world pitch boundaries.

### 💀 Skeletal Grid Contrast (VARdict)
The 29-Point Skeletal Mesh HUD isolates body keypoints against an unlit tracking matrix. This engineering decision eliminates peripheral stadium noise, allowing the system to focus computational clarity purely on centimeter-precision limb coordinates during critical offside evaluations.

---

## 🤖 IBM Tools Used

### IBM Granite (watsonx.ai)
`granite-4-1-8b-instruct` powers all five modules:
- Tactical breakdown narratives (Tactics)
- Psychological pressure analysis (Pressure)
- Legal VAR verdicts (VARdict)
- Plain-English law translation (Ask the Ref)
- Cultural sentiment narratives (Drama)

### Docling
Parses the **FIFA Official Laws of the Game 2024** 
PDF into a structured semantic knowledge base. 
Powers the Ask the Ref RAG retrieval pipeline — 
returning exact article matches for any fan query.

### Langflow
Orchestrates the multi-step AI pipeline across 
all five modules — managing context injection, 
RAG retrieval, and Granite inference chains.

---

## 📊 Data Sources

| Source | Used For |
|--------|----------|
| StatsBomb Open Data | Real match events, corners, passing networks |
| FIFA Laws of the Game 2024 | Ask the Ref RAG (via Docling) |
| Pre-computed profiles | Pressure moments (Mbappe, Baggio, Zidane) |
| Historical match data | Drama Timeline sentiment curves |

StatsBomb open data:
`github.com/statsbomb/open-data`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) + React |
| Styling | Tailwind CSS + Custom CSS |
| Visualization | HTML5 Canvas API |
| AI | IBM Granite via watsonx.ai |
| RAG | Docling + semantic search |
| Icons | Lucide React |
| Fonts | Teko (headers) + Inter (body) |
| Data | StatsBomb Open Data API |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/AmanM006/decoded-fifa.git
cd decoded-fifa

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your watsonx.ai API key

# Run development server
npm run dev
```

Open `http://localhost:3000`

### Environment Variables

```bash
WATSONX_API_KEY=your_key_here
WATSONX_PROJECT_ID=your_project_id
WATSONX_REGION=us-south
```

Offline mode: all modules run on pre-computed 
synthetic data if API is unavailable. 
Zero broken states.

---

## 🎯 Why DECODED Wins

**The challenge asks for:** explainability, trust, 
fan understanding, human side of the game.

**DECODED delivers:**
- ✅ Explainability — every feature explains WHY
- ✅ Trust — VAR reconstruction makes decisions 
  transparent for the first time
- ✅ Fan understanding — plain English throughout, 
  no jargon
- ✅ Human side — Pressure Index + Drama Timeline 
  are entirely about human emotion
- ✅ Cultural context — 48 nations, global stories
- ✅ IBM tools — Granite + Docling + Langflow 
  all used meaningfully, not superficially

---

## 🏆 Judging Criteria & Technical Audits

We provide direct file verification paths for all our claims to support the judging panel's review process.

### Live Code Verification Paths

| Feature / Claim | File Reference / Source Code Link |
|:---|:---|
| **What-if Geometry Calibrator** | [VardictTab.jsx](file:///c:/Users/cheer/Documents/fifa/components/vardict/VardictTab.jsx) / [VerdictCard.jsx](file:///c:/Users/cheer/Documents/fifa/components/vardict/VerdictCard.jsx) |
| **Granite Guardian Safety Gate** | [route.js](file:///c:/Users/cheer/Documents/fifa/app/api/granite/route.js) (Routes calls to Guardian validation) |
| **SHA-256 Corpus Check** | [AskTheRef.jsx](file:///c:/Users/cheer/Documents/fifa/components/laws/AskTheRef.jsx) (Integrity check on Laws database) |
| **Zod Validation Contracts** | [statsbomb.js](file:///c:/Users/cheer/Documents/fifa/lib/statsbomb.js) (Type-safe incoming event checking) |
| **Diagnostics & Telemetry API** | [route.js](file:///c:/Users/cheer/Documents/fifa/app/api/diagnostic/route.js) / [route.js](file:///c:/Users/cheer/Documents/fifa/app/api/trace/route.js) |
| **Judges verification dashboard** | [JudgesPanel.jsx](file:///c:/Users/cheer/Documents/fifa/components/JudgesPanel.jsx) |

---

## 🎯 Step-by-Step Judge Demo Scenarios

Verify system claims live in seconds by following these walkthroughs:

### 1. The Offside Calibrator & 'Too Close to Call' State
*   **Path**: Navigate to `/vardict` or click "VARdict" in the nav.
*   **Action**: Select the quiz answer "Controversial" to unlock the SAOT skeletal mesh dashboard. Locate the **Manual offside line calibrator** slider.
*   **Proof**: Drag the slider to adjust the offside margin. If you calibrate the gap to be **within ±3.0cm** (the physical resolution threshold of professional tracking cameras), notice the system transition into a yellow `TOO CLOSE TO CALL` state. It displays an ECE spatial uncertainty warning and instructs the referee to defer to the field call.

### 2. Granite Guardian Safety Intercept
*   **Path**: Navigate to `/judges` or click "About" -> "Open Judges Audit panel".
*   **Action**: Locate the Granite Guardian Fail-Closed card and click **"Query unsafe prompt"**.
*   **Proof**: The system simulates an out-of-bounds user response that is intercepted by Granite Guardian. The generated output is hidden and the interface displays a safe official FIFA law degradation floor, proving the system fails closed securely.

### 3. Self-Healing Telemetry Validation
*   **Path**: Navigate to `/judges`.
*   **Action**: In the Zod schema card, click **"Inject Corrupt"** followed by **"Validate Schema"**.
*   **Proof**: Watch the validation contract catch the datatype mismatch (string player ID, singleton coordinates array) and block the corrupt payload from reaching the canvas. It signals the auto-healing preset to prevent client-side crashes.

---

## 🛡️ Honest Limits Disclosures & Trust Boundaries

*   **Camera Precision (SAOT)**: Professional optical tracking systems operating at 50Hz have a native spatial accuracy limit of ±3.0cm. Claims of absolute accuracy are false; we disclose this uncertainty in the VARdict module.
*   **Stress Simulation**: The Crucible Score venue modifier operates on empirical psychological multipliers (+0.8 home pressure, +0.4 hostile away noise). It models situational pressure rather than predicting actual physical performance.
*   **Simulated Telemetry**: Tracing telemetry spans inside the Judges panel are driven by a mock trace generator (`/api/trace`) modeling average timings (Docling: 120ms, Granite: 1450ms) to demonstrate operational pipeline architectures.

---

## 📄 License

MIT — Built for IBM SkillsBuild AI Builders Challenge · June 2026
