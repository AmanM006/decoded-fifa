"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function VerdictCard({ verdict = "CORRECT", confidence = 90, lawCited = "Law", isTooClose = false }) {
  const getVerdictStyles = (v, tooClose) => {
    if (tooClose) {
      return {
        bg: "bg-[#1a1300]",
        border: "border-[#ffd700]",
        text: "text-[#ffd700]",
        iconColor: "#ffd700",
        icon: AlertTriangle,
        label: "TOO CLOSE TO CALL"
      };
    }
    switch (v) {
      case "CORRECT":
        return {
          bg: "bg-[#001a0a]",
          border: "border-[#00c2a8]",
          text: "text-[#00c2a8]",
          iconColor: "#00c2a8",
          icon: CheckCircle2,
          label: "OFFICIALLY CORRECT"
        };
      case "CONTROVERSIAL":
        return {
          bg: "bg-[#1a0c00]",
          border: "border-[#ff6f00]",
          text: "text-[#ff6f00]",
          iconColor: "#ff6f00",
          icon: AlertTriangle,
          label: "LEGALLY DISPUTED"
        };
      case "WRONG":
        return {
          bg: "bg-[#1a0005]",
          border: "border-[#ff3b30]",
          text: "text-[#ff3b30]",
          iconColor: "#ff3b30",
          icon: XCircle,
          label: "INCORRECT CALL"
        };
      default:
        return {
          bg: "bg-[#0c0c12]",
          border: "border-[#222232]",
          text: "text-white",
          iconColor: "#ffffff",
          icon: CheckCircle2,
          label: "DECISION VERIFIED"
        };
    }
  };

  const config = getVerdictStyles(verdict, isTooClose);
  const IconComp = config.icon;

  return (
    <div className={`border rounded-none p-5 ${config.bg} ${config.border} shadow-2xl select-none font-inter transition-all duration-300`}>
      
      <div className="flex items-center space-x-4">
        {/* Large pulsing icon */}
        <div className="shrink-0 animate-[pulse_2s_infinite]">
          <IconComp size={48} color={config.iconColor} />
        </div>
        
        {/* Labels */}
        <div className="flex-1 min-w-0">
          <h2 className={`font-teko text-[32px] sm:text-[36px] font-black leading-none tracking-wider uppercase ${config.text} truncate`}>
            {config.label}
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-[11px] text-[#8e8e9f] font-bold uppercase tracking-wider">
              AI DECISION INDEX:
            </span>
            <span className={`text-[11.5px] font-extrabold ${config.text}`}>
              {confidence}% CONFIDENCE
            </span>
          </div>
        </div>
      </div>

      {/* Progress slider bar */}
      <div className="h-2 w-full bg-black/50 rounded-none mt-4 overflow-hidden border border-white/5 relative">
        <div
          className="h-full transition-all duration-[1s]"
          style={{
            width: `${confidence}%`,
            backgroundColor: config.iconColor
          }}
        />
      </div>

      {/* Law citations block (FUT aesthetic style) */}
      <div className="mt-4 border-t border-white/5 pt-3.5 select-text">
        <span className="text-[9px] text-[#8e8e9f] uppercase tracking-widest font-bold block">
          LAW CITATION EXCERPT
        </span>
        <p className="text-[12.5px] text-[#e2e2eb] font-semibold font-inter mt-1.5 leading-relaxed italic">
          "{lawCited}"
        </p>
      </div>

    </div>
  );
}
