# DECODED: FIFA World Cup AI Platform

**DECODED** is a professional-grade AI platform designed to demystify the complexities of football for fans. Powered by modern web technologies and advanced AI, it breaks down tactics, pressure, VAR decisions, FIFA Laws, and the emotional drama of the World Cup into beautiful, interactive, and easy-to-understand visualisations.

![DECODED Platform](https://i.imgur.com/example-hero-banner.png) *(Note: Add actual screenshots here)*

## 🌟 Features

The platform is divided into 5 core modules:

### 1. 🎯 Tactics AI
- Explains complex set-piece routines (corners, free kicks) using an interactive 2D canvas pitch.
- Shows player runs, target zones, and xG (Expected Goals) probabilities.
- Breaks down iconic World Cup moments (e.g., France vs Croatia 2018, Brazil vs Germany 2014) with AI-generated tactical narratives.

### 2. 🧠 Stress DNA (Pressure)
- Quantifies the extreme psychological pressure of World Cup moments (e.g., Penalty shootouts, late-game equalisers).
- Uses a **Crucible Score (0-10)** derived from factors like VAR delay, crowd size, match importance, and physical fatigue.
- Features dynamic "Stress Hexagon" charts mapping player Composure, Clutch, Fatigue, Crowd Sensitivity, and Experience.

### 3. ⚖️ VARdict
- An interactive VAR (Video Assistant Referee) reconstruction tool.
- Features a **Limb-Tracking HUD** that renders a full 29-point Semi-Automated Offside Technology (SAOT) skeletal mesh.
- Allows fans to adjust calibrated lines and understand exactly how offside margins (e.g., 2.3cm) are calculated using Computer Vision.

### 4. 📖 Ask the Ref (Docling RAG)
- A semantic search engine over the official FIFA Laws of the Game.
- Fans can ask plain-English questions (e.g., "When is a player offside?") and get exact matches from the rulebook.
- **IBM Granite AI** translates dense legal jargon into plain, easy-to-understand football terms.

### 5. ❤️ Drama Timeline
- Maps the emotional and cultural sentiment of the most iconic World Cup matches.
- Interactive canvas charts track the per-minute flow of *Hope, Tension, Jubilation, Heartbreak, and Anxiety*.
- AI-generated cultural narratives explain the historical weight of key moments (e.g., Zidane's 2006 Final).

## 🚀 Tech Stack

- **Framework:** Next.js (App Router) & React
- **Styling:** Tailwind CSS + Custom CSS (Vibrant, dark mode aesthetics, glassmorphism)
- **Visualisations:** HTML5 `<canvas>` API for rendering 2D pitches, skeletal meshes, and sentiment charts
- **AI Integration:** IBM Granite (Simulated/Integrated) for semantic analysis and narrative generation, Docling RAG for rulebook search
- **Icons:** Lucide React

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AmanM006/decoded-fifa.git
   cd decoded-fifa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Design Philosophy

DECODED is built with a premium, state-of-the-art design philosophy:
- **Rich Aesthetics:** Deep blacks (`#07070a`), neon accents (Cyan, Gold, Crimson), and subtle gradients.
- **Dynamic Interactions:** Smooth hover states, micro-animations, and animated statistics that bring the data to life.
- **Responsive Layouts:** Carefully crafted to work beautifully across desktop and tablet interfaces.

## 📄 License

This project is open-source and available under the MIT License.
