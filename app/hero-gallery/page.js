"use client";
import React from "react";
import Nav from "../../components/Nav";
import HeroV6 from "../../components/hero-variants/HeroV6";
import HeroV7 from "../../components/hero-variants/HeroV7";
import HeroV11 from "../../components/hero-variants/HeroV11";

export default function HeroGallery() {
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050508] min-h-screen text-white font-inter">
      <Nav />
      
      {/* Sticky Gallery Controller */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 flex flex-col items-center shadow-2xl">
        <span className="font-mono text-[10px] text-[#8e8e9f] uppercase tracking-widest mb-2">Final 3 Options</span>
        
        <div className="flex items-center space-x-4">
          <button onClick={() => scrollTo('v6')} className="text-xs font-bold hover:text-white transition-colors">1: Cinematic Video</button>
          <span className="w-px h-4 bg-white/20"></span>
          <button onClick={() => scrollTo('v7')} className="text-xs font-bold hover:text-[#00c2a8] transition-colors">2: Wallet Cards</button>
          <span className="w-px h-4 bg-white/20"></span>
          <button onClick={() => scrollTo('v11')} className="text-xs font-bold hover:text-[#ff3b30] transition-colors">3: Kinetic Storm</button>
        </div>
      </div>

      <div id="v6" className="min-h-screen border-b-8 border-white relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-white text-black font-mono text-xs font-bold tracking-widest">FINALIST 1: CINEMATIC VIDEO MASK</div>
        <HeroV6 />
      </div>

      <div id="v7" className="min-h-screen border-b-8 border-[#00c2a8] relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#00c2a8] text-black font-mono text-xs font-bold tracking-widest">FINALIST 2: FLOATING WALLET CARDS</div>
        <HeroV7 />
      </div>

      <div id="v11" className="min-h-screen relative">
        <div className="absolute top-0 right-0 p-4 z-50 bg-[#ff3b30] text-white font-mono text-xs font-bold tracking-widest">FINALIST 3: KINETIC TYPOGRAPHY</div>
        <HeroV11 />
      </div>

    </div>
  );
}
