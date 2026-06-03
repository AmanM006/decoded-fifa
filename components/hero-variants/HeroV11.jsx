"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroV11() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen bg-[#ff3b30] text-black overflow-hidden flex flex-col justify-center items-center relative select-none">
      
      {/* Dense Kinetic Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 opacity-90 mix-blend-color-burn pointer-events-none transform -rotate-6 scale-110">
        
        {/* Row 1 */}
        <div className="whitespace-nowrap animate-[marquee_12s_linear_infinite]">
          <span className="font-teko text-[180px] leading-none uppercase font-black mr-8">TACTICS • PRESSURE • VAR • RULES • DECODED •</span>
          <span className="font-teko text-[180px] leading-none uppercase font-black">TACTICS • PRESSURE • VAR • RULES • DECODED •</span>
        </div>
        
        {/* Row 2 (Reverse) */}
        <div className="whitespace-nowrap animate-[marquee_18s_linear_infinite_reverse]">
          <span className="font-teko text-[180px] leading-none uppercase font-black mr-8 text-transparent" style={{ WebkitTextStroke: "4px black" }}>WORLD CUP 26 DECODED BY WATSONX •</span>
          <span className="font-teko text-[180px] leading-none uppercase font-black text-transparent" style={{ WebkitTextStroke: "4px black" }}>WORLD CUP 26 DECODED BY WATSONX •</span>
        </div>
        
        {/* Row 3 */}
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite]">
          <span className="font-teko text-[180px] leading-none uppercase font-black mr-8">STATSBOMB OPEN DATA TELEMETRY •</span>
          <span className="font-teko text-[180px] leading-none uppercase font-black">STATSBOMB OPEN DATA TELEMETRY •</span>
        </div>

        {/* Row 4 (Reverse) */}
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite_reverse]">
          <span className="font-teko text-[180px] leading-none uppercase font-black mr-8 text-transparent" style={{ WebkitTextStroke: "4px black" }}>CRUCIBLE STRESS DNA METRICS •</span>
          <span className="font-teko text-[180px] leading-none uppercase font-black text-transparent" style={{ WebkitTextStroke: "4px black" }}>CRUCIBLE STRESS DNA METRICS •</span>
        </div>
      </div>

      {/* Center Action Box with Glitch/Glow Polish */}
      <div 
        className={`relative z-10 w-full max-w-[500px] bg-black text-white p-12 text-center transition-all duration-300 ${isHovered ? 'shadow-[0_0_80px_#ccff00]' : 'shadow-2xl'} border-2 border-[#ccff00]/50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glitch offsets on hover */}
        <h1 className={`font-inter text-7xl font-black uppercase tracking-tighter mb-4 transition-transform duration-75 ${isHovered ? 'translate-x-1 -translate-y-1 text-[#ccff00]' : ''}`}>
          DECODED
        </h1>
        {isHovered && (
          <h1 className="absolute top-12 left-12 font-inter text-7xl font-black uppercase tracking-tighter mb-4 text-[#ff3b30] mix-blend-screen pointer-events-none -translate-x-2 translate-y-1">
            DECODED
          </h1>
        )}
        
        <div className="w-16 h-1 bg-[#ccff00] mx-auto mb-8"></div>

        <p className="font-mono text-[10px] uppercase tracking-[0.3em] leading-loose text-gray-400 mb-10">
          The official AI intelligence <br/>platform for the 2026 World Cup.
        </p>

        <Link 
          href="/tactics" 
          className="group flex items-center justify-center space-x-4 bg-[#ccff00] text-black font-inter font-black uppercase text-xl px-8 py-5 w-full hover:bg-white transition-colors"
        >
          <span>Initialize</span>
          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

    </section>
  );
}
