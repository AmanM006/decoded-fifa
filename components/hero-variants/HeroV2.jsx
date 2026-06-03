"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroV2() {
  return (
    <section className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] flex items-center justify-center relative overflow-hidden select-none py-24">
      {/* Apple-esque slow aurora gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-[#2b66ff]/20 to-[#00c2a8]/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-[#9b51e0]/20 to-[#ff3b30]/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
        
        <div className="inline-flex items-center space-x-2 bg-black/5 dark:bg-white/10 backdrop-blur-3xl border border-black/5 dark:border-white/10 px-4 py-2 rounded-full shadow-sm">
          <span className="font-inter text-xs font-semibold text-gray-800 dark:text-gray-200">Introducing DECODED World Cup 2026</span>
        </div>

        <h1 className="font-inter text-[50px] sm:text-[70px] leading-[1.1] font-bold text-gray-900 dark:text-white tracking-tight">
          Football intelligence.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b66ff] to-[#00c2a8]">
            Perfectly clear.
          </span>
        </h1>

        <p className="font-inter text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
          Experience the tactical nuance, psychological pressure, and complex referee decisions of the World Cup, seamlessly explained by Watsonx AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link href="/tactics" className="bg-gray-900 dark:bg-white text-white dark:text-black font-inter text-sm font-semibold px-8 py-3.5 rounded-full hover:scale-105 transition-transform flex items-center shadow-lg">
            <span>Explore the Platform</span>
          </Link>
          <Link href="/about" className="text-gray-900 dark:text-white font-inter text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center space-x-2 group">
            <span>Learn more</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
