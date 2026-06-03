"use client";

import React from "react";
import { Cpu, Database, FileText, Target, Brain, Scale, Zap, ArrowRight, Github, Globe } from "lucide-react";

const STACK = [
  {
    icon: Cpu,
    color: "#1565c0",
    bg: "#0a2a6e",
    name: "IBM Granite 3.3",
    role: "AI Reasoning Engine",
    desc: "granite-3-3-8b-instruct via watsonx.ai generates all tactical, psychological, and legal explanations in natural language.",
    badge: "via watsonx.ai",
  },
  {
    icon: FileText,
    color: "#8b5cf6",
    bg: "#2d1b69",
    name: "Docling",
    role: "Document Intelligence",
    desc: "FIFA Laws of the Game (Laws 11, 12, 14) are parsed by Docling into structured JSON, enabling a Retrieval-Augmented Generation pipeline for VAR decision analysis.",
    badge: "RAG pipeline",
  },
  {
    icon: Database,
    color: "#00c2a8",
    bg: "#002a25",
    name: "StatsBomb Open Data",
    role: "Match Data Source",
    desc: "38 World Cup matches of event-level data — every pass, shot, corner, and pressure event — freely available on GitHub. Powers the Tactics canvas simulation.",
    badge: "38 WC matches",
  },
];

const FEATURES = [
  {
    icon: Target,
    color: "#00c2a8",
    href: "/tactics",
    title: "Tactics AI",
    desc: "Canvas-rendered set piece simulations with IBM Granite tactical breakdowns. Select any corner kick from 5 World Cup finals and watch the ball flight and player positioning reconstruct in real time.",
  },
  {
    icon: Brain,
    color: "#ffd700",
    href: "/pressure",
    title: "Pressure DNA",
    desc: "The Crucible Score model quantifies psychological pressure using caps, goals, crowd size, wait time, and environmental modifiers. IBM Granite then explains the psychology behind each penalty moment.",
  },
  {
    icon: Scale,
    color: "#ff3b30",
    href: "/vardict",
    title: "VARdict",
    desc: "Canvas-accurate FIFA offside line reconstruction with Docling-parsed law citations. IBM Granite cross-references Law 11, 12, or 14 to explain each controversial decision in legal detail.",
  },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-[#07070a] pt-[52px] font-inter">

      {/* Hero */}
      <section className="border-b border-[#222232] px-6 md:px-16 py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center space-x-1.5 bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded mb-6">
            <Zap size={9} />
            <span>June Innovation Challenge · IBM × Soccer × AI</span>
          </span>
          <h1 className="font-teko text-[64px] md:text-[90px] text-white leading-none tracking-tighter uppercase font-black mb-4">
            HOW IT WORKS
          </h1>
          <p className="text-[15px] text-[#8e8e9f] leading-relaxed max-w-2xl">
            DECODED is a World Cup AI explainability platform that makes three historically opaque areas of football — set piece tactics, psychological pressure, and VAR decisions — finally understandable to every fan.
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="border-b border-[#222232] px-6 md:px-16 py-12">
        <div className="max-w-5xl">
          <div className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-[#8e8e9f] mb-6">SYSTEM ARCHITECTURE</div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            {/* Data Sources */}
            <div className="md:col-span-1 space-y-2">
              <div className="text-[9px] font-black text-[#8e8e9f] uppercase tracking-wider mb-3">Data Layer</div>
              <div className="bg-[#0f0f15] border border-[#222232] rounded-lg p-3">
                <Database size={14} color="#00c2a8" />
                <div className="font-teko text-[13px] text-white mt-1">StatsBomb</div>
                <div className="text-[9px] text-[#555]" >Event Data</div>
              </div>
              <div className="bg-[#0f0f15] border border-[#222232] rounded-lg p-3">
                <FileText size={14} color="#8b5cf6" />
                <div className="font-teko text-[13px] text-white mt-1">FIFA Laws PDF</div>
                <div className="text-[9px] text-[#555]">via Docling</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center">
              <ArrowRight size={20} color="#333" />
            </div>

            {/* Processing */}
            <div className="md:col-span-1 space-y-2">
              <div className="text-[9px] font-black text-[#8e8e9f] uppercase tracking-wider mb-3">Processing</div>
              <div className="bg-[#0a1a3a] border border-[#1565c0]/30 rounded-lg p-3">
                <Cpu size={14} color="#1565c0" />
                <div className="font-teko text-[13px] text-white mt-1">Granite 3.3</div>
                <div className="text-[9px] text-[#555]">8B Instruct</div>
              </div>
              <div className="bg-[#0f0f15] border border-[#333] rounded-lg p-3">
                <Zap size={14} color="#ffd700" />
                <div className="font-teko text-[13px] text-white mt-1">Docling RAG</div>
                <div className="text-[9px] text-[#555]">Law Retrieval</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center">
              <ArrowRight size={20} color="#333" />
            </div>

            {/* Output */}
            <div className="md:col-span-1 space-y-2">
              <div className="text-[9px] font-black text-[#8e8e9f] uppercase tracking-wider mb-3">Output</div>
              <div className="bg-[#0f0f15] border border-[#00c2a8]/20 rounded-lg p-3">
                <Target size={14} color="#00c2a8" />
                <div className="font-teko text-[13px] text-white mt-1">Tactics</div>
                <div className="text-[9px] text-[#555]">Canvas + AI</div>
              </div>
              <div className="bg-[#0f0f15] border border-[#ffd700]/20 rounded-lg p-3">
                <Brain size={14} color="#ffd700" />
                <div className="font-teko text-[13px] text-white mt-1">Pressure</div>
                <div className="text-[9px] text-[#555]">Crucible Score</div>
              </div>
              <div className="bg-[#0f0f15] border border-[#ff3b30]/20 rounded-lg p-3">
                <Scale size={14} color="#ff3b30" />
                <div className="font-teko text-[13px] text-white mt-1">VARdict</div>
                <div className="text-[9px] text-[#555]">Law + Canvas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-b border-[#222232] px-6 md:px-16 py-12">
        <div className="max-w-5xl">
          <div className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-[#8e8e9f] mb-6">CORE TECHNOLOGY STACK</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STACK.map((s) => (
              <div key={s.name} className="bg-[#0f0f15] border border-[#222232] rounded-xl p-6 hover:border-[#333] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: s.bg + "33" }}>
                    <s.icon size={20} color={s.color} />
                  </div>
                  <span className="text-[8.5px] font-inter font-bold uppercase tracking-widest px-2 py-0.5 rounded border" style={{ color: s.color, borderColor: s.color + "40", backgroundColor: s.bg + "22" }}>
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-teko text-[22px] text-white tracking-wider uppercase leading-none">{s.name}</h3>
                <div className="text-[9.5px] font-inter font-bold uppercase tracking-wider mt-0.5 mb-3" style={{ color: s.color }}>{s.role}</div>
                <p className="text-[12px] text-[#8e8e9f] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[#222232] px-6 md:px-16 py-12">
        <div className="max-w-5xl">
          <div className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-[#8e8e9f] mb-6">PLATFORM FEATURES</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <a key={f.href} href={f.href} className="bg-[#0f0f15] border border-[#222232] rounded-xl p-6 hover:border-[#333] transition-all group block">
                <f.icon size={22} color={f.color} className="mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-teko text-[22px] text-white tracking-wider uppercase leading-none mb-2">{f.title}</h3>
                <p className="text-[12px] text-[#8e8e9f] leading-relaxed">{f.desc}</p>
                <div className="flex items-center space-x-1 mt-4" style={{ color: f.color }}>
                  <span className="text-[10px] font-inter font-bold uppercase tracking-wider">Explore</span>
                  <ArrowRight size={10} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WC 2026 Vision */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-3xl">
          <div className="bg-gradient-to-r from-[#0a2a6e]/40 to-[#00c2a8]/10 border border-[#1565c0]/20 rounded-2xl p-8">
            <span className="inline-flex items-center space-x-1.5 bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded mb-4">
              <Zap size={9} />
              <span>Coming Soon · World Cup 2026</span>
            </span>
            <h2 className="font-teko text-[44px] text-white leading-none tracking-tighter uppercase font-black mb-3">
              DECODED GOES LIVE
            </h2>
            <p className="text-[13px] text-[#8e8e9f] leading-relaxed">
              DECODED will analyze every match of FIFA World Cup 2026 in real time — streaming IBM Granite insights as goals happen, VAR checks begin, and penalty shootouts unfold. Every moment, decoded.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
