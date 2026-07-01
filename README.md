# ⚡ DECODED — World Cup 2026 AI Explainability Platform

> *"VAR is a system of cameras. Docling is a system of rules. DECODED makes the difference visible."*

🚀 **Live Deployment URL**: [https://fifa-pink.vercel.app](https://fifa-pink.vercel.app)  
🎥 **Platform Demo Video**: [https://github.com/AmanM006/decoded-fifa](https://github.com/AmanM006/decoded-fifa) *(Note: replace with video URL before final submission)*

![IBM Granite](https://img.shields.io/badge/IBM-Granite-052FAD)
![watsonx.ai](https://img.shields.io/badge/watsonx-AI-052FAD)
![Docling](https://img.shields.io/badge/Docling-RAG-00c853)
![StatsBomb](https://img.shields.io/badge/StatsBomb-Open%20Data-e8002d)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

---

## 🔴 The Problem

The FIFA World Cup 2026 will be watched by **6 billion people** — yet most fans will remain blind to the spatial, mathematical, and regulatory logic governing the pitch.

*   **85%** of football fans admit they're confused by VAR verdicts.
*   Offside lines are drawn on television screens with claims of absolute precision, hiding the native **±3.0cm optical uncertainty limits** of camera feeds.
*   Elite clubs utilize million-dollar data science platforms (tracking expected threat, space occupancy, and transition shapes) that are completely hidden from fans and media.
*   Broadcasters show *what* happened, but can never explain *why*.

DECODED closes that gap.

---

## 🎯 Why This Matters: The Platform Mission

DECODED addresses the core challenge of **explainability, trust, and accessibility at a global scale**. By converting raw spatial telemetry and dense laws into interactive 2D pitch meshes, manual offside calibration tools, and multi-dialect chat responses, we bridge the gap between black-box AI algorithms and the everyday fan. We turn complex data points into emotional understanding, ensuring tournament transparency is accessible to every community worldwide.

---

## 💡 What DECODED Does

DECODED parses raw StatsBomb event sequences, StatsBomb 360 player coordinates, and official FIFA Law PDFs.

It then:
*   Visualizes full-match spatial events on an interactive HTML5 2D Pitch Canvas.
*   Allows fans to drag-and-drop player tokens in a **What-If Sandbox** to test alternative pass trajectories and defensive shapes.
*   Renders a **29-Point SAOT Skeletal HUD** to let users manually calibrate VAR offside lines and discover physical uncertainty boundaries.
*   Decodes complex rules via a multilingual **Multi-Agent Swarm** grounded in official laws parsed by **Docling**.
*   Explains driver-level parameters (Vision, Risk, Execution, Pressure) using **IBM Granite AI**, grounded in spatial data.

---

## 🧬 The 5 Decision DNA Dimensions

Every StatsBomb action is evaluated across 5 spatial and mathematical parameters to score its quality:

| Metric | What it measures |
| :--- | :--- |
| **Vision** | Line-of-sight passing lane widths and diagonal channel availability |
| **Risk** | Expected Threat (xT) reward gain vs probability of interception |
| **Execution** | Pass/Shot vector accuracy relative to target zones |
| **Pressure** | Density and proximity of opponent defensive markers surrounding the performer |
| **Leverage** | Cumulative momentum shift impact of the event on the match outcome |

---

## 🛠️ Technical Architecture

### Data & Agent Pipeline Flow
```
StatsBomb API → Telemetry Parser / RAG index → watsonx.ai client
                                      ↓
                           Expected Threat (xT) Model
                                      ↓
                           ┌─────────────────────────────────┐
                           │         Next.js Backend         │
                           │  REST Endpoints + SSE Streaming │
                           └──────────────┬──────────────────┘
                                          ↓
                           ┌──────────────────────────────────┐
                           │        React/Next.js UI          │
                           │  2D Pitch Canvas · SAOT Skeletal │
                           │  Crucible Pentagon · Chat Engine │
                           └──────────────────────────────────┘
                                          ↓
                           ┌──────────────────────────────────┐
                           │      IBM Granite (watsonx.ai)     │
                           │  RAG grounded in FIFA Laws       │
                           │  via Docling PDF Parser Ingestion│
                           └──────────────────────────────────┘
```

### Frontend-Backend Connection Details
DECODED operates on a decoupled client-serverless architecture natively integrated within Next.js:

1.  **Telemetry Fetching & Parsing**: On initial mount, the client triggers async fetches to Next.js API endpoints (`/api/statsbomb/matches`, `/api/statsbomb/events`, `/api/statsbomb/lineups`, `/api/statsbomb/freezeframe`). These endpoints pull raw open data from StatsBomb, caching results for fast retrieval.
2.  **State Sync & Coordinate Translation**: The client receives raw StatsBomb coordinate tuples (x, y on a 120x80 meter scale) and translates them into responsive HTML5 canvas dimensions. When a user drags a player token in the What-If Sandbox, the updated coordinates trigger local React state updates, recalculating expected threat vectors instantly.
3.  **Agent Orchestration via SSE**: The Ask Decoded chat interface posts conversation threads to `/api/agents/chat`. The backend activates our multi-agent orchestrator:
    *   It queries a local semantic vector database to fetch relevant clauses (parsed from the FIFA Laws PDF by Docling).
    *   It routes the user prompt to officiating, tactical, or narrative specialist agents.
    *   It streams Granite's token-by-token output back to the client interface using **Server-Sent Events (SSE)**, enabling real-time response rendering.

---

## 🤖 IBM Tools Used

### IBM Granite (watsonx.ai)
We deploy `granite-3-8b-instruct` to run all analysis cards and multi-agent chats. When a play is selected, Granite receives computed spatial variables (e.g., "Pressure: 74%, Risk: 81%, open lane coordinates") and writes natural-language tactical breakdowns explaining why the player made that decision.

### Docling
Parses official FIFA Laws of the Game PDFs. Unlike basic PDF text extractors, Docling preserves grid alignments and tables (such as card offence matrices), generating clean data tables that Granite references during RAG lookups to answer complex rules questions.

---

## 🏆 Judging Criteria Alignment

| Judging Criteria | DECODED Evidence |
|---|---|
| Technical Execution | Multi-agent swarm, real StatsBomb 360, Zod contracts, Truth Anchor, SHA-256 RAG, SSE streaming |
| Innovation | SAOT skeletal mesh, counterfactual ghost arrows, Voronoi spatial overlay, VARdict too-close-to-call deferral |
| Challenge Fit | 5 modules covering all 4 challenge themes: explainability, trust, fan understanding, human pressure |
| Feasibility | Zero-broken offline fallback, pre-computed cache, verifiable at /judges live |

---

## 🏁 Features & Modules

### 🎯 Module 1 — Tactics AI (`/tactics`)
*   **StatsBomb Spatial Replay Canvas**: Reconstructs real corner kicks and match play sequences from famous World Cup matches using StatsBomb open data.
*   **Live 2D Pitch Canvas**: Visualizes player runs, target zones, ball trajectories, GK coverage, and expected goals (xG) overlay coordinates.
*   **What-If Spacing Sandbox**: Drag player tokens dynamically on the pitch canvas to manually test passing options and defensive cover, instantly recalculating threat vectors.
*   **IBM Granite Breakdown**: Automatically generates natural language narratives detailing why passing channels were available or why a press failed.

### 🧠 Module 2 — Pressure Index (`/pressure`)
*   **The Crucible Score**: Renders a 5-dimensional psychological fingerprint (Composure, Clutch Capability, Stamina, Crowd Pressure, Experience) measuring a player's mental load at high-stakes World Cup moments.
*   **Stress Sandbox**: Sliders let users alter crowd sizes, VAR delays, and player fatigue to morph the SVG hexagon diagram in real time.
*   **Acoustic Wave Visualizer**: Play Moroccan whistles, Argentine drums, or tense silence feeds to see the composure index variables react live.
*   **Pressure Hall of Fame**: Composes comparative stress rankings (e.g. Mbappé: 9.2, Coman: 9.4, Baggio: 9.8).

### ⚖️ Module 3 — VARdict (`/vardict`)
*   **SAOT Limb HUD**: Renders the complete 29-point anatomical skeletal joint mesh overlay used by Semi-Automated Offside Technology to centimeter precision.
*   **Manual Offside Calibrator**: Sliders let users draw offside lines. Calibrating margins within ±3.0cm triggers a `TOO CLOSE TO CALL` warning, highlighting camera precision limits.
*   **Decision Lab**: Cites official FIFA rulebook articles using IBM Granite to deliver legal verdicts, alongside global fan polls.

### 📖 Module 4 — Ask the Ref (`/laws` or `/ask-decoded`)
*   **Docling Law Ingestion**: Plain-English queries scan the complete official FIFA Laws of the Game parsed via Docling to preserve tables and spatial clauses.
*   **RAG Rule Grounding**: IBM Granite translates dense rulebook jargon into friendly, structured responses and highlights exact matching articles.
*   **Suggested Prompts**: Evaluates classic situations (e.g., scoring directly from throw-ins, handball boundaries, level offsides).

### ❤️ Module 5 — Drama Timeline (`/drama`)
*   **Sentiment Map**: Minute-by-minute emotional sentiment mapping (Hope, Tension, Jubilation, Heartbreak, Anxiety) for iconic matches.
*   **Granite Cultural Narratives**: IBM Granite generates storytelling descriptions for dramatic peaks.

---

## 🚀 Running Locally

### Installation

```bash
# Clone the repository
git clone https://github.com/AmanM006/decoded-fifa.git
cd decoded-fifa

# Install dependencies
npm install

# Setup environment credentials
cp .env.example .env.local
```

### Environment Variables
Edit your `.env.local` file:
```bash
WATSONX_API_KEY=your_key_here
WATSONX_PROJECT_ID=your_project_id
WATSONX_REGION=us-south
```

```bash
# Run local server
npm run dev
# App runs at http://localhost:3000
```
*Note: If API credentials are not found, the platform enters an offline fallback mode using pre-cached JSON telemetry streams, ensuring zero broken states.*

---

## 🛡️ Honest Limitations & Trust Boundaries

*   **Camera Precision Limits**: Professional optical tracking cameras have a physical resolution boundary of **±3.0cm**. We explicitly disclose this limitation in the VARdict slider tool; we do not claim sub-millimeter offside certainty.
*   **Model Selection**: We utilize `granite-3-8b-instruct` rather than larger models due to regional watsonx.ai capacity limits.
*   **Trace Simulation**: The OpenTelemetry spans visible in the `/judges` diagnostics panel are simulated metrics representing average processing intervals (e.g. Docling: 120ms, Granite: 1450ms) to demonstrate operational pipeline layouts.

---

## 📄 License

MIT — Developed for the IBM SkillsBuild AI Builders Challenge · June/July 2026
