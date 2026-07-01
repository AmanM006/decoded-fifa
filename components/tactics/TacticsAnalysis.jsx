"use client";

import React, { useState, useEffect } from "react";
import DataLabel from "../shared/DataLabel";
import GranitePanel from "../shared/GranitePanel";
import { Brain, Sparkles, TrendingUp } from "lucide-react";
import { streamGraniteAI, queryGraniteAI } from "../../lib/granite";

export default function TacticsAnalysis({ corner, matchName, onLoadCorner, aiText, setAiText }) {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState("");
  const [audience, setAudience] = useState("enthusiast");
  const [guardianVerified, setGuardianVerified] = useState(false);
  const [guardianSource, setGuardianSource] = useState("Granite Guardian 3.0");

  useEffect(() => {
    const updateAudience = () => {
      setAudience(localStorage.getItem("decoded_audience") || "enthusiast");
    };
    updateAudience();
    window.addEventListener("decoded_audience_change", updateAudience);
    return () => window.removeEventListener("decoded_audience_change", updateAudience);
  }, []);

  const handleTacticalAnalysis = async () => {
    if (!corner) return;
    setIsAiLoading(true);
    setAiText("");
    setAiStatus("Analyzing spatial matrix...");
    await new Promise((resolve) => setTimeout(resolve, 400));
    setAiStatus("Streaming IBM Granite analysis...");

    const promptData = {
      match: matchName,
      minute: corner.minute,
      team: corner.team,
      outcome: corner.outcome,
      xG: corner.xG,
      shotProb: corner.shotProb,
      details: corner.tacticalBreakdown
    };

    await streamGraniteAI(
      "TACTICS",
      promptData,
      (token) => { setAiText(prev => prev + token); setIsAiLoading(false); setAiStatus(""); },
      ({ guardianVerified: gv, guardianSource: gs }) => { setGuardianVerified(gv); setGuardianSource(gs); setIsAiLoading(false); },
      async () => {
        const res = await queryGraniteAI("TACTICS", promptData, corner.tacticalBreakdown, audience);
        setAiText(res.text); setGuardianVerified(res.guardianVerified); setGuardianSource(res.guardianSource); setIsAiLoading(false);
      },
      audience
    );
  };

  if (!corner) return null;

  return (
    <div className="border-t border-[#222232] bg-[#07070a] p-6 font-inter select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        
        {/* Left Column: Granite Explainers */}
        <div className="space-y-4">
          <GranitePanel
            title="TACTICAL BREAKDOWN"
            icon={Brain}
            iconColor="#00c2a8"
            text={aiText}
            isLoading={isAiLoading}
            status={aiStatus}
            className="min-h-[220px] border-[#222232]"
            guardianVerified={guardianVerified}
            guardianSource={guardianSource}
            badgeText="Granite Spatial AI"
          />

          <button
            onClick={handleTacticalAnalysis}
            disabled={isAiLoading}
            className="w-full bg-[#2b66ff] hover:bg-[#1a4eff] disabled:opacity-50 text-white font-teko text-[16px] tracking-wider uppercase h-11 rounded-none flex items-center justify-center space-x-2 border border-black shadow active:scale-[0.98] transition-all cursor-pointer font-bold"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>Generate Deep Spatial Analysis</span>
          </button>
        </div>

        {/* Right Column: FUT Cards Statistics & Similar Corners */}
        <div className="flex flex-col justify-between space-y-6">
          
          {/* Stats block - Redesigned to look like FUT cards (Reference 4) */}
          <div>
            <div className="flex items-center space-x-1.5 mb-3">
              <TrendingUp size={12} className="text-[#8e8e9f]" />
              <DataLabel>STATISTICAL SCALING PROFILE</DataLabel>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              
              {/* Stat FUT Card 1 */}
              <div className="bg-[#0f0f15] border border-[#222232] hover:border-[#2b66ff]/40 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
                <div className="absolute right-2 top-2 text-[9px] text-[#2b66ff] font-bold font-inter bg-[#2b66ff]/10 px-1.5 py-0.5 rounded uppercase">
                  PROB
                </div>
                <div className="mt-2.5">
                  <span className="font-teko text-[36px] sm:text-[42px] leading-none block font-black text-white">
                    {corner.shotProb}%
                  </span>
                  <span className="text-[10px] text-[#8e8e9f] uppercase font-inter tracking-wider font-semibold mt-1 block">
                    Shot Conversion
                  </span>
                </div>
              </div>

              {/* Stat FUT Card 2 */}
              <div className="bg-[#0f0f15] border border-[#222232] hover:border-[#00c2a8]/40 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
                <div className="absolute right-2 top-2 text-[9px] text-[#00c2a8] font-bold font-inter bg-[#00c2a8]/10 px-1.5 py-0.5 rounded uppercase">
                  xG
                </div>
                <div className="mt-2.5">
                  <span className="font-teko text-[36px] sm:text-[42px] leading-none block font-black text-[#ffd700]">
                    {corner.xG.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-[#8e8e9f] uppercase font-inter tracking-wider font-semibold mt-1 block">
                    Expected Goals
                  </span>
                </div>
              </div>

              {/* Stat FUT Card 3 */}
              <div className="bg-[#0f0f15] border border-[#222232] hover:border-[#ff3b30]/40 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
                <div className="absolute right-2 top-2 text-[9px] text-[#ff3b30] font-bold font-inter bg-[#ff3b30]/10 px-1.5 py-0.5 rounded uppercase">
                  RES
                </div>
                <div className="mt-2.5">
                  <span className={`font-teko text-[36px] sm:text-[42px] leading-none block font-black ${
                    corner.outcome === "GOAL" ? "text-green" : corner.outcome === "Saved" ? "text-[#ffd700]" : "text-red"
                  }`}>
                    {corner.outcome.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-[#8e8e9f] uppercase font-inter tracking-wider font-semibold mt-1 block">
                    Play Result
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Similar Corners */}
          <div className="border-t border-[#222232] pt-4">
            <DataLabel className="mb-3">SIMILAR HISTORICAL SET PIECES</DataLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {corner.similarCorners.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onLoadCorner(item.linkId || corner.id)}
                  className="bg-[#0f0f15] hover:bg-[#181822] border border-[#222232] hover:border-[#2b66ff]/50 transition-all rounded-xl p-3.5 text-left flex flex-col justify-between cursor-pointer select-none"
                >
                  <span className="font-teko text-[18px] text-white tracking-wider uppercase leading-none truncate w-full">
                    {item.match}
                  </span>
                  <span className="text-[10px] text-[#8e8e9f] font-inter mt-2.5 uppercase font-bold tracking-wider">
                    {item.outcome}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
