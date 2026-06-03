"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Target } from "lucide-react";

export default function HeroV1() {
  return (
    <section className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden select-none py-24">
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] z-10 pointer-events-none opacity-80" />
      
      {/* Floating HUD Elements */}
      <div className="absolute top-1/4 left-10 lg:left-24 z-20 hidden md:block">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-sm flex items-center space-x-3 text-[#00c2a8]">
          <Cpu size={16} />
          <div className="font-mono text-xs uppercase tracking-widest">Granite Inference Active</div>
        </div>
      </div>
      <div className="absolute bottom-1/4 right-10 lg:right-24 z-20 hidden md:block">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-sm flex items-center space-x-3 text-[#ff3b30]">
          <Target size={16} />
          <div className="font-mono text-xs uppercase tracking-widest">SAOT Tracking: 2.3cm</div>
        </div>
      </div>

      <div className="relative z-30 text-center w-full max-w-5xl px-6">
        <h1 className="font-teko text-[120px] sm:text-[180px] lg:text-[250px] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#8e8e9f] to-[#111118] font-black uppercase tracking-tighter"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
          DECODED
        </h1>
        <p className="font-inter text-[#8e8e9f] text-sm sm:text-base max-w-xl mx-auto mt-8 leading-relaxed font-light tracking-wide">
          A high-end tactical AI platform decoding extreme pressure, complex VAR decisions, and the psychology of the World Cup using IBM Granite.
        </p>
        
        <div className="mt-12 flex justify-center">
          <Link href="/tactics" className="group flex items-center space-x-3 bg-white hover:bg-[#00c2a8] text-black hover:text-white px-8 py-4 rounded-none transition-colors duration-300">
            <span className="font-teko text-xl font-bold tracking-widest uppercase">Enter Platform</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
