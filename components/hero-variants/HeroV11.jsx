"use client";
import React from "react";
import Link from "next/link";

export default function HeroV11() {
  return (
    <section className="min-h-screen bg-[#ff3b30] text-black overflow-hidden flex flex-col justify-center relative select-none">
      
      {/* Background Marquees */}
      <div className="absolute inset-0 flex flex-col justify-between py-12 opacity-80 mix-blend-color-burn pointer-events-none">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite]">
          <span className="font-teko text-[150px] md:text-[250px] leading-none uppercase font-black mr-8">TACTICS • PRESSURE • VAR • RULES •</span>
          <span className="font-teko text-[150px] md:text-[250px] leading-none uppercase font-black">TACTICS • PRESSURE • VAR • RULES •</span>
        </div>
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite_reverse]">
          <span className="font-teko text-[150px] md:text-[250px] leading-none uppercase font-black mr-8">WORLD CUP 26 DECODED BY WATSONX •</span>
          <span className="font-teko text-[150px] md:text-[250px] leading-none uppercase font-black">WORLD CUP 26 DECODED BY WATSONX •</span>
        </div>
        <div className="whitespace-nowrap animate-[marquee_12s_linear_infinite]">
          <span className="font-teko text-[150px] md:text-[250px] leading-none uppercase font-black mr-8">STATSBOMB OPEN DATA TELEMETRY •</span>
          <span className="font-teko text-[150px] md:text-[250px] leading-none uppercase font-black">STATSBOMB OPEN DATA TELEMETRY •</span>
        </div>
      </div>

      {/* Center Box */}
      <div className="relative z-10 mx-auto w-full max-w-md bg-black text-white p-8 md:p-12 text-center transform -rotate-2 shadow-2xl">
        <h1 className="font-inter text-5xl font-black uppercase tracking-tighter mb-4">
          DECODED
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest leading-loose text-gray-300 mb-8">
          The official AI intelligence platform for the 2026 World Cup.
        </p>
        <Link href="/tactics" className="inline-block bg-[#ccff00] text-black font-inter font-black uppercase text-xl px-8 py-4 w-full hover:bg-white transition-colors">
          Enter Platform
        </Link>
      </div>

    </section>
  );
}
