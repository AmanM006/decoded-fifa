import PressureTab from "../../components/pressure/PressureTab";

export const metadata = {
  title: "PRESSURE INDEX — DECODED World Cup 2026",
  description: "Sports psychology metric analyzers mapping player composure, crowd sensitivity, and career clutch ratings.",
};

export default function PressurePage() {
  return (
    <div className="pt-[52px] page-animate">
      <PressureTab />
    </div>
  );
}
