"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Database, Fingerprint } from "lucide-react";

export default function HeroV8() {
  return (
    <section className="min-h-screen bg-white text-[#111] flex items-center justify-center relative overflow-hidden select-none py-24 font-inter">
      
      {/* SaaS Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#f4f4f5] text-[#3f3f46] px-3 py-1.5 rounded-full border border-[#e4e4e7] text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span>Platform v2.0 is now live</span>
          </div>
          
          <h1 className="text-[50px] sm:text-[64px] font-extrabold leading-[1.1] tracking-tight text-[#09090b]">
            World Cup data,<br />
            <span className="text-[#2563eb]">decoded by AI.</span>
          </h1>

          <p className="text-lg text-[#52525b] leading-relaxed max-w-lg font-medium">
            Turn complex VAR decisions, psychological pressure, and tactical mesh networks into beautifully clear, actionable insights powered by Watsonx.
          </p>

          <div className="flex items-center space-x-4 pt-4">
            <Link href="/tactics" className="bg-[#09090b] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#27272a] transition-colors flex items-center space-x-2 shadow-lg">
              <span>Start Analyzing</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="bg-white text-[#09090b] border border-[#e4e4e7] px-6 py-3 rounded-md font-semibold hover:bg-[#f4f4f5] transition-colors shadow-sm">
              Read Documentation
            </Link>
          </div>

          <div className="flex items-center space-x-8 pt-8 text-[#71717a] text-sm font-semibold">
            <div className="flex items-center space-x-2"><Database size={16}/><span>StatsBomb Open Data</span></div>
            <div className="flex items-center space-x-2"><Fingerprint size={16}/><span>Docling RAG Engine</span></div>
          </div>
        </div>

        {/* Right Dashboard Mockup */}
        <div className="w-full lg:w-1/2 relative">
          <div className="bg-white border border-[#e4e4e7] rounded-xl shadow-2xl p-2 relative z-20">
            {/* Fake Browser header */}
            <div className="flex items-center space-x-2 px-2 pb-2 border-b border-[#f4f4f5] mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f87171]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#34d399]"></div>
            </div>
            {/* Fake Dashboard Content */}
            <div className="bg-[#fafafa] rounded-lg h-[400px] p-6 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div className="font-bold text-[#09090b]">Tactical Analysis Network</div>
                <BarChart3 size={16} className="text-[#2563eb]" />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/3 bg-white border border-[#e4e4e7] p-4 rounded-md shadow-sm h-24"></div>
                <div className="w-1/3 bg-white border border-[#e4e4e7] p-4 rounded-md shadow-sm h-24"></div>
                <div className="w-1/3 bg-white border border-[#e4e4e7] p-4 rounded-md shadow-sm h-24"></div>
              </div>
              <div className="w-full flex-1 bg-white border border-[#e4e4e7] p-4 rounded-md shadow-sm flex items-center justify-center">
                <div className="text-[#a1a1aa] font-mono text-xs">Canvas Graphic Initialized...</div>
              </div>
            </div>
          </div>

          {/* Decorative floating elements behind mockup */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#bfdbfe] rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ddd6fe] rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
        </div>

      </div>
    </section>
  );
}
