"use client";
import React from "react";
import Link from "next/link";
import { Activity, Database, Cpu, Zap, ArrowUpRight } from "lucide-react";

export default function HeroV4() {
  return (
    <section className="min-h-screen bg-[#020202] flex items-center justify-center p-6 md:p-12 select-none font-mono">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-1.5 auto-rows-min">
        
        {/* Top Bar */}
        <div className="col-span-full bg-[#0d0d0d] border border-[#222] p-4 flex justify-between items-center text-[#888] text-[10px] uppercase tracking-widest">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-2 text-[#00c2a8]"><Zap size={12}/> <span>SYS.ONLINE</span></span>
            <span>DECODED_CORE_v1.0</span>
          </div>
          <div>WC26_DATACENTER</div>
        </div>

        {/* Main Title Block */}
        <div className="col-span-full md:col-span-8 bg-[#0d0d0d] border border-[#222] p-10 flex flex-col justify-end min-h-[300px]">
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            DECODED <br/><span className="text-[#333]">WORLD CUP</span>
          </h1>
          <p className="text-[#888] text-xs max-w-md mt-4 font-inter leading-relaxed">
            Advanced analytics terminal for the 2026 FIFA World Cup. Tactical telemetry, SAOT calibration, and biometric stress modeling.
          </p>
        </div>

        {/* Status Block */}
        <div className="col-span-full md:col-span-4 bg-[#0d0d0d] border border-[#222] p-8 flex flex-col justify-between min-h-[300px]">
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center border-b border-[#222] pb-2 text-[10px] text-[#aaa]">
              <span>Granite Inference</span> <span className="text-[#00c2a8]">IDLE</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2 text-[10px] text-[#aaa]">
              <span>Data Ingestion</span> <span className="text-[#2b66ff]">SYNCED</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2 text-[10px] text-[#aaa]">
              <span>Active Nodes</span> <span className="text-white">1,420</span>
            </div>
          </div>
          <Link href="/tactics" className="w-full bg-white text-black py-4 mt-8 flex items-center justify-center space-x-2 hover:bg-[#ccc] transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest">Init Console</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Feature Tiles */}
        <Link href="/tactics" className="col-span-6 md:col-span-3 bg-[#0d0d0d] border border-[#222] p-6 hover:bg-[#111] hover:border-[#444] transition-colors group cursor-pointer h-32 flex flex-col justify-between">
          <Database size={16} className="text-[#00c2a8] group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white uppercase tracking-wider">Tactics AI</span>
        </Link>
        <Link href="/pressure" className="col-span-6 md:col-span-3 bg-[#0d0d0d] border border-[#222] p-6 hover:bg-[#111] hover:border-[#444] transition-colors group cursor-pointer h-32 flex flex-col justify-between">
          <Activity size={16} className="text-[#ffd700] group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white uppercase tracking-wider">Stress DNA</span>
        </Link>
        <Link href="/vardict" className="col-span-6 md:col-span-3 bg-[#0d0d0d] border border-[#222] p-6 hover:bg-[#111] hover:border-[#444] transition-colors group cursor-pointer h-32 flex flex-col justify-between">
          <Cpu size={16} className="text-[#ff3b30] group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white uppercase tracking-wider">VARdict</span>
        </Link>
        <Link href="/laws" className="col-span-6 md:col-span-3 bg-[#0d0d0d] border border-[#222] p-6 hover:bg-[#111] hover:border-[#444] transition-colors group cursor-pointer h-32 flex flex-col justify-between">
          <Zap size={16} className="text-[#2b66ff] group-hover:scale-110 transition-transform" />
          <span className="text-xs text-white uppercase tracking-wider">Ask Ref</span>
        </Link>

      </div>
    </section>
  );
}
