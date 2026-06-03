"use client";
import React from "react";
import Link from "next/link";

export default function HeroV9() {
  return (
    <section className="min-h-screen bg-white flex flex-col justify-between p-12 lg:p-24 select-none">
      
      {/* Header */}
      <div className="flex justify-between items-start w-full">
        <div className="font-sans text-[10px] tracking-[0.2em] text-black uppercase">
          Decoded Platform
        </div>
        <div className="font-sans text-[10px] tracking-[0.2em] text-black uppercase text-right">
          MMXXVI
        </div>
      </div>

      {/* Center Content */}
      <div className="w-full flex flex-col items-center justify-center text-center space-y-12 my-auto">
        
        {/* Tiny Logo */}
        <div className="w-4 h-4 bg-black rounded-full"></div>
        
        {/* Elegant typography */}
        <h1 className="font-serif text-[40px] md:text-[60px] lg:text-[80px] leading-[1.1] text-black tracking-tight max-w-4xl mx-auto">
          The art of the game, <br />
          reduced to absolute truth.
        </h1>

        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gray-400 max-w-sm mx-auto leading-loose">
          Watsonx AI • StatsBomb • World Cup 2026
        </p>

        <Link href="/tactics" className="group relative mt-16 inline-block">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-black pb-2 border-b border-black">
            Enter the Interface
          </span>
        </Link>
      </div>

      {/* Footer Line */}
      <div className="w-full flex justify-center">
        <div className="w-px h-24 bg-gray-200"></div>
      </div>
      
    </section>
  );
}
