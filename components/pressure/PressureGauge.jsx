"use client";

import React, { useEffect, useState } from "react";

export default function PressureGauge({ score = 5.0, playerName = "Player", matchContext = "Match" }) {
  // Set score immediately for instant response on scrubbing sliders
  const animatedScore = score;
  const currentScoreStr = animatedScore.toFixed(1);

  // Color mapping matching UI redesign
  const getColor = (val) => {
    if (val <= 3.0) return "#00c2a8"; // pitch teal
    if (val <= 6.0) return "#ffd700"; // gold
    if (val <= 9.0) return "#ff6f00"; // orange
    return "#ff3b30"; // bright red
  };

  const currentColor = getColor(score);
  
  const radius = 90;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 10) * circumference;

  return (
    <div className="flex flex-col items-center select-none font-inter">
      <div className="relative w-[280px] h-[170px] flex items-center justify-center overflow-hidden">
        
        {/* Speedometer SVG */}
        <svg width="240" height="150" viewBox="0 0 240 150" className="absolute top-0">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00c2a8" />
              <stop offset="40%" stopColor="#ffd700" />
              <stop offset="80%" stopColor="#ff6f00" />
              <stop offset="100%" stopColor="#ff3b30" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <path
            d="M 30 120 A 90 90 0 0 1 210 120"
            stroke="#1c1c28"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />

          {/* Colored active arc */}
          <path
            d="M 30 120 A 90 90 0 0 1 210 120"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-[1.5s] ease-out"
          />



        </svg>

        {/* Text score container overlay inside arc */}
        <div className="absolute top-[65px] flex flex-col items-center">
          <div className="flex items-baseline justify-center">
            <span
              className={`font-teko text-[72px] font-black leading-none tracking-tighter ${
                score >= 9.0 ? "animate-pulse" : ""
              }`}
              style={{ color: currentColor }}
            >
              {currentScoreStr}
            </span>
            <span className="font-teko text-[28px] text-[#8e8e9f] ml-1 font-semibold leading-none">/ 10</span>
          </div>
          <span className="font-inter text-[9px] text-[#8e8e9f] uppercase tracking-widest font-bold mt-1">
            CRUCIBLE SCORE
          </span>
        </div>
      </div>

      {/* Player and match context labels */}
      <div className="text-center mt-3">
        <h3 className="font-teko text-[32px] text-white tracking-widest leading-none uppercase font-black">
          {playerName}
        </h3>
        <p className="font-inter text-[12.5px] text-[#8e8e9f] mt-1 max-w-[260px] truncate uppercase font-semibold">
          {matchContext}
        </p>
      </div>
    </div>
  );
}
