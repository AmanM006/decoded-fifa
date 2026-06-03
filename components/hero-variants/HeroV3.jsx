"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroV3() {
  return (
    <section className="min-h-screen bg-[#07070a] flex flex-col lg:flex-row items-stretch select-none">
      {/* Left Side: Typography & CTA */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 lg:p-24 z-10 relative bg-[#030305]">
        <div className="max-w-lg space-y-8">
          <div className="font-mono text-[10px] text-[#8e8e9f] uppercase tracking-[0.3em] font-bold">
            01 / Platform Overview
          </div>
          <h1 className="font-inter text-[60px] lg:text-[80px] leading-[0.9] font-black text-white tracking-tighter uppercase">
            The Game.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#44445c]">Decoded.</span>
          </h1>
          <p className="font-inter text-sm text-[#8e8e9f] leading-relaxed max-w-sm">
            High-fidelity tactical analysis, biometric pressure mapping, and VAR reconstruction for the 2026 FIFA World Cup.
          </p>
          <div className="flex items-center space-x-6 pt-4">
            <Link href="/tactics" className="flex items-center space-x-3 bg-white text-black px-6 py-4 rounded-sm hover:bg-[#eaeaea] transition-colors">
              <span className="font-inter text-xs font-bold uppercase tracking-wider">Start Analysis</span>
              <ArrowRight size={14} />
            </Link>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <Play size={14} className="text-white ml-1" />
              </div>
              <span className="font-inter text-xs font-semibold text-white uppercase tracking-wider group-hover:opacity-80">Watch Demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Graphic Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0a0a0f] border-l border-white/5 items-center justify-center overflow-hidden">
        {/* Abstract Graphic Rings */}
        <div className="absolute w-[800px] h-[800px] border-[40px] border-[#00c2a8]/10 rounded-full flex items-center justify-center mix-blend-screen">
          <div className="w-[600px] h-[600px] border-[2px] border-dashed border-[#2b66ff]/30 rounded-full animate-[spin_60s_linear_infinite]" />
        </div>
        
        {/* Big 26 */}
        <div className="relative z-10 font-teko text-[350px] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
          26<span className="text-[#ffd700] text-[150px]">.</span>
        </div>
        
        <div className="absolute bottom-12 right-12 text-right">
          <div className="font-mono text-[10px] text-[#8e8e9f] uppercase tracking-widest">Powered by</div>
          <div className="font-inter text-sm text-white font-bold tracking-widest mt-1">IBM GRANITE</div>
        </div>
      </div>
    </section>
  );
}
