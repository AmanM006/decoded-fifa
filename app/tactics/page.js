import TacticsTab from "../../components/tactics/TacticsTab";

export const metadata = {
  title: "TACTICS AI — DECODED World Cup 2026",
  description: "Exposing set piece setups, player positions, ball paths and expected goals metrics.",
};

export default function TacticsPage() {
  return (
    <div className="pt-[52px] page-animate">
      <TacticsTab />
    </div>
  );
}
