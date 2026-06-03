"use client";
import React from "react";
import Nav from "../../components/Nav";
import HeroV1 from "../../components/hero-variants/HeroV1";
import HeroV2 from "../../components/hero-variants/HeroV2";
import HeroV3 from "../../components/hero-variants/HeroV3";
import HeroV4 from "../../components/hero-variants/HeroV4";
import HeroV5 from "../../components/hero-variants/HeroV5";
import HeroV6 from "../../components/hero-variants/HeroV6";
import HeroV7 from "../../components/hero-variants/HeroV7";
import HeroV8 from "../../components/hero-variants/HeroV8";
import HeroV9 from "../../components/hero-variants/HeroV9";
import HeroV10 from "../../components/hero-variants/HeroV10";
import HeroV11 from "../../components/hero-variants/HeroV11";
import HeroV12 from "../../components/hero-variants/HeroV12";

export default function HeroGallery() {
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050508] min-h-screen text-white font-inter">
      <Nav />
      
      {/* Sticky Gallery Controller */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 flex flex-col items-center shadow-2xl max-w-full overflow-x-auto">
        <span className="font-mono text-[10px] text-[#8e8e9f] uppercase tracking-widest mb-3">Select Variant</span>
        
        {/* Row 1: V1-V6 */}
        <div className="flex items-center space-x-3 mb-2 flex-wrap justify-center gap-y-2">
          <button onClick={() => scrollTo('v1')} className="text-[10px] font-bold hover:text-[#00c2a8]">V1: HUD</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v2')} className="text-[10px] font-bold hover:text-[#2b66ff]">V2: Glass</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v3')} className="text-[10px] font-bold hover:text-white">V3: Mag Split</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v4')} className="text-[10px] font-bold hover:text-[#ffd700]">V4: Grid</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v5')} className="text-[10px] font-bold hover:text-[#ccff00]">V5: Brutal</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v6')} className="text-[10px] font-bold hover:text-[#ff3b30]">V6: Video Mask</button>
        </div>

        {/* Row 2: V7-V12 */}
        <div className="flex items-center space-x-3 flex-wrap justify-center gap-y-2">
          <button onClick={() => scrollTo('v7')} className="text-[10px] font-bold hover:text-[#00c2a8]">V7: Float Cards</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v8')} className="text-[10px] font-bold hover:text-[#2563eb]">V8: SaaS</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v9')} className="text-[10px] font-bold hover:text-white">V9: Minimal</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v10')} className="text-[10px] font-bold hover:text-[#ffd700]">V10: Cinematic</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v11')} className="text-[10px] font-bold hover:text-[#ccff00]">V11: Kinetic</button>
          <span className="w-px h-3 bg-white/20 hidden sm:block"></span>
          <button onClick={() => scrollTo('v12')} className="text-[10px] font-bold hover:text-[#00ff41]">V12: Terminal</button>
        </div>
      </div>

      <div id="v1" className="min-h-screen border-b-8 border-[#00c2a8] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#00c2a8] text-black font-mono text-xs font-bold tracking-widest">VARIANT 1: HUD</div>
        <HeroV1 />
      </div>

      <div id="v2" className="min-h-screen border-b-8 border-[#2b66ff] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#2b66ff] text-white font-mono text-xs font-bold tracking-widest">VARIANT 2: GLASS</div>
        <HeroV2 />
      </div>

      <div id="v3" className="min-h-screen border-b-8 border-white relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-white text-black font-mono text-xs font-bold tracking-widest">VARIANT 3: MAG SPLIT</div>
        <HeroV3 />
      </div>

      <div id="v4" className="min-h-screen border-b-8 border-[#ffd700] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#ffd700] text-black font-mono text-xs font-bold tracking-widest">VARIANT 4: GRID</div>
        <HeroV4 />
      </div>

      <div id="v5" className="min-h-screen border-b-8 border-[#ccff00] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#ccff00] text-black font-mono text-xs font-bold tracking-widest">VARIANT 5: BRUTALISM</div>
        <HeroV5 />
      </div>

      <div id="v6" className="min-h-screen border-b-8 border-[#ff3b30] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#ff3b30] text-white font-mono text-xs font-bold tracking-widest">VARIANT 6: VIDEO MASK</div>
        <HeroV6 />
      </div>

      <div id="v7" className="min-h-screen border-b-8 border-[#00c2a8] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#00c2a8] text-black font-mono text-xs font-bold tracking-widest">VARIANT 7: WALLET CARDS</div>
        <HeroV7 />
      </div>

      <div id="v8" className="min-h-screen border-b-8 border-[#2563eb] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#2563eb] text-white font-mono text-xs font-bold tracking-widest">VARIANT 8: SAAS</div>
        <HeroV8 />
      </div>

      <div id="v9" className="min-h-screen border-b-8 border-white relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-white text-black font-mono text-xs font-bold tracking-widest">VARIANT 9: MINIMALISM</div>
        <HeroV9 />
      </div>

      <div id="v10" className="min-h-screen border-b-8 border-[#ffd700] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#ffd700] text-black font-mono text-xs font-bold tracking-widest">VARIANT 10: CINEMATIC</div>
        <HeroV10 />
      </div>

      <div id="v11" className="min-h-screen border-b-8 border-[#ccff00] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#ccff00] text-black font-mono text-xs font-bold tracking-widest">VARIANT 11: KINETIC TYPOGRAPHY</div>
        <HeroV11 />
      </div>

      <div id="v12" className="min-h-screen border-b-8 border-[#00ff41] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#00ff41] text-black font-mono text-xs font-bold tracking-widest">VARIANT 12: TERMINAL</div>
        <HeroV12 />
      </div>

    </div>
  );
}
