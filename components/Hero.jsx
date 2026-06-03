"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Target, Brain, Scale, Trophy, BookOpen, Heart, Cpu, Network } from "lucide-react";

// --- ANIMATION HOOKS & UTILS ---
const INSIGHTS = [
  "[SYS] Mbappé Crucible Score 9.2 // Outperforms Zidane '06",
  "[SYS] ARG Corner Entry Rate +34% // Exploit Zone 6 detected",
  "[SAOT] Margin: 2.3cm // Griezmann Offside Call Verified",
  "[BIO] Cortisol spike +19% detected on >60s penalty wait",
  "[DATA] Ingesting StatsBomb Telemetry // 14,258 events mapped",
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
  
  // Mouse tracking for 3D parallax
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const currentMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Ticker interval
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightVisible(false);
      setTimeout(() => {
        setInsightIdx((i) => (i + 1) % INSIGHTS.length);
        setInsightVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ─── 3D ISOMETRIC PITCH CANVAS RENDERER ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationFrameId;

    // 3D Nodes (Players)
    const numNodes = 22;
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
      x: (Math.random() - 0.5) * 800, // 3D world X (-400 to 400)
      z: (Math.random() - 0.5) * 1200, // 3D world Z (depth)
      y: Math.random() * 50 + 10,     // 3D world Y (height off ground)
      vx: (Math.random() - 0.5) * 1.5,
      vz: (Math.random() - 0.5) * 1.5,
      team: i < 11 ? "#00c2a8" : "#ff3b30",
      pulse: Math.random() * Math.PI * 2
    }));

    // Math utils for 3D projection
    const project = (x, y, z, pitchX, pitchY) => {
      // 1. Rotation around X axis (tilt)
      const cosX = Math.cos(pitchX);
      const sinX = Math.sin(pitchX);
      let y1 = y * cosX - z * sinX;
      let z1 = y * sinX + z * cosX;

      // 2. Rotation around Y axis (pan)
      const cosY = Math.cos(pitchY);
      const sinY = Math.sin(pitchY);
      let x2 = x * cosY + z1 * sinY;
      let z2 = -x * sinY + z1 * cosY;
      let y2 = y1;

      // 3. Perspective projection
      const fov = 800;
      const viewerZ = 1200;
      const scale = fov / (viewerZ + z2);

      return {
        x: x2 * scale + width / 2,
        y: -y2 * scale + height / 2 + 100, // Offset down slightly
        scale: scale,
        z: z2 // for depth sorting
      };
    };

    const render = () => {
      // Smooth mouse interpolation
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;

      ctx.fillStyle = "#030305";
      ctx.fillRect(0, 0, width, height);

      // Camera angles based on mouse
      const rotX = 1.2 - currentMouse.current.y * 0.4; // Tilt (0.8 to 1.2 radians)
      const rotY = (currentMouse.current.x - 0.5) * 0.6; // Pan (-0.3 to 0.3 rad)

      // Draw Pitch Ground Grid
      ctx.lineWidth = 1;
      const gridSteps = 14;
      const pitchW = 1000;
      const pitchL = 1500;
      
      // Ground plane passes
      for (let pass = 0; pass < 2; pass++) {
        ctx.strokeStyle = pass === 0 ? "rgba(43, 102, 255, 0.08)" : "rgba(0, 194, 168, 0.15)";
        if (pass === 1) ctx.globalCompositeOperation = "screen";

        // Vertical lines
        for (let i = 0; i <= gridSteps; i++) {
          const gx = -pitchW/2 + (pitchW/gridSteps) * i;
          const p1 = project(gx, 0, -pitchL/2, rotX, rotY);
          const p2 = project(gx, 0, pitchL/2, rotX, rotY);
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
        // Horizontal lines
        for (let i = 0; i <= gridSteps; i++) {
          const gz = -pitchL/2 + (pitchL/gridSteps) * i;
          const p1 = project(-pitchW/2, 0, gz, rotX, rotY);
          const p2 = project(pitchW/2, 0, gz, rotX, rotY);
          ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";

      // Draw Center Circle & Penalty Boxes (Faux 3D)
      ctx.strokeStyle = "rgba(43, 102, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for(let a=0; a<=Math.PI*2; a+=0.1) {
        const p = project(Math.cos(a)*150, 0, Math.sin(a)*150, rotX, rotY);
        if(a===0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Update and project nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.z += n.vz;
        if(n.x > pitchW/2 || n.x < -pitchW/2) n.vx *= -1;
        if(n.z > pitchL/2 || n.z < -pitchL/2) n.vz *= -1;
        
        // Bobbing effect
        n.pulse += 0.05;
        n.y = 30 + Math.sin(n.pulse) * 15;
        
        n.proj = project(n.x, n.y, n.z, rotX, rotY);
        n.projGround = project(n.x, 0, n.z, rotX, rotY);
      });

      // Sort nodes by depth (z-index in 3D)
      nodes.sort((a,b) => b.proj.z - a.proj.z);

      // Draw Connections (Passing network)
      ctx.lineWidth = 1;
      for(let i=0; i<nodes.length; i++) {
        for(let j=i+1; j<nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx*dx + dz*dz);
          if (dist < 250 && nodes[i].team === nodes[j].team) {
            const opacity = (1 - dist/250) * 0.4;
            ctx.strokeStyle = `${nodes[i].team}${Math.floor(opacity*255).toString(16).padStart(2,'0')}`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].proj.x, nodes[i].proj.y);
            ctx.lineTo(nodes[j].proj.x, nodes[j].proj.y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach(n => {
        if(n.proj.scale < 0) return; // Behind camera
        
        // Ground shadow
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.beginPath();
        ctx.ellipse(n.projGround.x, n.projGround.y, 8*n.proj.scale, 4*n.proj.scale, 0, 0, Math.PI*2);
        ctx.fill();

        // Vertical drop line to ground
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath(); ctx.moveTo(n.proj.x, n.proj.y); ctx.lineTo(n.projGround.x, n.projGround.y); ctx.stroke();

        // Node circle
        ctx.fillStyle = n.team;
        ctx.beginPath();
        ctx.arc(n.proj.x, n.proj.y, 4 * n.proj.scale, 0, Math.PI*2);
        ctx.fill();

        // Glowing aura
        const gradient = ctx.createRadialGradient(n.proj.x, n.proj.y, 0, n.proj.x, n.proj.y, 15 * n.proj.scale);
        gradient.addColorStop(0, `${n.team}88`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.proj.x, n.proj.y, 15 * n.proj.scale, 0, Math.PI*2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Stats Counters
  const eventsAnalyzed = useCountUp(14258, 2000, animate);
  const computeNodes = useCountUp(284, 1500, animate);

  return (
    <section className="min-h-screen bg-[#030305] flex items-center justify-center select-none overflow-hidden relative">
      
      {/* ── BACKGROUND 3D CANVAS ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* ── VIGNETTE / SHADING ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030305_100%)] z-10 pointer-events-none opacity-80" />

      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col justify-center h-full pt-[52px] pointer-events-none">
        
        {/* Massive Glitch Typography */}
        <div className="w-full relative">
          
          <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[100ms] ${
            animate ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-12 scale-95 blur-md"
          }`}>
            <span className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-xl border border-[#00c2a8]/30 text-[#00c2a8] text-[9px] font-mono font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6 pointer-events-auto">
              <Network size={10} />
              <span>System Online // FIFA 2026 Core</span>
            </span>
          </div>

          <h1 className={`font-teko text-[100px] sm:text-[160px] lg:text-[220px] leading-[0.75] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
            animate ? "opacity-100 translate-x-0 blur-0" : "opacity-0 -translate-x-12 blur-lg"
          }`}
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
            DECODED
          </h1>
          
          <h2 className={`font-teko text-[20px] sm:text-[28px] lg:text-[36px] text-[#2b66ff] uppercase tracking-[0.25em] font-semibold mt-2 transition-all duration-1000 delay-[350ms] ${
            animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            Advanced Tactical AI & Law Analysis
          </h2>
        </div>

        {/* Dynamic Data Row */}
        <div className="mt-12 flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-8 pointer-events-auto">
          
          {/* Action Area */}
          <div className="flex flex-col space-y-6">
            <p className={`font-inter text-[14px] sm:text-[16px] text-[#8e8e9f] max-w-md leading-relaxed transition-all duration-1000 delay-500 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Tactics, pressure, and VAR decisions completely stripped down and explained by Watsonx.ai and StatsBomb open data.
            </p>
            
            <div className={`flex items-center space-x-4 transition-all duration-1000 delay-[600ms] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <Link
                href="/tactics"
                className="group relative inline-flex items-center justify-center bg-white text-black font-teko text-[18px] tracking-widest font-bold px-10 py-3.5 rounded-sm uppercase transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#00c2a8] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center space-x-2">
                  <span>Enter Platform</span>
                  <span className="font-sans text-[14px] group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Glassmorphic Ticker & Stats */}
          <div className={`flex flex-col space-y-4 w-full lg:w-[450px] transition-all duration-1000 delay-[700ms] ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            
            {/* Ticker */}
            <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-lg p-4 shadow-2xl relative overflow-hidden group hover:border-[#2b66ff]/50 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#2b66ff]"></div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b66ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2b66ff]"></span>
                </span>
                <span className="font-mono text-[9px] text-[#2b66ff] font-bold uppercase tracking-[0.2em]">Live Telemetry</span>
              </div>
              <p className="font-mono text-[11px] text-[#c8c8d8] leading-relaxed min-h-[36px]" style={{ opacity: insightVisible ? 1 : 0, transition: "opacity 0.3s" }}>
                {INSIGHTS[insightIdx]}
              </p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-lg p-3">
                <div className="font-teko text-[32px] text-white leading-none font-bold">{eventsAnalyzed.toLocaleString()}</div>
                <div className="font-mono text-[8px] text-[#8e8e9f] uppercase tracking-widest mt-1">Events Parsed</div>
              </div>
              <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-lg p-3">
                <div className="font-teko text-[32px] text-white leading-none font-bold">{computeNodes}</div>
                <div className="font-mono text-[8px] text-[#8e8e9f] uppercase tracking-widest mt-1">Active AI Nodes</div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Feature Navigation */}
        <div className={`mt-16 border-t border-white/10 pt-6 flex flex-wrap gap-4 transition-all duration-1000 delay-[900ms] pointer-events-auto ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {[
            { name: "Tactics", icon: Target, color: "#00c2a8", link: "/tactics" },
            { name: "Stress DNA", icon: Brain, color: "#ffd700", link: "/pressure" },
            { name: "VARdict", icon: Scale, color: "#ff3b30", link: "/vardict" },
            { name: "Ask Ref", icon: BookOpen, color: "#2b66ff", link: "/laws" },
            { name: "Drama", icon: Heart, color: "#ff3b30", link: "/drama" },
          ].map((f, i) => (
            <Link key={f.name} href={f.link} className="flex items-center space-x-2 text-[#8e8e9f] hover:text-white transition-colors group">
              <f.icon size={13} style={{ color: f.color }} className="group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[14px] uppercase tracking-widest">{f.name}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
