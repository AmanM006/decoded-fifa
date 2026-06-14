"use client";

import React from "react";
import Link from "next/link";
import { 
  Cpu, 
  Database, 
  FileText, 
  Scale, 
  Zap, 
  ArrowRight, 
  Activity, 
  ShieldAlert, 
  Sliders, 
  Eye, 
  HelpCircle 
} from "lucide-react";

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-[#07070a] pt-[52px] font-inter text-[#f0f0f5] select-none pb-16">

      {/* Hero / Header Section */}
      <section className="border-b border-[#222232] px-6 md:px-16 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b66ff]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl relative z-10">
          <span className="inline-flex items-center space-x-1.5 bg-[#00c2a8]/10 border border-[#00c2a8]/30 text-[#00c2a8] text-[9px] font-inter font-black uppercase tracking-[0.2em] px-3 py-1 rounded mb-6">
            <Zap size={9} />
            <span>Explainability Manifesto</span>
          </span>
          
          <h1 className="font-teko text-[72px] md:text-[96px] text-white leading-[0.85] tracking-tighter uppercase font-black mb-6">
            THE TRUST GAP IN <span className="text-[#2b66ff]">AI FOOTBALL</span>
          </h1>
          
          <p className="text-[16px] text-[#8e8e9f] leading-relaxed max-w-2xl font-light">
            When milli-second decisions dictate history, fans deserve more than a black-box verdict. 
            DECODED is built on the belief that AI officiating must be transparent, verifiable, 
            and self-correcting. Here is how we enforce absolute trust.
          </p>
        </div>
      </section>

      {/* Manifesto Columns */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Core Column 1: Verification over Assertions */}
        <div className="bg-[#0c0c12] border border-[#222232] rounded-xl p-6 space-y-4 hover:border-[#2b66ff]/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-[#2b66ff]/10 border border-[#2b66ff]/35 flex items-center justify-center text-[#2b66ff]">
            <Eye size={20} />
          </div>
          <h2 className="font-teko text-[26px] text-white uppercase tracking-wider font-bold">1. Transparent Calibration Limits</h2>
          <p className="text-[12.5px] text-[#8e8e9f] leading-relaxed">
            Standard VAR lines pretend to show sub-millimeter precision. In reality, frame rates (50fps) and camera angles introduce <strong>±3.0cm projection uncertainties</strong>. 
            We expose this boundary. If a calculated offside margin is within this limit, DECODED declares a <strong className="text-[#ffd700]">Too Close to Call</strong> state rather than hallucinating a false certainty.
          </p>
        </div>

        {/* Core Column 2: Fail-Closed Guardrails */}
        <div className="bg-[#0c0c12] border border-[#222232] rounded-xl p-6 space-y-4 hover:border-[#ff3b30]/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-[#ff3b30]/10 border border-[#ff3b30]/35 flex items-center justify-center text-[#ff3b30]">
            <ShieldAlert size={20} />
          </div>
          <h2 className="font-teko text-[26px] text-white uppercase tracking-wider font-bold">2. Compliance & Safeguards</h2>
          <p className="text-[12.5px] text-[#8e8e9f] leading-relaxed">
            AI models are prone to hallucinating game rules under pressure. We implement <strong>IBM Granite Guardian 4.1</strong> validation checks. 
            If any tactical report or law lookup violates safety bounds, the request fail-closes instantly into a deterministic, pre-signed FIFA official law-citing floor. No rogue data reaches the screen.
          </p>
        </div>

        {/* Core Column 3: Type Safety & Integrity */}
        <div className="bg-[#0c0c12] border border-[#222232] rounded-xl p-6 space-y-4 hover:border-[#00c2a8]/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-[#00c2a8]/10 border border-[#00c2a8]/35 flex items-center justify-center text-[#00c2a8]">
            <Database size={20} />
          </div>
          <h2 className="font-teko text-[26px] text-white uppercase tracking-wider font-bold">3. Schema Type Safety Contracts</h2>
          <p className="text-[12.5px] text-[#8e8e9f] leading-relaxed">
            Data corruption inside telemetry APIs frequently causes canvas rendering crashes. We utilize strict <strong>Zod contract schemas</strong> to validate every incoming match event from the StatsBomb API. 
            Corrupted fields are intercepted immediately, preventing client-side breakage and self-healing via local preset structures.
          </p>
        </div>

      </section>

      {/* Structural RAG Pipeline & Docling */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
            <FileText size={400} className="text-white" />
          </div>
          
          <div className="max-w-2xl relative z-10 space-y-6">
            <span className="font-inter text-[9px] text-[#8b5cf6] font-black uppercase tracking-[0.25em] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 px-2 py-1 rounded">
              Docling Semantic Ingestion
            </span>
            
            <h2 className="font-teko text-[48px] md:text-[60px] text-white leading-none uppercase font-black">
              PARSING Dense Laws Beyond Text
            </h2>
            
            <p className="text-[13.5px] text-[#8e8e9f] leading-relaxed font-light">
              World Cup laws contain spatial diagrams, decision trees, and coordinate tables. Standard text chunking destroys these structural matrices. 
              By leveraging **Docling**, we parse the FIFA Laws of the Game PDF preserving Table structures and cell-coordinate keys. 
              Ask the Ref queries retrieve the exact tables (e.g. card offence matrices) and render them directly next to the AI summaries.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-black/40 border border-[#222232] px-3.5 py-2">
                <FileText size={14} className="text-[#8b5cf6]" />
                <span className="font-mono text-[10px] text-white font-bold">Docling Preserves Table Columns</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/40 border border-[#222232] px-3.5 py-2">
                <Cpu size={14} className="text-[#2b66ff]" />
                <span className="font-mono text-[10px] text-white font-bold">IBM Granite 4.1 Legal Grounding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification & Telemetry Section */}
      <section className="max-w-6xl mx-auto px-6 mt-16 text-center space-y-6 border-t border-[#222232]/50 pt-16">
        <div className="max-w-xl mx-auto space-y-3">
          <h3 className="font-teko text-[32px] md:text-[40px] text-white uppercase font-black tracking-wider">
            AUDIT THE INFRASTRUCTURE LIVE
          </h3>
          <p className="text-[13px] text-[#8e8e9f] leading-relaxed font-light">
            We have created a dedicated diagnostic center for judges to verify Watsonx connectivity, Zod contract parsing errors, laws hashes, and simulated OpenTelemetry tracer performance spans.
          </p>
        </div>
        
        <div className="pt-2">
          <Link 
            href="/judges" 
            className="inline-flex bg-white hover:bg-[#eaeaea] text-black font-teko text-[15px] tracking-widest font-bold px-8 py-3.5 rounded uppercase items-center space-x-2.5 transition-all duration-150 shadow-lg active:scale-95 cursor-pointer"
          >
            <Activity size={14} />
            <span>Open Judges Audit panel</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
