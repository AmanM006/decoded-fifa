"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Target, Brain, Scale, Trophy, BookOpen, Heart, Cpu, Database, Zap } from "lucide-react";

// --- ANIMATION HOOKS & UTILS ---

const INSIGHTS = [
  "Mbappé's Crucible Score of 9.2 rivals Zidane's 2006 Final penalty sequence.",
  "Argentina's 2022 corner tactics had a 34% higher zone-entry rate than France.",
  "The Griezmann offside margin was 2.3cm — the closest in World Cup history.",
  "Penalty takers who wait >60s face a 19% higher cortisol spike per IBM Granite analysis.",
  "StatsBomb data shows 73% of World Cup goals from corners are won in Zone 6.",
];

function useCountUp(target, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

export default function Hero() {
  const [animate, setAnimate] = useState(false);
  const [insightIdx, setInsightIdx] = useState(0);
  const [insightVisible, setInsightVisible] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Ticker interval
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightVisible(false);
      setTimeout(() => {
        setInsightIdx((i) => (i + 1) % INSIGHTS.length);
        setInsightVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Canvas Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let animationFrameId;

    // Nodes setup
    const numNodes = 35;
    const nodes = Array.from({ length: numNodes }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(0, 194, 168, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
    };

    const render = () => {
      ctx.fillStyle = "#07070a";
      ctx.fillRect(0, 0, width, height);
      drawGrid();

      // Update & draw nodes
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulsePhase += 0.05;
        const currentRadius = node.radius + Math.sin(node.pulsePhase) * 1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius > 0 ? currentRadius : 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 194, 168, 0.8)";
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < numNodes; j++) {
          const other = nodes[j];
          const distSq = (node.x - other.x)**2 + (node.y - other.y)**2;
          const maxDist = 120;
          if (distSq < maxDist * maxDist) {
            const opacity = 1 - Math.sqrt(distSq) / maxDist;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 194, 168, ${opacity * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Stats Counters
  const eventsAnalyzed = useCountUp(14258, 2000, animate);
  const modelsDeployed = useCountUp(5, 1200, animate);
  const activeQueries = useCountUp(89, 1500, animate);

  return (
    <section className="min-h-screen bg-[#07070a] flex flex-col lg:flex-row items-stretch select-none overflow-hidden relative pt-[52px]">
      
      {/* ── LEFT COLUMN: Dashboard Content ── */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center p-8 sm:p-12 md:p-20 relative z-20">
        <div className="max-w-xl space-y-7">
          
          {/* Badge */}
          <div className={`transition-all duration-700 delay-[0ms] ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <span className="inline-flex items-center space-x-1.5 bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-[9px] font-inter font-black uppercase tracking-[0.2em] px-3 py-1 rounded">
              <Trophy size={9} />
              <span>FIFA World Cup 2026 · AI Platform</span>
            </span>
          </div>

          {/* Headline with pseudo-glitch */}
          <div className="space-y-1 relative group cursor-default">
            <h1
              className={`font-teko text-[70px] sm:text-[100px] leading-[0.8] text-white tracking-tighter uppercase font-black transition-all duration-700 delay-100 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              DECODED
            </h1>
            <h2
              className={`font-teko text-[16px] sm:text-[20px] text-[#00c2a8] uppercase tracking-[0.2em] font-semibold transition-all duration-700 delay-200 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Tactical AI &amp; Law Explainers
            </h2>
          </div>

          {/* Intro Text */}
          <p
            className={`font-inter text-[13px] sm:text-[15px] text-[#8e8e9f] leading-relaxed transition-all duration-700 delay-300 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Tactics, pressure, and VAR decisions — finally explained by AI. 
            Powered by IBM Granite, Docling, and StatsBomb open data to bring clarity to 6 billion fans.
          </p>

          {/* Live AI Insight Ticker */}
          <div
            className={`transition-all duration-700 delay-[350ms] bg-[#0c0c12] border border-[#1a1a2e] rounded-xl p-4 relative overflow-hidden ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2a8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c2a8]"></span>
              </span>
              <span className="font-inter text-[9px] font-black uppercase tracking-[0.2em] text-[#00c2a8]">LIVE AI INSIGHT</span>
              <span className="ml-auto font-inter text-[8px] text-[#44445c] font-bold uppercase tracking-wider">IBM Granite 3.3</span>
            </div>
            <p
              className="font-inter text-[12px] sm:text-[13px] text-[#c8c8d8] leading-snug font-medium transition-opacity duration-400 min-h-[40px]"
              style={{ opacity: insightVisible ? 1 : 0 }}
            >
              &ldquo;{INSIGHTS[insightIdx]}&rdquo;
            </p>
            {/* Progress dots */}
            <div className="flex space-x-1.5 mt-3">
              {INSIGHTS.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    i === insightIdx ? "w-4 bg-[#00c2a8]" : "w-1.5 bg-[#222232]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 5 Feature Cards */}
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 gap-2 transition-all duration-700 delay-[400ms] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/tactics" className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#00c2a8]/40 hover:-translate-y-1 group">
              <Target size={16} className="text-[#00c2a8] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">Tactics AI</span>
            </Link>
            <Link href="/pressure" className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#ffd700]/40 hover:-translate-y-1 group">
              <Brain size={16} className="text-[#ffd700] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">Stress DNA</span>
            </Link>
            <Link href="/vardict" className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#ff3b30]/40 hover:-translate-y-1 group">
              <Scale size={16} className="text-[#ff3b30] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">VARdict</span>
            </Link>
            <Link href="/laws" className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#2b66ff]/40 hover:-translate-y-1 group">
              <BookOpen size={16} className="text-[#2b66ff] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">Ask Ref</span>
            </Link>
            <Link href="/drama" className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#ff3b30]/40 hover:-translate-y-1 group">
              <Heart size={16} className="text-[#ff3b30] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">Drama</span>
            </Link>
          </div>

          {/* CTA Row */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-500 pt-2 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/tactics"
              className="inline-flex bg-white hover:bg-[#00c2a8] text-black hover:text-white font-teko text-[16px] tracking-widest font-bold px-8 py-3 rounded-full uppercase items-center space-x-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,194,168,0)] hover:shadow-[0_0_20px_rgba(0,194,168,0.4)] active:scale-95 group"
            >
              <span>ENTER THE PLATFORM</span>
              <span className="text-[14px] font-sans group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <div className="flex items-center space-x-4 ml-2">
              <div className="flex flex-col">
                <span className="font-teko text-[22px] text-white font-bold leading-none">{eventsAnalyzed.toLocaleString()}</span>
                <span className="font-inter text-[8px] text-[#8e8e9f] uppercase tracking-wider font-bold">Events Parsed</span>
              </div>
              <div className="w-px h-6 bg-[#222232]"></div>
              <div className="flex flex-col">
                <span className="font-teko text-[22px] text-white font-bold leading-none">{modelsDeployed}</span>
                <span className="font-inter text-[8px] text-[#8e8e9f] uppercase tracking-wider font-bold">AI Modules</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── RIGHT COLUMN: Cyber-Tactical Grid ── */}
      <div className="hidden lg:block w-[50%] relative overflow-hidden bg-[#050508] border-l border-[#1a1a2e] z-10">
        
        {/* Background Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

        {/* Right Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent z-10"></div>

        {/* Floating Tech Badges / Widgets */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          {/* SAOT Widget */}
          <div className={`absolute top-24 right-16 bg-black/60 backdrop-blur-md border border-[#ff3b30]/30 p-4 rounded-xl shadow-2xl transition-all duration-[1s] delay-700 ${
            animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Cpu size={12} className="text-[#ff3b30]" />
              <span className="text-[9px] text-[#ff3b30] font-inter font-black uppercase tracking-widest">SAOT Engine</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center space-x-8 text-[10px] font-mono">
                <span className="text-[#8e8e9f]">Mesh Calibration</span>
                <span className="text-[#00c2a8]">OK</span>
              </div>
              <div className="flex justify-between items-center space-x-8 text-[10px] font-mono">
                <span className="text-[#8e8e9f]">Offside Margin</span>
                <span className="text-white">2.3cm</span>
              </div>
            </div>
          </div>

          {/* Data Processing Widget */}
          <div className={`absolute bottom-32 left-12 bg-black/60 backdrop-blur-md border border-[#2b66ff]/30 p-4 rounded-xl shadow-2xl transition-all duration-[1s] delay-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Database size={12} className="text-[#2b66ff]" />
              <span className="text-[9px] text-[#2b66ff] font-inter font-black uppercase tracking-widest">StatsBomb Feed</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-[#111118] h-1.5 rounded-full overflow-hidden w-24">
                  <div className="bg-[#2b66ff] w-[75%] h-full"></div>
                </div>
                <span className="text-[9px] font-mono text-[#8e8e9f]">75%</span>
              </div>
              <div className="text-[9px] font-mono text-[#8e8e9f] mt-1">Ingesting match telemetry...</div>
            </div>
          </div>

          {/* RAG Widget */}
          <div className={`absolute top-[45%] right-24 bg-black/60 backdrop-blur-md border border-[#ffd700]/30 p-3 rounded-xl shadow-2xl transition-all duration-[1s] delay-[1300ms] ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}>
            <div className="flex items-center space-x-2">
              <Zap size={12} className="text-[#ffd700]" />
              <div className="flex flex-col">
                <span className="text-[9px] text-[#ffd700] font-inter font-black uppercase tracking-widest">Docling RAG</span>
                <span className="text-[8px] font-mono text-[#8e8e9f]">Law 11 / Offside</span>
              </div>
            </div>
          </div>

          {/* Center Graphic Title */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-[1.5s] delay-300 ${
            animate ? "opacity-30 blur-0 scale-100" : "opacity-0 blur-xl scale-110"
          }`}>
            <div className="font-teko text-[180px] leading-[0.75] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#050508] tracking-tighter">
              2026
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
