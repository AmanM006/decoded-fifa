"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Target, Brain, Scale, Trophy, BookOpen, Heart, Activity, ArrowUpRight, Cpu } from "lucide-react";

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen bg-[#07070a] flex items-center justify-center p-4 sm:p-8 pt-[72px] lg:pt-[52px] select-none">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00c2a8]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Bento Grid */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[220px] relative z-10">
        
        {/* ── CARD 1: Hero Main (2x2) ── */}
        <div className={`col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-[#0c0c11] border border-[#1a1a2e] rounded-3xl p-8 lg:p-12 flex flex-col justify-between group overflow-hidden relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Internal subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00c2a8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#1a1a2e] border border-[#2a2a3e] px-3 py-1.5 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2a8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c2a8]"></span>
              </span>
              <span className="font-mono text-[9px] text-white font-bold uppercase tracking-widest">Platform Live</span>
            </div>
            
            <h1 className="font-teko text-[70px] lg:text-[90px] leading-[0.8] text-white uppercase font-black tracking-tighter">
              DECODED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c2a8] to-[#2b66ff]">
                WORLD CUP
              </span>
            </h1>
            <p className="font-inter text-[14px] text-[#8e8e9f] mt-4 max-w-sm leading-relaxed">
              Tactics, extreme pressure, and complex VAR decisions — finally decoded by IBM Granite and StatsBomb open data.
            </p>
          </div>

          <Link href="/tactics" className="inline-flex items-center justify-between bg-white text-black font-inter text-[13px] font-bold px-6 py-3.5 rounded-full w-max hover:bg-[#00c2a8] hover:text-white transition-all duration-300 group/btn mt-8">
            <span className="tracking-wide">ENTER PLATFORM</span>
            <div className="ml-4 bg-black/10 p-1 rounded-full group-hover/btn:bg-black/20 transition-colors">
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>

        {/* ── CARD 2: Pitch Map Graphic (1x2) ── */}
        <div className={`col-span-1 md:col-span-1 lg:col-span-1 row-span-2 bg-[#0c0c11] border border-[#1a1a2e] rounded-3xl p-6 relative overflow-hidden flex flex-col transition-all duration-700 delay-[100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex justify-between items-start z-10">
            <span className="font-mono text-[10px] text-[#8e8e9f] uppercase tracking-widest font-bold">Tactical Mesh</span>
            <Target size={14} className="text-[#00c2a8]" />
          </div>
          
          {/* Abstract Pitch Vector */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-10">
            <div className="w-[80%] h-[120%] border border-[#1a1a2e] rounded-[40px] opacity-50 relative flex items-center justify-center">
              <div className="w-full h-px bg-[#1a1a2e] absolute top-1/2 -translate-y-1/2"></div>
              <div className="w-[60px] h-[60px] border border-[#1a1a2e] rounded-full absolute"></div>
              {/* Nodes */}
              <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-[#00c2a8] rounded-full shadow-[0_0_10px_#00c2a8]"></div>
              <div className="absolute bottom-[30%] right-[30%] w-2 h-2 bg-[#ff3b30] rounded-full shadow-[0_0_10px_#ff3b30]"></div>
              <div className="absolute top-[40%] right-[20%] w-2 h-2 bg-[#00c2a8] rounded-full opacity-30"></div>
            </div>
          </div>

          <div className="mt-auto z-10">
            <div className="font-teko text-[28px] text-white leading-none">14,258</div>
            <div className="font-inter text-[10px] text-[#8e8e9f]">Events Mapped</div>
          </div>
        </div>

        {/* ── CARD 3: Stress DNA (1x1) ── */}
        <Link href="/pressure" className={`col-span-1 bg-[#0c0c11] border border-[#1a1a2e] hover:border-[#ffd700]/40 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-700 delay-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-[#ffd700]/10 flex items-center justify-center group-hover:bg-[#ffd700]/20 transition-colors">
              <Brain size={14} className="text-[#ffd700]" />
            </div>
            <ArrowUpRight size={14} className="text-[#8e8e9f] group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="font-teko text-[24px] text-white uppercase tracking-wide leading-none mb-1">Stress DNA</div>
            <div className="font-inter text-[11px] text-[#8e8e9f]">Crucible Score Analysis</div>
          </div>
        </Link>

        {/* ── CARD 4: VARdict (1x1) ── */}
        <Link href="/vardict" className={`col-span-1 bg-[#0c0c11] border border-[#1a1a2e] hover:border-[#ff3b30]/40 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-700 delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-[#ff3b30]/10 flex items-center justify-center group-hover:bg-[#ff3b30]/20 transition-colors">
              <Scale size={14} className="text-[#ff3b30]" />
            </div>
            <ArrowUpRight size={14} className="text-[#8e8e9f] group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="font-teko text-[24px] text-white uppercase tracking-wide leading-none mb-1">VARdict</div>
            <div className="font-inter text-[11px] text-[#8e8e9f]">Limb-Tracking HUD</div>
          </div>
        </Link>

        {/* ── CARD 5: Ask the Ref (1x1) ── */}
        <Link href="/laws" className={`col-span-1 md:col-span-2 lg:col-span-1 bg-[#0c0c11] border border-[#1a1a2e] hover:border-[#2b66ff]/40 rounded-3xl p-6 flex flex-col justify-between group transition-all duration-700 delay-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-[#2b66ff]/10 flex items-center justify-center group-hover:bg-[#2b66ff]/20 transition-colors">
              <BookOpen size={14} className="text-[#2b66ff]" />
            </div>
            <ArrowUpRight size={14} className="text-[#8e8e9f] group-hover:text-white transition-colors" />
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="font-teko text-[24px] text-white uppercase tracking-wide leading-none mb-1">Ask the Ref</div>
            <div className="font-inter text-[11px] text-[#8e8e9f]">Docling RAG Rulebook</div>
          </div>
        </Link>

        {/* ── CARD 6: Drama & IBM Engine (2x1) ── */}
        <div className={`col-span-1 md:col-span-2 lg:col-span-2 bg-[#0c0c11] border border-[#1a1a2e] rounded-3xl p-6 flex flex-col sm:flex-row gap-6 relative overflow-hidden transition-all duration-700 delay-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          
          {/* IBM Engine Module */}
          <div className="flex-1 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-[#1a1a2e] pb-6 sm:pb-0 sm:pr-6">
            <div className="flex items-center space-x-2 mb-4">
              <Cpu size={14} className="text-[#4a90e2]" />
              <span className="font-mono text-[10px] text-[#4a90e2] uppercase tracking-widest font-bold">Inference</span>
            </div>
            <div>
              <div className="font-mono text-[11px] text-[#8e8e9f] leading-relaxed">
                Powered entirely by <strong className="text-white">IBM Granite 3.3</strong> language models running on <strong className="text-white">watsonx.ai</strong>.
              </div>
            </div>
          </div>

          {/* Drama Module */}
          <Link href="/drama" className="flex-1 flex flex-col justify-between group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-[#ff3b30]/10 flex items-center justify-center group-hover:bg-[#ff3b30]/20 transition-colors">
                <Heart size={14} className="text-[#ff3b30]" />
              </div>
              <ArrowUpRight size={14} className="text-[#8e8e9f] group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="font-teko text-[24px] text-white uppercase tracking-wide leading-none mb-1">Drama Timeline</div>
              <div className="font-inter text-[11px] text-[#8e8e9f]">Match Sentiment Engine</div>
            </div>
          </Link>
          
        </div>

      </div>

    </section>
  );
}
