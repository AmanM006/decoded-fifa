import VardictTab from "../../components/vardict/VardictTab";

export const metadata = {
  title: "VARDICT LAW ANALYZER — DECODED World Cup 2026",
  description: "Docling FIFA Law parser and WatsonX referee companion delivering legal explainers.",
};

export default function VardictPage() {
  return (
    <div className="pt-[52px] page-animate">
      <VardictTab />
    </div>
  );
}
