"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroV10() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden select-none">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518605368461-1ee7e16104bc?q=80&w=3000&auto=format&fit=crop')" }}
        />
        {/* Dark luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center space-y-12">
        
        <div className="font-mono text-[10px] tracking-[0.4em] text-white/50 uppercase">
          The Decoded Platform
        </div>

        <h1 className="font-serif text-[50px] md:text-[80px] lg:text-[110px] leading-[1] text-white tracking-tight">
          See the unseen.
        </h1>

        <p className="font-sans text-sm md:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Powered by IBM Granite and StatsBomb data, we expose the tactical layers, psychological pressure, and definitive physics behind every World Cup moment.
        </p>

        <Link href="/tactics" className="group mt-12 inline-flex items-center space-x-4 bg-white text-black px-8 py-4 hover:bg-white/90 transition-colors">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">Begin Experience</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
      </div>
      
    </section>
  );
}
