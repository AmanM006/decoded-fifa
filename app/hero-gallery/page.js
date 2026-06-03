"use client";
import React from "react";
import Nav from "../../components/Nav";
import HeroV1 from "../../components/hero-variants/HeroV1";
import HeroV2 from "../../components/hero-variants/HeroV2";
import HeroV3 from "../../components/hero-variants/HeroV3";
import HeroV4 from "../../components/hero-variants/HeroV4";

export default function HeroGallery() {
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050508] min-h-screen text-white font-inter">
      <Nav />
      
      {/* Sticky Gallery Controller */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center space-x-4 shadow-2xl">
        <span className="font-mono text-[10px] text-[#8e8e9f] uppercase tracking-widest mr-2">Select Variant:</span>
        <button onClick={() => scrollTo('v1')} className="text-xs font-bold hover:text-[#00c2a8] transition-colors">V1: HUD</button>
        <span className="w-px h-4 bg-white/20"></span>
        <button onClick={() => scrollTo('v2')} className="text-xs font-bold hover:text-[#2b66ff] transition-colors">V2: Glass</button>
        <span className="w-px h-4 bg-white/20"></span>
        <button onClick={() => scrollTo('v3')} className="text-xs font-bold hover:text-white transition-colors">V3: Mag Split</button>
        <span className="w-px h-4 bg-white/20"></span>
        <button onClick={() => scrollTo('v4')} className="text-xs font-bold hover:text-[#ffd700] transition-colors">V4: Data Grid</button>
      </div>

      <div id="v1" className="min-h-screen border-b-8 border-[#00c2a8]">
        <div className="absolute p-4 z-50 bg-[#00c2a8] text-black font-mono text-xs font-bold tracking-widest">VARIANT 1</div>
        <HeroV1 />
      </div>

      <div id="v2" className="min-h-screen border-b-8 border-[#2b66ff]">
        <div className="absolute p-4 z-50 bg-[#2b66ff] text-white font-mono text-xs font-bold tracking-widest">VARIANT 2</div>
        <HeroV2 />
      </div>

      <div id="v3" className="min-h-screen border-b-8 border-white">
        <div className="absolute p-4 z-50 bg-white text-black font-mono text-xs font-bold tracking-widest">VARIANT 3</div>
        <HeroV3 />
      </div>

      <div id="v4" className="min-h-screen border-b-8 border-[#ffd700]">
        <div className="absolute p-4 z-50 bg-[#ffd700] text-black font-mono text-xs font-bold tracking-widest">VARIANT 4</div>
        <HeroV4 />
      </div>
    </div>
  );
}
