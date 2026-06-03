"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroV5() {
  return (
    <section className="min-h-screen bg-white text-black flex flex-col justify-center select-none overflow-hidden border-b-[20px] border-black">
      
      {/* Top Ticker */}
      <div className="w-full border-b-[4px] border-black py-2 bg-[#ccff00] overflow-hidden whitespace-nowrap">
        <div className="font-mono text-xs md:text-sm font-black uppercase tracking-widest flex items-center space-x-12 animate-[marquee_20s_linear_infinite]">
          <span>★ THE WORLD CUP DECODED</span>
          <span>★ IBM GRANITE INFERENCE</span>
          <span>★ STATSBOMB TELEMETRY</span>
          <span>★ SAOT MESH CALIBRATION</span>
          <span>★ THE WORLD CUP DECODED</span>
          <span>★ IBM GRANITE INFERENCE</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-stretch">
        
        {/* Left Side: Massive Text */}
        <div className="w-full lg:w-[65%] border-b-[4px] lg:border-b-0 lg:border-r-[4px] border-black flex flex-col justify-between p-8 md:p-16 relative">
          <div className="space-y-4">
            <h1 className="font-inter text-[90px] sm:text-[140px] xl:text-[200px] leading-[0.8] font-black uppercase tracking-tighter mix-blend-difference relative z-10">
              DECODED
            </h1>
            <h2 className="font-teko text-[30px] md:text-[50px] leading-none uppercase font-bold text-black mix-blend-difference relative z-10">
              Tactics. Pressure. Truth.
            </h2>
          </div>

          <div className="mt-20 lg:mt-0 relative z-10">
            <p className="font-mono text-sm md:text-base font-bold max-w-md uppercase leading-relaxed bg-black text-white p-4">
              Stop guessing. We use advanced AI to tear down every single World Cup moment into pure data.
            </p>
            <div className="mt-8 flex items-center space-x-6">
              <Link href="/tactics" className="border-[4px] border-black px-8 py-4 font-inter font-black uppercase text-xl hover:bg-[#ccff00] transition-colors flex items-center space-x-3 group bg-white">
                <span>ENTER PLATFORM</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Brutalist Abstract Shape */}
          <div className="absolute right-[-100px] bottom-[-100px] w-[400px] h-[400px] bg-black rounded-full mix-blend-multiply opacity-10 pointer-events-none"></div>
        </div>

        {/* Right Side: Data List */}
        <div className="w-full lg:w-[35%] flex flex-col">
          <div className="flex-1 border-b-[4px] border-black p-8 md:p-12 hover:bg-[#ccff00] transition-colors cursor-crosshair flex flex-col justify-center">
            <div className="font-mono text-[100px] leading-none font-black text-transparent" style={{ WebkitTextStroke: "2px black" }}>01</div>
            <div className="font-inter text-3xl font-black uppercase mt-4">Tactics AI</div>
            <div className="font-mono text-sm font-bold mt-2">StatsBomb Pitch Engine</div>
          </div>
          <div className="flex-1 border-b-[4px] border-black p-8 md:p-12 hover:bg-[#ccff00] transition-colors cursor-crosshair flex flex-col justify-center">
            <div className="font-mono text-[100px] leading-none font-black text-transparent" style={{ WebkitTextStroke: "2px black" }}>02</div>
            <div className="font-inter text-3xl font-black uppercase mt-4">Stress DNA</div>
            <div className="font-mono text-sm font-bold mt-2">Crucible Score Metrics</div>
          </div>
          <div className="flex-1 p-8 md:p-12 hover:bg-[#ccff00] transition-colors cursor-crosshair flex flex-col justify-center">
            <div className="font-mono text-[100px] leading-none font-black text-transparent" style={{ WebkitTextStroke: "2px black" }}>03</div>
            <div className="font-inter text-3xl font-black uppercase mt-4">VARdict</div>
            <div className="font-mono text-sm font-bold mt-2">SAOT Mesh Tracking</div>
          </div>
        </div>

      </div>
    </section>
  );
}
