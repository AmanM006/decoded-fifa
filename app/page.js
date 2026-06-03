import Hero from "../components/Hero";

export const metadata = {
  title: "DECODED — World Cup 2026 AI Explainability Platform",
  description: "Tactics, psychological pressure profiles, and VAR decisions decoded by AI using IBM Granite, Docling, and StatsBomb open data.",
};

export default function Home() {
  return (
    <div className="fade-in-up">
      <Hero />
    </div>
  );
}
