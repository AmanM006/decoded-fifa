"use client";

import React, { useState, useEffect } from "react";
import { VAR_INCIDENTS } from "../../data/incidents";
import VARCanvas from "./VARCanvas";
import VerdictCard from "./VerdictCard";
import GranitePanel from "../shared/GranitePanel";
import DataLabel from "../shared/DataLabel";
import LimbTrackingHUD from "./LimbTrackingHUD";
import { streamGraniteAI, queryGraniteAI } from "../../lib/granite";
import { 
  AlertOctagon, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  Scale, 
  Camera, 
  Fingerprint, 
  Info,
  Cpu,
  AlertTriangle
} from "lucide-react";

export default function VardictTab() {
  const [selectedIncident, setSelectedIncident] = useState(VAR_INCIDENTS[0]);
  const [showOffsideLine, setShowOffsideLine] = useState(true);
  const [showCameras, setShowCameras] = useState(true);
  const [viewMode, setViewMode] = useState("MATCH"); // MATCH or BODY_PART

  const [aiText, setAiText] = useState(VAR_INCIDENTS[0].graniteAnalysis);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState("");

  const [calibratedOffset, setCalibratedOffset] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [userChoice, setUserChoice] = useState("");
  const [limbMode, setLimbMode] = useState(false);

  const [audience, setAudience] = useState("enthusiast");
  const [guardianVerified, setGuardianVerified] = useState(false);
  const [guardianSource, setGuardianSource] = useState("Granite Guardian 3.0");

  useEffect(() => {
    setAiText(selectedIncident.graniteAnalysis);
    setCalibratedOffset(0);
    setQuizSubmitted(false);
    setUserChoice("");
    setLimbMode(false);
  }, [selectedIncident]);

  useEffect(() => {
    const updateAudience = () => {
      setAudience(localStorage.getItem("decoded_audience") || "enthusiast");
    };
    updateAudience();
    window.addEventListener("decoded_audience_change", updateAudience);
    return () => window.removeEventListener("decoded_audience_change", updateAudience);
  }, []);

  const getDynamicVerdict = () => {
    if (!selectedIncident) return { verdict: "CORRECT", confidence: 90, lawCited: "" };
    if (selectedIncident.type !== "OFFSIDE") {
      return {
        verdict: selectedIncident.verdict,
        confidence: selectedIncident.confidence,
        lawCited: selectedIncident.lawCited,
        isTooClose: false
      };
    }
    const baseGap = selectedIncident.drawingData?.gap ?? 2.3;
    const currentGap = baseGap + calibratedOffset;
    if (Math.abs(currentGap) < 3.0) {
      return {
        verdict: "CONTROVERSIAL",
        isTooClose: true,
        confidence: 50,
        lawCited: `ECE 0.34% spatial uncertainty margin reached (calibrated gap: ${currentGap.toFixed(1)}cm). The difference is within the 3.0cm camera projection resolution threshold. Referees must defer to on-field call.`
      };
    }
    const isOffside = currentGap > 0;
    // Map expected correctness
    const originallyOffside = baseGap > 0;
    const originallyUpheld = selectedIncident.verdict === "CORRECT";
    
    // Determine new verdict
    let expectedVerdict = "CORRECT";
    if (isOffside !== originallyOffside) {
      expectedVerdict = originallyUpheld ? "WRONG" : "CORRECT";
    } else {
      expectedVerdict = originallyUpheld ? "CORRECT" : "WRONG";
    }
    
    return {
      verdict: expectedVerdict,
      confidence: Math.min(100, Math.round(50 + (Math.abs(currentGap) - 3) * 1.5)),
      lawCited: isOffside
        ? `Law 11 (Offside): Player is in active offside position by +${currentGap.toFixed(1)}cm. Ruling is ${expectedVerdict}.`
        : `Law 11 (Offside): Player is ONSIDE by ${currentGap.toFixed(1)}cm (onside buffer). Ruling is ${expectedVerdict}.`,
      isTooClose: false
    };
  };

  const dynamicVerdict = getDynamicVerdict();

  const handleIncidentSelect = (inc) => {
    setSelectedIncident(inc);
  };

  const triggerLegalAnalysis = async () => {
    setIsAiLoading(true);
    setAiText("");
    setAiStatus("Locating FIFA Article sections...");
    await new Promise((resolve) => setTimeout(resolve, 400));
    setAiStatus("Streaming IBM Granite law analysis...");

    const promptData = {
      match: selectedIncident.match,
      minute: selectedIncident.minute,
      type: selectedIncident.type,
      verdict: dynamicVerdict.verdict,
      confidence: dynamicVerdict.confidence,
      lawExcerpt: selectedIncident.lawExcerpt,
      description: selectedIncident.description + ` (Calibrated manual gap: ${(selectedIncident.drawingData?.gap + calibratedOffset).toFixed(1)}cm)`,
      players: selectedIncident.players
    };

    await streamGraniteAI(
      "VARDICT",
      promptData,
      (token) => { setAiText(prev => prev + token); setIsAiLoading(false); setAiStatus(""); },
      ({ guardianVerified: gv, guardianSource: gs }) => {
        if (gv === false) {
          setAiText(`⚠️ SAFETY INTERCEPT (Granite Guardian 3.0):\nThis response was flagged as potentially unsafe.\n\nSAFE LAW DEGRADATION:\n- Law Article: ${selectedIncident.lawCited}\n- Official Text: ${selectedIncident.lawExcerpt}\n\nReverted to pre-signed official rulebook text.`);
          setGuardianVerified(false);
        } else { setGuardianVerified(true); }
        setGuardianSource(gs);
        setIsAiLoading(false);
      },
      async () => {
        const res = await queryGraniteAI("VARDICT", promptData, selectedIncident.graniteAnalysis, audience);
        setAiText(res.text); setGuardianVerified(res.guardianVerified); setGuardianSource(res.guardianSource); setIsAiLoading(false);
      },
      audience
    );
  };

  const getTypePillColor = (type) => {
    switch (type) {
      case "OFFSIDE": return "bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/25";
      case "HANDBALL": return "bg-[#ff6f00]/10 text-[#ff6f00] border-[#ff6f00]/25";
      case "PENALTY": return "bg-[#ffd700]/10 text-[#ffd700] border-[#ffd700]/25";
      case "RED CARD": return "bg-red-600/10 text-red-500 border-red-600/25";
      default: return "bg-[#15151f] text-[#8e8e9f] border-[#222232]";
    }
  };

  const getVerdictBadgeColor = (ver) => {
    if (ver === "CORRECT") return "bg-[#00c2a8]/10 text-[#00c2a8] border border-[#00c2a8]/25";
    if (ver === "CONTROVERSIAL") return "bg-[#ff6f00]/10 text-[#ff6f00] border border-[#ff6f00]/25";
    return "bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/25";
  };

  return (
    <div className="flex flex-col w-full bg-[#07070a] select-none font-inter text-[#f0f0f5]">
      
      {/* 1. TOP SELECTOR PANEL (Editorial catalog format - Reference 2) */}
      <section className="bg-[#0b0404] border-b border-[#3c1414]/30 p-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center space-x-1.5 mb-3.5">
            <AlertOctagon size={12} className="text-[#ff3b30]" />
            <DataLabel className="text-red-500 font-bold">
              SELECT A CONTROVERSIAL DECISION FOR AI DECODING
            </DataLabel>
          </div>

          <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-thin">
            {VAR_INCIDENTS.map((inc) => {
              const isSelected = inc.id === selectedIncident.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => handleIncidentSelect(inc)}
                  className={`min-w-[250px] flex-shrink-0 bg-[#0f0404] border rounded-xl p-4 cursor-pointer select-none transition-all duration-200 ${
                    isSelected ? "border-[#ff3b30] bg-[#1e0707]" : "border-[#3c1414] hover:border-[#ff3b30]/60"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-[#ff3b30] font-bold">incident</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold font-inter ${getTypePillColor(inc.type)}`}>
                      {inc.type}
                    </span>
                  </div>

                  <h4 className="font-teko text-[17px] text-white tracking-wider truncate uppercase font-bold">
                    {inc.match}
                  </h4>
                  <p className="font-inter text-[12px] text-[#8e8e9f] truncate mt-0.5 font-semibold">
                    {inc.description}
                  </p>

                  <div className="flex justify-between items-center mt-3 border-t border-[#3c1414]/30 pt-2.5">
                    <span className="font-teko text-[22px] text-[#ff3b30] leading-none font-black">
                      {inc.minute}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-inter uppercase ${getVerdictBadgeColor(inc.verdict)}`}>
                      {inc.verdict}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. THREE COLUMN LAYOUT DETAIL */}
      <section className="py-10 px-4 md:px-12 max-w-[1450px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COL 1: DETAILS */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#0f0f15] rounded-xl p-5 border border-[#222232]">
              
              <span className="bg-[#ff3b30]/10 text-[#ff3b30] text-[9.5px] font-bold px-2.5 py-0.5 rounded border border-[#ff3b30]/25 uppercase font-inter inline-block mb-3">
                incident code: {selectedIncident.type}
              </span>
              
              <h2 className="font-teko text-[28px] text-white leading-none uppercase font-black">
                {selectedIncident.title}
              </h2>

              <div className="space-y-2 mt-4 text-[12px] text-[#8e8e9f] font-semibold border-b border-[#222232] pb-4">
                <div className="flex items-center space-x-2">
                  <MapPin size={12} className="text-[#666]" />
                  <span>{selectedIncident.stadium}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={12} className="text-[#666]" />
                  <span>Match Minute: {selectedIncident.minute}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={12} className="text-[#666]" />
                  <span>Attendance: {selectedIncident.attendance}</span>
                </div>
              </div>

              {/* Players involved */}
              <div className="py-4 border-b border-[#222232]">
                <DataLabel className="mb-2.5">PARTICIPATING PLAYERS</DataLabel>
                <div className="space-y-2">
                  {selectedIncident.players.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="font-teko text-[16px] text-white tracking-wider uppercase font-bold">
                        {p.flag} {p.name}
                      </span>
                      <span className="text-[10px] text-[#8e8e9f] font-bold uppercase">
                        {p.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stop time */}
              <div className="py-4 border-b border-[#222232] flex items-center justify-between">
                <div>
                  <DataLabel>VAR STOPPAGE DELAY</DataLabel>
                  <span className="text-[10.5px] text-[#8e8e9f] font-semibold block mt-0.5">
                    Match review time
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-teko text-[36px] text-[#ffd700] leading-none block font-black">
                    {selectedIncident.duration}
                  </span>
                </div>
              </div>

              {/* FIFA Law Ref */}
              <div className="pt-4 select-text">
                <DataLabel className="mb-2">FIFA LAW RAG INDEX</DataLabel>
                <h4 className="font-teko text-[17px] text-white tracking-wider uppercase leading-none font-bold">
                  {selectedIncident.lawTitle}
                </h4>
                <p className="text-[11.5px] text-[#8e8e9f] leading-relaxed mt-2.5 font-semibold">
                  {selectedIncident.lawExcerpt}
                </p>
                <div className="flex items-center space-x-1.5 text-[9px] text-[#44445c] font-bold mt-3.5">
                  <BookOpen size={10} />
                  <span>FIFA Official Laws 2024 via Docling</span>
                </div>
              </div>

            </div>
          </div>

          {/* COL 2: VAR RECONSTRUCT CANVAS */}
          <div className="lg:col-span-5 bg-[#0f0f15] rounded-xl p-5 border border-[#222232] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#222232] pb-3 mb-4">
                <DataLabel>CALIBRATED RECONSTRUCTION</DataLabel>
                <div className="flex items-center space-x-1 bg-[#ff3b30]/10 px-2 py-0.5 rounded border border-[#ff3b30]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  <span className="text-[8.5px] text-red-500 font-bold font-inter tracking-widest">
                    VAR RENDER
                  </span>
                </div>
              </div>

              {/* Strict Conditional Rendering: Lockout until quiz is submitted */}
              {!quizSubmitted ? (
                <div className="flex-1 min-h-[280px] flex flex-col items-center justify-center border border-[#ff3b30]/20 border-dashed rounded-xl bg-red-950/5 p-6 text-center select-none">
                  <Scale size={32} className="text-[#ff3b30] mb-3 animate-pulse" />
                  <span className="font-teko text-[20px] text-white uppercase tracking-wider block font-bold">TELEMETRY LOCK: SYSTEM PAUSED</span>
                  <p className="text-[11px] text-[#8e8e9f] mt-1.5 max-w-[280px] leading-relaxed">
                    Under FIFA integrity protocols, you must select your verdict in the <strong className="text-[#ffd700]">Referee Decision Lab Quiz</strong> panel on the right to unlock the SAOT telemetry mesh and legal reconstruct.
                  </p>
                </div>
              ) : limbMode ? (
                <LimbTrackingHUD incident={selectedIncident} />
              ) : (
                <VARCanvas
                  incident={selectedIncident}
                  showOffsideLine={showOffsideLine}
                  showCameras={showCameras}
                  viewMode={viewMode}
                  calibratedOffset={calibratedOffset}
                  aiText={aiText}
                />
              )}

              {/* Controls */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {selectedIncident.type === "OFFSIDE" && quizSubmitted && (
                  <button
                    onClick={() => setShowOffsideLine(!showOffsideLine)}
                    className={`px-4 py-2 rounded-none font-teko text-[13px] tracking-wider uppercase border transition-all cursor-pointer ${
                      showOffsideLine
                        ? "bg-[#ff3b30] text-white border-black"
                        : "bg-[#15151f] text-[#8e8e9f] border-[#222232] hover:text-white"
                    }`}
                  >
                    {showOffsideLine ? "HIDE OFFSIDE LINE" : "SHOW OFFSIDE LINE"}
                  </button>
                )}

                {quizSubmitted && (
                  <button
                    onClick={() => setShowCameras(!showCameras)}
                    className={`px-4 py-2 rounded-none font-teko text-[13px] tracking-wider uppercase border transition-all flex items-center space-x-1.5 cursor-pointer ${
                      showCameras
                        ? "bg-[#00c2a8] text-black border-black font-black"
                        : "bg-[#15151f] text-[#8e8e9f] border-[#222232] hover:text-white"
                    }`}
                  >
                    <Camera size={12} />
                    <span>{showCameras ? "HIDE CALIBRATED CAMERAS" : "SHOW CAMERAS"}</span>
                  </button>
                )}

                {selectedIncident.type === "OFFSIDE" && quizSubmitted && (
                  <button
                    onClick={() => setViewMode(viewMode === "MATCH" ? "BODY_PART" : "MATCH")}
                    className={`px-4 py-2 rounded-none font-teko text-[13px] tracking-wider uppercase border transition-all flex items-center space-x-1.5 cursor-pointer ${
                      viewMode === "BODY_PART"
                        ? "bg-[#2b66ff] text-white border-black"
                        : "bg-[#15151f] text-[#8e8e9f] border-[#222232] hover:text-white"
                    }`}
                  >
                    <Fingerprint size={12} />
                    <span>{viewMode === "BODY_PART" ? "MATCH SYSTEM VIEW" : "BODY PART LIMIT"}</span>
                  </button>
                )}

                {/* LIMB TRACK HUD toggle */}
                {selectedIncident.limbData && quizSubmitted && (
                  <button
                    onClick={() => setLimbMode(!limbMode)}
                    className={`px-4 py-2 rounded-none font-teko text-[13px] tracking-wider uppercase border transition-all flex items-center space-x-1.5 cursor-pointer ${
                      limbMode
                        ? "bg-[#1565c0] text-white border-black font-black"
                        : "bg-[#15151f] text-[#8e8e9f] border-[#222232] hover:text-white"
                    }`}
                  >
                    <Cpu size={12} />
                    <span>{limbMode ? "EXIT LIMB TRACK" : "SAOT LIMB TRACK HUD"}</span>
                  </button>
                )}
              </div>

              {/* VAR Calibrator Slider (Option 2) */}
              {selectedIncident.type === "OFFSIDE" && quizSubmitted && (
                <div className="mt-5 bg-black/40 border border-[#222232] p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-[9px] text-[#8e8e9f] font-bold uppercase tracking-wider">
                      VAR MANUAL LINE CALIBRATOR
                    </span>
                    <span className={`font-teko text-[16px] tracking-wider font-bold ${calibratedOffset === 0 ? "text-[#ffd700]" : calibratedOffset > 0 ? "text-[#ff3b30]" : "text-[#00c2a8]"}`}>
                      {calibratedOffset === 0 ? "CALIBRATED (0.0cm)" : `${calibratedOffset > 0 ? "+" : ""}${calibratedOffset.toFixed(1)}cm`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="0.5"
                    value={calibratedOffset}
                    onChange={(e) => setCalibratedOffset(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#15151f] rounded-lg appearance-none cursor-pointer accent-[#ff3b30]"
                  />
                  <div className="flex justify-between text-[8px] text-[#555] uppercase font-bold mt-1.5">
                    <span>← Onside Buffer</span>
                    <button onClick={() => setCalibratedOffset(0)} className="text-[#2b66ff] hover:underline cursor-pointer">Reset to system</button>
                    <span>Offside Gap →</span>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline progression bar */}
            <div className="border-t border-[#222232] pt-4 mt-5">
              <DataLabel className="mb-2.5">Incident progression line</DataLabel>
              <div className="relative w-full h-8 flex items-center justify-between px-3 bg-black/50 border border-[#222232] rounded-lg text-[10px] font-inter text-[#8e8e9f]">
                <div className="absolute left-10 right-10 h-[2px] bg-[#222232] z-0"></div>
                <div className="absolute left-10 w-[40%] h-[2px] bg-[#ff3b30] z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                  <span className="text-[8px] text-[#aaa] font-bold mt-1 uppercase">0:00 Play</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                  <span className="text-[8px] text-[#aaa] font-bold mt-1 uppercase">0:15 VAR Check</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold border border-white"></span>
                  <span className="text-[8px] text-gold font-bold mt-1 uppercase">Verdict</span>
                </div>
              </div>
            </div>

          </div>

          {/* COL 3: VERDICT */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Referee quiz card (Option 4) */}
            <div className={`bg-[#0f0f15] border rounded-xl p-5 transition-all ${
              !quizSubmitted 
                ? "border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.15)] animate-[pulse_2.5s_infinite]" 
                : "border-[#222232]"
            }`}>
              <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
                <div className="flex items-center space-x-1.5">
                  <Scale size={13} className="text-[#ffd700]" />
                  <DataLabel>REFEREE DECISION LAB QUIZ</DataLabel>
                </div>
                {!quizSubmitted && (
                  <span className="bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-[8px] font-bold px-2 py-0.5 rounded font-inter uppercase tracking-wider animate-pulse">
                    ACTION REQUIRED
                  </span>
                )}
              </div>
              {quizSubmitted ? (
                <div className="space-y-3">
                  <div className="p-3 bg-[#15151f] border border-[#222232] rounded">
                    <span className="text-[9px] text-[#8e8e9f] uppercase font-bold block">Your Ruling</span>
                    <span className="font-teko text-[17px] text-white uppercase tracking-wider block font-bold mt-0.5">{userChoice}</span>
                  </div>
                  <div className="p-3 bg-[#00c2a8]/10 border border-[#00c2a8]/30 rounded">
                    <span className="text-[9px] text-[#00c2a8] uppercase font-bold block">Official FIFA Verdict</span>
                    <span className="font-teko text-[17px] text-[#00c2a8] uppercase tracking-wider block font-bold mt-0.5">{dynamicVerdict.verdict} ({dynamicVerdict.confidence}% confidence)</span>
                  </div>
                  <p className="text-[11px] text-[#8e8e9f] leading-snug">{dynamicVerdict.lawCited}</p>
                  <button onClick={() => setQuizSubmitted(false)} className="text-[11.5px] text-[#2b66ff] hover:underline font-bold cursor-pointer">Rule again</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[11px] text-[#8e8e9f] leading-snug font-semibold">Review the field telemetry & draw line. Rule on the official incident:</p>
                  <div className="space-y-1.5">
                    {["CORRECT (Support Field Call)", "CONTROVERSIAL (Field Review Needed)", "WRONG (Overturn Call)"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setUserChoice(opt.split(" ")[0]);
                          setQuizSubmitted(true);
                        }}
                        className="w-full text-left px-3.5 py-2 bg-[#15151f] hover:bg-[#1e1e2d] hover:border-[#2b66ff]/50 border border-[#222232] text-white font-teko text-[14px] uppercase tracking-wider transition-colors cursor-pointer font-bold"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Decision card (unlocked after quiz submission) */}
            {quizSubmitted ? (
              <VerdictCard
                verdict={dynamicVerdict.verdict}
                confidence={dynamicVerdict.confidence}
                lawCited={dynamicVerdict.lawCited}
                isTooClose={dynamicVerdict.isTooClose}
              />
            ) : (
              <div className="bg-[#0f0f15]/50 border border-[#222232] border-dashed rounded-xl p-5 text-center flex flex-col justify-center items-center h-[120px]">
                <Scale size={24} className="text-[#333] mb-2 animate-pulse" />
                <span className="text-[10px] text-[#555] uppercase font-bold tracking-widest font-inter">
                  Submit decision to unlock official verdict
                </span>
              </div>
            )}

            {/* IBM Granite Legal Analysis */}
            <div className="space-y-2">
              {quizSubmitted ? (
                <>
                   <GranitePanel
                    title="GRANITE LEGAL RECONSTRUCT"
                    icon={Scale}
                    iconColor="#2b66ff"
                    text={aiText}
                    isLoading={isAiLoading}
                    status={aiStatus}
                    className="min-h-[260px] border-[#222232]"
                    badgeText="FIFA Laws Docling RAG"
                    guardianVerified={guardianVerified}
                    guardianSource={guardianSource}
                  />

                  <button
                    onClick={triggerLegalAnalysis}
                    disabled={isAiLoading}
                    className="bg-[#2b66ff] hover:bg-[#1a4eff] disabled:opacity-50 text-white font-teko text-[16px] tracking-wider uppercase h-11 w-full rounded-none flex items-center justify-center space-x-2 border border-black shadow active:scale-[0.98] transition-all cursor-pointer font-bold select-none"
                  >
                    <Scale size={13} />
                    <span>Verify with IBM Granite</span>
                  </button>
                </>
              ) : (
                <div className="bg-[#0f0f15]/50 border border-[#222232] border-dashed rounded-xl p-5 text-center flex flex-col justify-center items-center h-[120px] select-none">
                  <Scale size={20} className="text-[#333] mb-2" />
                  <span className="text-[10px] text-[#555] uppercase font-bold tracking-widest font-inter">
                    Submit decision to unlock legal explanation
                  </span>
                </div>
              )}
            </div>

            {/* Fan opinons poll */}
            <div className="bg-[#0f0f15] border border-[#222232] rounded-xl p-5 font-inter">
              <DataLabel className="mb-3">GLOBAL FAN POLL CONTEXT</DataLabel>
              
              <div className="space-y-3">
                {/* Correct */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#f0f0f5] mb-1.5">
                    <span>Decision Correct</span>
                    <span className="text-[#00c2a8]">{selectedIncident.polls.correct}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#15151f] rounded-none border border-[#222232] overflow-hidden">
                    <div
                      className="h-full bg-[#00c2a8] transition-all duration-[1s]"
                      style={{ width: `${selectedIncident.polls.correct}%` }}
                    />
                  </div>
                </div>

                {/* Wrong */}
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#f0f0f5] mb-1.5">
                    <span>Decision Wrong</span>
                    <span className="text-[#ff3b30]">{selectedIncident.polls.wrong}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#15151f] rounded-none border border-[#222232] overflow-hidden">
                    <div
                      className="h-full bg-[#ff3b30] transition-all duration-[1s]"
                      style={{ width: `${selectedIncident.polls.wrong}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[9px] text-[#55556d] font-bold mt-4 border-t border-[#222232]/40 pt-2.5">
                <Info size={10} />
                <span>Based on {selectedIncident.polls.count.toLocaleString()} fans polled worldwide</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
