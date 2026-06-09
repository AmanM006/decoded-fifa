"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { DRAMA_MATCHES } from "../../data/drama";
import { queryGraniteAI } from "../../lib/granite";
import GranitePanel from "../shared/GranitePanel";
import { Heart, Zap, Flame, Cpu, ChevronDown } from "lucide-react";

const EMOTIONS = [
  { key: "hope",       label: "Hope",       color: "#2b66ff", dash: []      },
  { key: "tension",    label: "Tension",    color: "#ffd700", dash: [4, 3]  },
  { key: "jubilation", label: "Jubilation", color: "#00c2a8", dash: []      },
  { key: "heartbreak", label: "Heartbreak", color: "#ff3b30", dash: [2, 2]  },
  { key: "anxiety",    label: "Anxiety",    color: "#ff6f00", dash: [6, 3]  },
];

function drawChart(canvas, match, hoveredMinute, setHoveredMinute) {
  if (!canvas || !match) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const PAD = { top: 30, right: 24, bottom: 50, left: 44 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#050508";
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let y = 0; y <= 100; y += 20) {
    const gy = PAD.top + chartH - (y / 100) * chartH;
    ctx.beginPath(); ctx.moveTo(PAD.left, gy); ctx.lineTo(PAD.left + chartW, gy); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "9px Inter";
    ctx.textAlign = "right";
    ctx.fillText(y, PAD.left - 6, gy + 3);
  }

  const maxMinute = Math.max(...match.emotionCurve.map(p => p.minute));
  const minuteToX = (m) => PAD.left + (m / maxMinute) * chartW;
  const valueToY = (v) => PAD.top + chartH - (v / 100) * chartH;

  // Key moment annotations
  match.keyMoments?.forEach(km => {
    const x = minuteToX(km.minute);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, PAD.top + chartH); ctx.stroke();
    ctx.setLineDash([]);
  });

  // Draw emotion curves
  EMOTIONS.forEach(({ key, color, dash }) => {
    const pts = match.emotionCurve;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.setLineDash(dash);
    ctx.beginPath();
    pts.forEach((pt, i) => {
      const x = minuteToX(pt.minute);
      const y = valueToY(pt[key] ?? 0);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Area fill
    ctx.save();
    ctx.beginPath();
    pts.forEach((pt, i) => {
      const x = minuteToX(pt.minute);
      const y = valueToY(pt[key] ?? 0);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(minuteToX(pts[pts.length - 1].minute), PAD.top + chartH);
    ctx.lineTo(minuteToX(pts[0].minute), PAD.top + chartH);
    ctx.closePath();
    ctx.fillStyle = color + "18";
    ctx.fill();
    ctx.restore();
  });

  // Hovered minute crosshair
  if (hoveredMinute !== null) {
    const hx = minuteToX(hoveredMinute);
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(hx, PAD.top); ctx.lineTo(hx, PAD.top + chartH); ctx.stroke();
    ctx.setLineDash([]);

    // Dots at each emotion value at this minute
    const pt = match.emotionCurve.reduce((prev, curr) =>
      Math.abs(curr.minute - hoveredMinute) < Math.abs(prev.minute - hoveredMinute) ? curr : prev
    );
    EMOTIONS.forEach(({ key, color }) => {
      const y = valueToY(pt[key] ?? 0);
      ctx.beginPath();
      ctx.arc(hx, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  // X axis labels
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "9px Inter";
  ctx.textAlign = "center";
  [0, 15, 30, 45, 60, 75, 90, ...(maxMinute > 90 ? [105, 120] : [])].forEach(m => {
    if (m <= maxMinute) {
      const x = minuteToX(m);
      ctx.fillText(m + "'", x, PAD.top + chartH + 14);
    }
  });

  // X axis border
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD.left, PAD.top + chartH);
  ctx.lineTo(PAD.left + chartW, PAD.top + chartH);
  ctx.stroke();
}

const TEAM_CODES = {
  "🇫🇷": "FRA",
  "🇧🇷": "BRA",
  "🇮🇹": "ITA",
  "🇩🇪": "GER",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿": "ENG",
  "🇭🇷": "CRO",
  "🇦🇷": "ARG"
};

export default function DramaTimeline() {
  const canvasRef = useRef(null);
  const [selectedMatch, setSelectedMatch] = useState(DRAMA_MATCHES[0]);
  const [hoveredMinute, setHoveredMinute] = useState(null);
  const [aiText, setAiText] = useState(selectedMatch.graniteNarrative);
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState("");

  useEffect(() => {
    setAiText(selectedMatch.graniteNarrative);
    setHoveredMinute(null);
  }, [selectedMatch]);

  useEffect(() => {
    drawChart(canvasRef.current, selectedMatch, hoveredMinute, setHoveredMinute);
  }, [selectedMatch, hoveredMinute]);

  const handleCanvasMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedMatch) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const rawX = (e.clientX - rect.left) * scaleX;
    const PAD_LEFT = 44;
    const PAD_RIGHT = 24;
    const chartW = canvas.width - PAD_LEFT - PAD_RIGHT;
    const maxMinute = Math.max(...selectedMatch.emotionCurve.map(p => p.minute));
    const minute = Math.round(((rawX - PAD_LEFT) / chartW) * maxMinute);
    if (minute >= 0 && minute <= maxMinute) setHoveredMinute(minute);
  }, [selectedMatch]);

  const handleCanvasMouseLeave = () => setHoveredMinute(null);

  const hoveredData = hoveredMinute !== null ? selectedMatch.emotionCurve.reduce((prev, curr) =>
    Math.abs(curr.minute - hoveredMinute) < Math.abs(prev.minute - hoveredMinute) ? curr : prev
  ) : null;

  const handleGraniteDeepDive = async () => {
    setIsLoading(true);
    setAiStatus("Analysing historical match commentary...");
    await new Promise(r => setTimeout(r, 600));
    setAiStatus("Extracting emotional arc data...");
    await new Promise(r => setTimeout(r, 600));
    setAiStatus("Generating IBM Granite cultural narrative...");

    const prompt = {
      match: selectedMatch.title,
      subtitle: selectedMatch.subtitle,
      score: selectedMatch.score,
      culturalWeight: selectedMatch.culturalWeight,
      dramaticRating: selectedMatch.dramaticRating,
      keyMoments: selectedMatch.keyMoments.map(k => k.annotation).join("; ")
    };

    const text = await queryGraniteAI("DRAMA", prompt, selectedMatch.graniteNarrative);
    setAiText(text);
    setIsLoading(false);
  };

  const culturalColor = selectedMatch.color;

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#07070a] select-none font-inter pt-[52px]">

      {/* SIDEBAR */}
      <aside className="w-full lg:w-[300px] border-r border-[#1a1a2e] bg-[#0a0a10] p-5 shrink-0 flex flex-col space-y-5 overflow-y-auto">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Heart size={13} color="#ff3b30" />
            <span className="font-inter text-[9px] text-[#8e8e9f] font-bold uppercase tracking-wider">Match Selector</span>
          </div>
          <div className="space-y-1.5">
            {DRAMA_MATCHES.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  selectedMatch.id === m.id
                    ? "bg-[#111122] border-[#2b66ff]/50"
                    : "bg-transparent border-transparent hover:bg-[#0f0f18] hover:border-[#1a1a2e]"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono font-bold text-[#8e8e9f] shrink-0 w-8 text-right">{TEAM_CODES[m.flag1] || "???"}</span>
                  <span className="text-[9px] text-[#44445c] shrink-0">vs</span>
                  <span className="text-[11px] font-mono font-bold text-[#8e8e9f] shrink-0 w-8 text-left">{TEAM_CODES[m.flag2] || "???"}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-inter text-[11px] font-bold text-white truncate">{m.title}</div>
                    <div className="font-inter text-[9px] text-[#44445c] truncate">{m.subtitle.split("·")[1]?.trim()}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#1a1a2e]" />

        {/* Emotion legend */}
        <div>
          <span className="font-inter text-[9px] text-[#8e8e9f] font-bold uppercase tracking-wider block mb-2">
            Emotion Legend
          </span>
          <div className="space-y-2">
            {EMOTIONS.map(({ key, label, color }) => (
              <div key={key} className="flex items-center space-x-2">
                <div className="w-6 h-0.5 rounded-full" style={{ background: color }} />
                <span className="font-inter text-[11px]" style={{ color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#1a1a2e]" />

        {/* Drama metrics */}
        <div className="space-y-2">
          <div className="bg-[#0f0f18] border border-[#1a1a2e] rounded-xl p-3">
            <div className="font-inter text-[9px] text-[#8e8e9f] uppercase tracking-wider mb-1">Drama Rating</div>
            <div className="font-teko text-[36px] leading-none font-black" style={{ color: culturalColor }}>
              {selectedMatch.dramaticRating}
              <span className="text-[16px] text-[#8e8e9f]">/10</span>
            </div>
          </div>
          <div className="bg-[#0f0f18] border border-[#1a1a2e] rounded-xl p-3">
            <div className="font-inter text-[9px] text-[#8e8e9f] uppercase tracking-wider mb-1">Cultural Weight</div>
            <div className="font-teko text-[36px] leading-none font-black text-[#ffd700]">
              {selectedMatch.culturalWeight}<span className="text-[16px] text-[#8e8e9f]">%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col overflow-y-auto">

        {/* Match header */}
        <div className="border-b border-[#1a1a2e] bg-[#06091a] px-6 py-5 shrink-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[9px] font-inter font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border"
                      style={{ color: culturalColor, borderColor: culturalColor + "50", background: culturalColor + "15" }}>
                  {selectedMatch.era}
                </span>
              </div>
              <h2 className="font-teko text-[36px] sm:text-[48px] text-white tracking-tight leading-none uppercase font-black">
                {selectedMatch.flag1} {selectedMatch.title} {selectedMatch.flag2}
              </h2>
              <div className="font-inter text-[12px] text-[#8e8e9f] mt-1">{selectedMatch.subtitle}</div>
            </div>
            <div className="text-right">
              <div className="font-teko text-[48px] leading-none font-black text-[#ffd700]">{selectedMatch.score}</div>
              <div className="font-inter text-[10px] text-[#8e8e9f] uppercase tracking-wider">{selectedMatch.winner} won</div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6">

          {/* Chart */}
          <div className="bg-[#050508] border border-[#1a1a2e] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#1a1a2e] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame size={13} color="#ff3b30" />
                <span className="font-inter text-[10px] text-[#8e8e9f] font-bold uppercase tracking-wider">
                  Emotional Sentiment Arc · Per-Minute AI Classification
                </span>
              </div>
              {hoveredData && (
                <div className="flex items-center space-x-3">
                  <span className="font-inter text-[9px] text-[#8e8e9f]">Min {hoveredMinute}'</span>
                  {EMOTIONS.map(({ key, label, color }) => (
                    <div key={key} className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      <span className="font-inter text-[9px]" style={{ color }}>{hoveredData[key]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <canvas
              ref={canvasRef}
              width="900"
              height="320"
              className="w-full h-auto block cursor-crosshair"
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
            />
          </div>

          {/* Key Moments */}
          <div>
            <div className="font-inter text-[9px] text-[#8e8e9f] font-bold uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Zap size={10} color="#ffd700" />
              <span>Key Moments</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
              {selectedMatch.keyMoments.map((km, idx) => (
                <div key={idx}
                     className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-3 hover:border-[#2b66ff]/40 transition-colors">
                  <div className="font-teko text-[20px] leading-none font-black mb-1" style={{ color: culturalColor }}>
                    {km.minute}'
                  </div>
                  <div className="font-inter text-[10px] text-[#c0c0d8] leading-snug">{km.annotation}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IBM Granite Cultural Narrative */}
          <div>
            <GranitePanel
              title="CULTURAL SENTIMENT NARRATIVE"
              icon={Heart}
              iconColor="#ff3b30"
              text={aiText}
              isLoading={isLoading}
              status={aiStatus}
              className="min-h-[280px] border-[#1a1a2e]"
              badgeText="Granite Emotional AI"
            />
            <button
              onClick={handleGraniteDeepDive}
              disabled={isLoading}
              className="mt-3 w-full bg-[#1a0010] hover:bg-[#220015] disabled:opacity-50 text-[#ff3b30] border border-[#ff3b30]/30 hover:border-[#ff3b30]/60 font-teko text-[15px] tracking-wider uppercase h-10 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer font-bold"
            >
              <Heart size={13} className={isLoading ? "animate-pulse" : ""} />
              <span>Generate Deep Cultural Analysis with IBM Granite</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
