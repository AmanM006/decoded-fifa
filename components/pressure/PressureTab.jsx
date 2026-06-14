"use client";

import React, { useState, useEffect, useRef } from "react";
import { PRESSURE_MOMENTS } from "../../data/moments";
import PressureGauge from "./PressureGauge";
import PressurePentagon from "./PressurePentagon";
import GranitePanel from "../shared/GranitePanel";
import DataLabel from "../shared/DataLabel";
import { queryGraniteAI } from "../../lib/granite";
import { 
  ChevronRight, 
  AlertTriangle, 
  Users, 
  Clock, 
  Trophy, 
  Cpu, 
  Sparkles,
  TrendingUp,
  Volume2
} from "lucide-react";

function DecibelVisualizer({ profile }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = profile === "whistles" ? "#ff3b30" : profile === "drums" ? "#ffd700" : "#00c2a8";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2;
        if (profile === "whistles") {
          y += Math.sin(x * 0.2 + offset) * 12 * (Math.random() > 0.85 ? 1.8 : 0.6);
          y += Math.cos(x * 0.5 - offset) * 4;
        } else if (profile === "drums") {
          y += Math.sin(x * 0.04 + offset) * 16;
          y += Math.sin(x * 0.12 - offset * 2) * 5;
        } else {
          y += Math.sin(x * 0.1 + offset) * 1.5;
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset += profile === "whistles" ? 0.35 : profile === "drums" ? 0.15 : 0.05;
      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [profile]);

  return (
    <div className="bg-black/60 border border-[#222232] rounded-lg p-3 relative overflow-hidden select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[8.5px] text-[#8e8e9f] font-bold uppercase tracking-wider font-inter">Live Acoustic wave</span>
        <span className="text-[8.5px] text-white font-bold font-inter bg-[#222232] px-1.5 py-0.5 rounded uppercase">{profile}</span>
      </div>
      <canvas ref={canvasRef} width="300" height="48" className="w-full h-12 block" />
    </div>
  );
}

export default function PressureTab() {
  const [selectedMoment, setSelectedMoment] = useState(PRESSURE_MOMENTS[0]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState("");

  const [audience, setAudience] = useState("enthusiast");
  const [guardianVerified, setGuardianVerified] = useState(false);
  const [guardianSource, setGuardianSource] = useState("Granite Guardian 4.1");

  // Sandbox Mode States (Option 1)
  const [sandboxMode, setSandboxMode] = useState(false);
  const [sandboxCaps, setSandboxCaps] = useState(55);
  const [sandboxCrowd, setSandboxCrowd] = useState(65000);
  const [sandboxDelay, setSandboxDelay] = useState(150);
  const [sandboxFatigue, setSandboxFatigue] = useState(50);
  const [sandboxComposure, setSandboxComposure] = useState(70);
  const [sandboxClutch, setSandboxClutch] = useState(75);
  const [sandboxVenue, setSandboxVenue] = useState("neutral");
  
  // Acoustic visualizer profile (Option 5)
  const [acousticProfile, setAcousticProfile] = useState("whistles");

  // Helper to compute active values based on Sandbox toggle
  const getActiveData = () => {
    if (!sandboxMode) {
      return {
        player: selectedMoment.player,
        match: selectedMoment.match,
        score: selectedMoment.score,
        outcome: selectedMoment.outcome,
        position: selectedMoment.position,
        team: selectedMoment.team,
        flag: selectedMoment.flag,
        stats: {
          caps: selectedMoment.stats.caps,
          goals: selectedMoment.stats.goals,
          history: selectedMoment.stats.history,
          conversion: selectedMoment.stats.conversion,
          waitTime: selectedMoment.stats.waitTime,
          crowdSize: selectedMoment.stats.crowdSize
        },
        pentagon: selectedMoment.pentagon,
        factors: selectedMoment.factors,
        graniteAnalysis: selectedMoment.graniteAnalysis
      };
    }

    // Dynamic Crucible Score Calculation with Venue modifier
    const delayMins = Math.floor(sandboxDelay / 60);
    const delaySecs = sandboxDelay % 60;
    const delayStr = `${delayMins}:${delaySecs < 10 ? "0" : ""}${delaySecs}`;

    let venuePressure = 0.0;
    if (sandboxVenue === "home") venuePressure = 0.8;
    else if (sandboxVenue === "away") venuePressure = 0.4;

    const computedScore = Math.min(10.0, Math.max(1.0, parseFloat(
      (5.0 + (sandboxDelay / 60) * 0.5 + (sandboxCrowd / 50000) - Math.min(1.0, sandboxCaps / 100) + (sandboxFatigue / 100) * 1.2 + (acousticProfile === "whistles" ? 0.8 : acousticProfile === "drums" ? 0.4 : -0.3) + venuePressure).toFixed(1)
    )));

    const outcome = (sandboxClutch / 10) >= computedScore ? "SCORED" : "MISSED";

    const pentagon = {
      composure: { current: sandboxComposure / 100, career: 0.75 },
      clutch: { current: sandboxClutch / 100, career: 0.70 },
      fatigue: { current: sandboxFatigue / 100, career: 0.30 },
      crowd: { current: sandboxCrowd / 100000, career: 0.40 },
      experience: { current: sandboxCaps / 200, career: 0.60 }
    };

    const factors = [
      { icon: "AlertTriangle", text: `VAR check wait: +${((sandboxDelay / 60) * 0.5).toFixed(1)} pressure` },
      { icon: "Users", text: `Spectator apprehension: +${(sandboxCrowd / 50000).toFixed(1)} pressure` },
      { icon: "Clock", text: `Fatigue offset: +${((sandboxFatigue / 100) * 1.2).toFixed(1)} pressure` },
      { icon: "Trophy", text: `Acoustic loading: ${acousticProfile === "whistles" ? "+0.8" : acousticProfile === "drums" ? "+0.4" : "-0.3"} pressure` }
    ];

    if (sandboxVenue !== "neutral") {
      factors.push({
        icon: "MapPin",
        text: `Venue Context (${sandboxVenue === "home" ? "Home Expectations" : "Hostile Away"}): ${sandboxVenue === "home" ? "+0.8" : "+0.4"} pressure`
      });
    }

    const dynamicAnalysis = `Simulated Player Analysis (Crucible Score: ${computedScore}/10).

With ${sandboxCaps} caps, the experience buffer helps stabilize raw stress. The delay of ${delayStr} minutes under a crowd of ${sandboxCrowd.toLocaleString()} (${acousticProfile.toUpperCase()} environment) creates high cortisol loading.

Fatigue is at ${sandboxFatigue}%, placing strain on leg planting mechanical accuracy. Composure is at ${sandboxComposure}%, and with a clutch rate of ${sandboxClutch}%, our system estimates a ${Math.min(99, Math.max(10, Math.round(sandboxClutch * 0.95 + sandboxComposure * 0.15 - computedScore * 4.5)))}% probability of scoring.

RESULT: ${outcome}.`;

    return {
      player: "Custom Simulation",
      match: "Sandbox Virtual Arena",
      score: computedScore,
      outcome,
      position: "Forward",
      team: "SIM",
      flag: "🤖",
      stats: {
        caps: sandboxCaps,
        goals: Math.round(sandboxCaps * 0.22),
        history: `${computedScore} avg`,
        conversion: `${sandboxClutch}%`,
        waitTime: delayStr,
        crowdSize: sandboxCrowd.toLocaleString()
      },
      pentagon,
      factors,
      graniteAnalysis: dynamicAnalysis
    };
  };

  const active = getActiveData();
  const [aiText, setAiText] = useState(active.graniteAnalysis);

  // Sync AI analysis output when active attributes switch
  useEffect(() => {
    setAiText(active.graniteAnalysis);
  }, [
    selectedMoment,
    sandboxMode,
    sandboxCaps,
    sandboxCrowd,
    sandboxDelay,
    sandboxFatigue,
    sandboxComposure,
    sandboxClutch,
    acousticProfile,
    sandboxVenue
  ]);

  useEffect(() => {
    const updateAudience = () => {
      setAudience(localStorage.getItem("decoded_audience") || "enthusiast");
    };
    updateAudience();
    window.addEventListener("decoded_audience_change", updateAudience);
    return () => window.removeEventListener("decoded_audience_change", updateAudience);
  }, []);

  const handleMomentSelect = (moment) => {
    setSandboxMode(false);
    setSelectedMoment(moment);
  };

  const runIBMAnalysis = async () => {
    setIsAiLoading(true);
    setAiStatus("Constructing stress index context...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAiStatus("Analyzing decibel acoustics data...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAiStatus("Querying IBM Granite 3.0 psychology expert...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    const promptData = {
      player: active.player,
      match: active.match,
      score: active.score,
      outcome: active.outcome,
      stats: active.stats,
      factors: active.factors
    };

    const res = await queryGraniteAI("PRESSURE", promptData, active.graniteAnalysis, audience);
    setAiText(res.text);
    setGuardianVerified(res.guardianVerified);
    setGuardianSource(res.guardianSource);
    setIsAiLoading(false);
  };

  const getBorderColor = (score) => {
    if (score >= 9.0) return "border-[#ff3b30]/35 hover:border-[#ff3b30]";
    if (score >= 7.0) return "border-[#ff6f00]/35 hover:border-[#ff6f00]";
    return "border-[#00c2a8]/35 hover:border-[#00c2a8]";
  };

  const getOutcomeBadge = (outcome) => {
    if (outcome === "SCORED") {
      return (
        <span className="bg-[#00c2a8]/10 text-[#00c2a8] border border-[#00c2a8]/25 text-[10px] font-bold px-2 py-0.5 rounded font-inter">
          SCORED
        </span>
      );
    }
    return (
      <span className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/25 text-[10px] font-bold px-2 py-0.5 rounded font-inter">
        MISSED
      </span>
    );
  };

  return (
    <div className="flex flex-col w-full bg-[#07070a] min-h-screen">
      
      {/* 1. HERO SECTION (Split Dynamic Layout) */}
      <section className="bg-gradient-to-b from-[#07070a] to-[#0f0f15] border-b border-[#222232] py-10 px-4 md:px-12 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side: Select Moment (Editorial Catalog Layout) */}
        <div className="w-full lg:w-[50%] flex flex-col space-y-4 lg:pr-8">
          <h2 className="font-teko text-[44px] md:text-[56px] text-white leading-none tracking-wide uppercase font-black">
            PRESSURE MOMENTS INDEX
          </h2>
          <div className="font-inter text-[11px] font-bold text-[#8e8e9f] tracking-widest uppercase">
            THE AI THAT READS THE HUMAN UNDER STRESS
          </div>
          <p className="font-inter text-[13px] text-[#8e8e9f] leading-relaxed max-w-lg">
            Evaluate high-stress situations. Select a penalty event or activate Sandbox Mode to simulate custom stress variables.
          </p>

          {/* List of high-stakes moments */}
          <div className="space-y-2 mt-4 max-h-[220px] overflow-y-auto pr-1">
            {PRESSURE_MOMENTS.slice(0, 5).map((moment) => {
              const isActive = !sandboxMode && selectedMoment.id === moment.id;
              return (
                <button
                  key={moment.id}
                  onClick={() => handleMomentSelect(moment)}
                  className={`w-full flex items-center justify-between bg-[#0c0c12] rounded-none p-3.5 border transition-all text-left cursor-pointer ${
                    isActive ? "border-[#ffd700] bg-[#15151f]" : "border-[#222232] hover:border-[#44445c]"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="font-teko text-[17px] sm:text-[19px] text-white tracking-wider truncate uppercase font-bold">
                      {moment.player} · {moment.match}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-[#666] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Speedometer Gauge */}
        <div className="w-full lg:w-[50%] flex justify-center items-center mt-8 lg:mt-0">
          <div className={`border rounded-xl p-6 shadow-2xl relative w-full max-w-[360px] transition-all duration-500 ${
            active.score >= 8.0 ? "bg-[#2b0c0c]/80 border-[#ff3b30] animate-[pulse_2.5s_infinite]" : "bg-[#0f0f15] border-[#222232]"
          }`}>
            {active.score >= 8.0 && (
              <div className="absolute top-2 right-2 bg-[#ff3b30] text-white font-teko text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded uppercase animate-bounce z-30 flex items-center">
                <span>CRITICAL PRESSURE</span>
              </div>
            )}
            <PressureGauge
              score={active.score}
              playerName={active.player}
              matchContext={active.match}
            />
          </div>
        </div>

      </section>

      {/* 2. SPECIFIC ANALYSIS BLOCKS */}
      <section className="bg-[#0f0f15] py-10 px-4 md:px-12 border-b border-[#222232]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1400px] mx-auto">
          
          {/* Column 1: Player Card Profile (FUT layout style) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Sandbox toggle widget */}
            <div className="flex items-center justify-between bg-[#15151f] border border-[#222232] rounded-xl p-3 shadow-md">
              <span className="font-teko text-[15px] text-white uppercase tracking-wider font-bold">
                CRUCIBLE STRESS SANDBOX
              </span>
              <input
                type="checkbox"
                checked={sandboxMode}
                onChange={(e) => setSandboxMode(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-[#2b66ff]"
              />
            </div>

            <div className="bg-[#0c0c12] rounded-xl p-5 border border-[#222232] flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex justify-between items-start border-b border-[#222232] pb-3">
                  <div>
                    <h3 className="font-teko text-[28px] text-white leading-none uppercase font-black">
                      {active.flag} {active.player}
                    </h3>
                    <p className="font-inter text-[11px] text-[#8e8e9f] mt-1 font-bold uppercase tracking-wider">
                      {active.position} · {active.team}
                    </p>
                  </div>
                  {getOutcomeBadge(active.outcome)}
                </div>

                {sandboxMode ? (
                  /* Sandbox Sliders controls */
                  <div className="space-y-4 my-4">
                    {/* Experience Caps */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-[#8e8e9f] uppercase mb-1">
                        <span>Player Caps</span>
                        <span className="text-white font-mono">{sandboxCaps} caps</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={sandboxCaps}
                        onChange={(e) => setSandboxCaps(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15151f] rounded appearance-none cursor-pointer accent-[#2b66ff]"
                      />
                    </div>

                    {/* Crowd Size */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-[#8e8e9f] uppercase mb-1">
                        <span>Crowd Size</span>
                        <span className="text-white font-mono">{(sandboxCrowd / 1000).toFixed(0)}k fans</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={sandboxCrowd}
                        onChange={(e) => setSandboxCrowd(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15151f] rounded appearance-none cursor-pointer accent-[#2b66ff]"
                      />
                    </div>

                    {/* Wait delay */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-[#8e8e9f] uppercase mb-1">
                        <span>VAR delay</span>
                        <span className="text-white font-mono">{Math.floor(sandboxDelay / 60)}m {sandboxDelay % 60}s</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="600"
                        step="5"
                        value={sandboxDelay}
                        onChange={(e) => setSandboxDelay(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15151f] rounded appearance-none cursor-pointer accent-[#2b66ff]"
                      />
                    </div>

                    {/* Fatigue */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-[#8e8e9f] uppercase mb-1">
                        <span>Fatigue</span>
                        <span className="text-white font-mono">{sandboxFatigue}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sandboxFatigue}
                        onChange={(e) => setSandboxFatigue(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15151f] rounded appearance-none cursor-pointer accent-[#2b66ff]"
                      />
                    </div>

                    {/* Composure */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-[#8e8e9f] uppercase mb-1">
                        <span>Composure</span>
                        <span className="text-white font-mono">{sandboxComposure}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sandboxComposure}
                        onChange={(e) => setSandboxComposure(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15151f] rounded appearance-none cursor-pointer accent-[#2b66ff]"
                      />
                    </div>

                    {/* Clutch */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-[#8e8e9f] uppercase mb-1">
                        <span>Clutch Rating</span>
                        <span className="text-white font-mono">{sandboxClutch}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sandboxClutch}
                        onChange={(e) => setSandboxClutch(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#15151f] rounded appearance-none cursor-pointer accent-[#2b66ff]"
                      />
                    </div>

                    {/* Match Venue */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-[#8e8e9f] uppercase mb-1.5">
                        <span>Match Venue Context</span>
                      </div>
                      <select
                        value={sandboxVenue}
                        onChange={(e) => setSandboxVenue(e.target.value)}
                        className="w-full bg-[#15151f] text-white border border-[#222232] rounded p-2 text-[11px] font-bold uppercase focus:outline-none focus:border-[#2b66ff] cursor-pointer"
                      >
                        <option value="neutral">Neutral Venue (+0.0)</option>
                        <option value="home">Home Stadium (+0.8 Stress)</option>
                        <option value="away">Hostile Away (+0.4 Stress)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  /* Fut Grid stats (Reference 4) */
                  <div className="grid grid-cols-2 gap-2 my-4">
                    <div className="bg-[#07070a] rounded-lg p-2.5 border border-[#222232]">
                      <span className="font-teko text-[24px] text-white leading-none block font-black">
                        {active.stats.caps}
                      </span>
                      <span className="text-[8.5px] text-[#8e8e9f] uppercase font-inter tracking-wider font-bold block mt-0.5">
                        Caps
                      </span>
                    </div>
                    <div className="bg-[#07070a] rounded-lg p-2.5 border border-[#222232]">
                      <span className="font-teko text-[24px] text-[#ffd700] leading-none block font-black">
                        {active.stats.goals}
                      </span>
                      <span className="text-[8.5px] text-[#8e8e9f] uppercase font-inter tracking-wider font-bold block mt-0.5">
                        Goals
                      </span>
                    </div>
                    <div className="bg-[#07070a] rounded-lg p-2.5 border border-[#222232]">
                      <span className="font-teko text-[24px] text-white leading-none block font-black">
                        {active.stats.history}
                      </span>
                      <span className="text-[8.5px] text-[#8e8e9f] uppercase font-inter tracking-wider font-bold block mt-0.5">
                        Avg Stress
                      </span>
                    </div>
                    <div className="bg-[#07070a] rounded-lg p-2.5 border border-[#222232]">
                      <span className="font-teko text-[24px] text-[#ffd700] leading-none block font-black">
                        {active.stats.conversion}
                      </span>
                      <span className="text-[8.5px] text-[#8e8e9f] uppercase font-inter tracking-wider font-bold block mt-0.5">
                        Clutch rate
                      </span>
                    </div>
                    <div className="bg-[#07070a] rounded-lg p-2.5 border border-[#222232]">
                      <span className="font-teko text-[24px] text-white leading-none block font-black">
                        {active.stats.waitTime}
                      </span>
                      <span className="text-[8.5px] text-[#8e8e9f] uppercase font-inter tracking-wider font-bold block mt-0.5">
                        Wait delay
                      </span>
                    </div>
                    <div className="bg-[#07070a] rounded-lg p-2.5 border border-[#222232]">
                      <span className="font-teko text-[24px] text-white leading-none block font-black">
                        {active.stats.crowdSize}
                      </span>
                      <span className="text-[8.5px] text-[#8e8e9f] uppercase font-inter tracking-wider font-bold block mt-0.5">
                        Crowd size
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Stress Factors */}
              <div className="border-t border-[#222232] pt-4 mt-2">
                <DataLabel className="mb-2">Crucible modifiers</DataLabel>
                <div className="space-y-1.5">
                  {active.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] text-[#ff6f00] font-inter">
                      <AlertTriangle size={12} className="shrink-0" />
                      <span className="leading-tight font-semibold">{factor.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Stress Radar Profile (Pentagon) */}
          <div className="lg:col-span-5 bg-[#0c0c12] rounded-xl p-5 border border-[#222232]">
            <PressurePentagon pentagonData={active.pentagon} />
          </div>

          {/* Column 3: IBM Granite explainers */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            
            {/* Decibel visualizer Presets (Option 5) */}
            <div className="bg-[#0c0c12] rounded-xl p-4 border border-[#222232] space-y-3 shrink-0">
              <DecibelVisualizer profile={acousticProfile} />
              
              <div className="grid grid-cols-3 gap-1">
                {["whistles", "drums", "silence"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setAcousticProfile(p)}
                    className={`py-1.5 text-[10px] font-teko uppercase tracking-widest font-black border transition-all cursor-pointer ${
                      acousticProfile === p
                        ? "bg-[#2b66ff] border-[#2b66ff] text-white"
                        : "bg-[#15151f] border-[#222232] text-[#8e8e9f] hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <GranitePanel
              title="IBM GRANITE ANALYSIS"
              icon={Cpu}
              iconColor="#2b66ff"
              text={aiText}
              isLoading={isAiLoading}
              status={aiStatus}
              className="flex-grow min-h-[220px] border-[#222232]"
              badgeText="watsonx.ai psychology"
              guardianVerified={guardianVerified}
              guardianSource={guardianSource}
            />

            <button
              onClick={runIBMAnalysis}
              disabled={isAiLoading}
              className="bg-[#2b66ff] hover:bg-[#1a4eff] disabled:opacity-50 text-white font-teko text-[16px] tracking-wider uppercase h-12 w-full rounded-none flex items-center justify-center space-x-2 border border-black shadow active:scale-[0.98] transition-all cursor-pointer font-bold select-none"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Verify with IBM Granite</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. HISTORICAL TIMELINES GRID (FUT Hall of Fame) */}
      <section className="py-12 px-4 md:px-12 bg-[#07070a] max-w-[1400px] mx-auto w-full">
        <div className="flex items-center justify-between border-b border-[#222232] pb-3.5 mb-6">
          <h2 className="font-teko text-[32px] text-white tracking-widest uppercase leading-none font-black">
            PRESSURE HALL OF FAME
          </h2>
          <div className="flex items-center space-x-2">
            <TrendingUp size={14} className="text-[#ffd700]" />
            <span className="font-inter text-[10px] text-[#8e8e9f] tracking-widest font-bold uppercase">
              HISTORICAL DATA SCALING
            </span>
          </div>
        </div>

        {/* FUT Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRESSURE_MOMENTS.slice(0, 6).map((moment) => {
            const isCurrent = !sandboxMode && moment.id === selectedMoment.id;
            return (
              <div
                key={moment.id}
                onClick={() => handleMomentSelect(moment)}
                className={`decoded-card p-5 cursor-pointer flex flex-col justify-between space-y-4 border transition-all duration-300 ${
                  isCurrent ? "border-[#ffd700] bg-[#12121e]" : getBorderColor(moment.score)
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-[#15151f] px-2.5 py-0.5 border border-[#222232] text-[9px] font-inter font-bold text-[#8e8e9f] uppercase tracking-wider">
                      {moment.match.split(" · ")[1] || "FINAL"}
                    </span>
                    {getOutcomeBadge(moment.outcome)}
                  </div>

                  <h3 className="font-teko text-[24px] text-white tracking-wider leading-none mt-2 uppercase font-bold">
                    {moment.flag} {moment.player}
                  </h3>
                  <p className="text-[10px] text-[#8e8e9f] font-inter uppercase font-bold mt-1 tracking-wider">
                    {moment.match.split(" · ")[0]}
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <p className="font-inter text-[11.5px] text-[#8e8e9f] leading-normal line-clamp-2 pr-3 flex-grow font-semibold">
                    {moment.graniteAnalysis.split("\n\n")[1] || moment.graniteAnalysis.slice(0, 80) + "..."}
                  </p>
                  <div className="flex flex-col items-end shrink-0 select-none">
                    <span className="font-teko text-[36px] leading-none text-white tracking-tighter font-black">
                      {moment.score.toFixed(1)}
                    </span>
                    <span className="font-inter text-[8px] text-[#8e8e9f] uppercase tracking-wider font-bold">
                      CRUCIBLE
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
