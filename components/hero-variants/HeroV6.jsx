"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function HeroV6() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen bg-[#020202] flex flex-col justify-center items-center relative overflow-hidden select-none font-inter">
      
      {/* Film Grain Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }}
      />

      <div className="absolute inset-0 bg-[#020202] z-0" />

      {/* Massive Video Masked Text */}
      <div className="relative z-10 w-full flex justify-center items-center h-screen mix-blend-screen pointer-events-none">
        {mounted && (
          <h1 
            className="font-inter text-[120px] sm:text-[200px] lg:text-[320px] xl:text-[400px] leading-[0.75] font-black uppercase tracking-tighter text-transparent bg-clip-text"
            style={{
              // Using a high-quality sports/action aesthetic GIF 
              backgroundImage: "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRwbG1iZDNjc2QxeG5tdnV1dDhhbWdmbHRhMzNxZWt5NzB2MndhOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xBSs6cGGgqQsn6/giphy.gif')",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              WebkitBackgroundClip: "text",
              filter: "contrast(1.2) saturate(1.1) brightness(1.3)"
            }}
          >
            DECODED
          </h1>
        )}
      </div>

      {/* Ultra-refined Navigation Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-20 mix-blend-difference">
        <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/80">
          Project 2026
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/80">
          Powered by IBM Granite
        </div>
      </div>

      {/* Center Action */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-8 mix-blend-difference w-full px-6">
        <p className="font-sans text-xs md:text-sm text-white/70 max-w-md text-center font-medium leading-relaxed tracking-wide">
          Tactics, psychological pressure, and precise physics — decoded live.
        </p>
        <div className="flex items-center space-x-8">
          <Link href="/tactics" className="flex items-center space-x-3 text-white border-b border-white/30 pb-1 hover:border-white transition-all group">
            <span className="font-sans text-[11px] font-bold uppercase tracking-widest">Enter Platform</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
              <Play size={10} className="ml-0.5" />
            </div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-widest">Watch Trailer</span>
          </div>
        </div>
      </div>

    </section>
  );
}
