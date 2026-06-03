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
    <section className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden select-none">
      
      {/* Fallback background if GIF fails to load or before hydration */}
      <div className="absolute inset-0 bg-[#07070a] z-0" />

      {/* Massive Video Masked Text */}
      <div className="relative z-10 w-full flex justify-center items-center h-screen mix-blend-screen pointer-events-none">
        {mounted && (
          <h1 
            className="font-inter text-[150px] sm:text-[250px] lg:text-[380px] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text"
            style={{
              backgroundImage: "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHoxM2w0bjhsbjFsaWVqZnJwOWRkbDFqb2Z2c3Uxa3c4dW84bzB0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kC8N6DPOkbqWTxkNTe/giphy.gif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text"
            }}
          >
            DECODED
          </h1>
        )}
      </div>

      {/* Elegant Overlays */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-20">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e8e9f]">
          FIFA World Cup 2026
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#8e8e9f]">
          Watsonx AI Engine
        </div>
      </div>

      {/* Center Action */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-6">
        <p className="font-inter text-sm md:text-base text-[#8e8e9f] max-w-md text-center font-medium leading-relaxed">
          Tactics, pressure, and VAR decisions — finally decoded by IBM Granite.
        </p>
        <div className="flex items-center space-x-6">
          <Link href="/tactics" className="flex items-center space-x-3 text-white border-b border-white pb-1 hover:text-[#00c2a8] hover:border-[#00c2a8] transition-colors group">
            <span className="font-inter text-sm font-bold uppercase tracking-wider">Explore Platform</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center space-x-3 text-[#8e8e9f] hover:text-white transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full border border-[#8e8e9f] flex items-center justify-center group-hover:border-white transition-colors">
              <Play size={12} className="ml-0.5" />
            </div>
            <span className="font-inter text-sm font-bold uppercase tracking-wider">Watch Reel</span>
          </div>
        </div>
      </div>

    </section>
  );
}
