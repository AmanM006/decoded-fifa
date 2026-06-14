"use client";

import React, { useState, useEffect, useRef } from "react";
import DataLabel from "./DataLabel";
import { Brain, Cpu, Hexagon, CheckCircle, Users } from "lucide-react";

function StreamingText({ text, speed = 8 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  const cleanText = (str) => {
    return str.replace(/\[HIGHLIGHT: \w+\]/g, "")
              .replace(/\[FOCUS: [A-Za-z0-9_]+\]/g, "")
              .replace(/\[SHOW_LINES\]/g, "");
  };

  return (
    <span>
      {cleanText(displayed)}
      {!done && (
        <span className="inline-block w-[2px] h-[13px] bg-[#2b66ff] ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

export default function GranitePanel({
  title = "IBM GRANITE ANALYSIS",
  icon: Icon = Brain,
  iconColor = "#2b66ff",
  text = "",
  isLoading = false,
  status = "",
  className = "",
  badgeText = "IBM Granite",
  confidence = null,
  guardianVerified = false,
  guardianSource = "Granite Guardian 3.0",
}) {
  const [audience, setAudience] = useState("enthusiast");

  useEffect(() => {
    const saved = localStorage.getItem("decoded_audience") || "enthusiast";
    setAudience(saved);

    const updateAudience = () => {
      setAudience(localStorage.getItem("decoded_audience") || "enthusiast");
    };
    window.addEventListener("decoded_audience_change", updateAudience);
    return () => window.removeEventListener("decoded_audience_change", updateAudience);
  }, []);

  const handleAudienceChange = (val) => {
    setAudience(val);
    localStorage.setItem("decoded_audience", val);
    window.dispatchEvent(new Event("decoded_audience_change"));
  };

  return (
    <div className={`bg-[#0a0a12] border border-[#1a1a2e] rounded-xl flex flex-col select-none overflow-hidden ${className}`}>
      
      {/* IBM Granite Header Bar */}
      <div className="bg-[#06091a] border-b border-[#1a1a2e] px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <div className="bg-[#1565c0] rounded px-1.5 py-0.5 flex items-center space-x-1">
            <Hexagon size={9} color="white" fill="white" />
            <span className="text-[8.5px] text-white font-inter font-black uppercase tracking-wider">IBM</span>
          </div>
          <Icon size={13} color={iconColor} className="shrink-0" />
          <DataLabel className="truncate text-[10px]">{title}</DataLabel>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* In-app Audience selector */}
          <div className="flex items-center space-x-1 bg-[#0f0f18]/80 border border-[#222232] px-2 py-0.5 rounded">
            <Users size={9} className="text-[#2b66ff] shrink-0" />
            <select
              value={audience}
              onChange={(e) => handleAudienceChange(e.target.value)}
              className="bg-transparent text-white font-inter text-[8px] md:text-[8.5px] font-bold uppercase tracking-wide focus:outline-none cursor-pointer py-0.5"
            >
              <option value="casual" className="bg-[#0f0f18] text-white">Casual</option>
              <option value="enthusiast" className="bg-[#0f0f18] text-white">Enthusiast</option>
              <option value="analyst" className="bg-[#0f0f18] text-white">Analyst</option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex items-center space-x-1 bg-[#1565c0]/20 px-2 py-0.5 rounded border border-[#1565c0]/40">
              <Cpu size={9} color="#5b9cf6" className="animate-spin" />
              <span className="text-[8px] text-[#5b9cf6] font-inter font-bold uppercase tracking-wider">Generating</span>
            </div>
          ) : text ? (
            <div className="flex items-center space-x-1 bg-[#00c2a8]/10 px-2 py-0.5 rounded border border-[#00c2a8]/30">
              <CheckCircle size={9} color="#00c2a8" />
              <span className="text-[8px] text-[#00c2a8] font-inter font-bold uppercase tracking-wider">Complete</span>
            </div>
          ) : (
            <span className="text-[8px] text-[#333] font-inter font-bold uppercase tracking-wider">Standby</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-t-transparent border-[#1565c0] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Hexagon size={14} color="#1565c0" fill="#1565c0" opacity={0.4} />
              </div>
            </div>
            <div className="text-center space-y-1">
              <span className="text-[11px] text-[#5b9cf6] font-inter font-semibold block animate-pulse">
                {status || "Invoking IBM Granite..."}
              </span>
              <span className="text-[9px] text-[#333] font-inter block">granite-3-8b-instruct · watsonx.ai</span>
            </div>
          </div>
        ) : (
          <div className="text-[12.5px] leading-relaxed text-[#c8c8d8] font-inter flex-1">
            {text ? (
              <StreamingText text={text} speed={8} />
            ) : (
              <span className="text-[#44445c] italic font-inter text-xs">
                Click the button below to run IBM Granite analysis.
              </span>
            )}
          </div>
        )}

        {/* Footer metadata */}
        <div className="mt-4 pt-3 border-t border-[#111122] flex items-center justify-between shrink-0 flex-wrap gap-2">
          <div className="flex items-center space-x-1.5">
            <Hexagon size={9} color="#1565c0" fill="#1565c0" opacity={0.6} />
            <span className="text-[9px] text-[#333] font-inter font-bold">granite-3-8b-instruct</span>
          </div>

          {guardianVerified && text && !isLoading && (
            <div className="flex items-center space-x-1 bg-[#00c2a8]/10 px-2.5 py-0.5 rounded border border-[#00c2a8]/30 text-[#00c2a8] text-[8.5px] font-bold uppercase tracking-wider font-inter">
              <span>🛡️ Verified by {guardianSource}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <span className="text-[9px] text-[#333] font-inter">{badgeText}</span>
            <span className="text-[9px] text-[#333] font-inter">·</span>
            <span className="text-[9px] text-[#333] font-inter">watsonx.ai</span>
          </div>
        </div>
      </div>
    </div>
  );
}
