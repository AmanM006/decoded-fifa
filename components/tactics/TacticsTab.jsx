"use client";

import React, { useState, useEffect } from "react";
import { SET_PIECE_MATCHES } from "../../data/matches";
import TacticsCanvas from "./TacticsCanvas";
import TacticsAnalysis from "./TacticsAnalysis";
import TacticsPassMap from "./TacticsPassMap";
import DataLabel from "../shared/DataLabel";
import { Target, Play, Pause, RotateCcw } from "lucide-react";

export default function TacticsTab() {
  const [selectedMatch, setSelectedMatch] = useState(SET_PIECE_MATCHES[0]);
  const [selectedCorner, setSelectedCorner] = useState(SET_PIECE_MATCHES[0].corners[0]);
  const [filter, setFilter] = useState("All");
  const [tacticMode, setTacticMode] = useState("REPLAY"); // REPLAY or PASS_MAP
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const firstCorner = selectedMatch.corners[0];
    setSelectedCorner(firstCorner);
    setProgress(0);
    setIsPlaying(false);
  }, [selectedMatch]);

  const handleMatchChange = (e) => {
    const matchId = e.target.value;
    const match = SET_PIECE_MATCHES.find((m) => m.id === matchId);
    if (match) {
      setSelectedMatch(match);
    }
  };

  const handleCornerSelect = (corner) => {
    setSelectedCorner(corner);
    setProgress(0);
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    if (progress >= 1) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const handleProgressBarChange = (e) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
  };

  const filteredCorners = selectedMatch.corners.filter((corner) => {
    if (filter === "All") return true;
    return corner.formationFilter === filter;
  });

  return (
    <div className="flex flex-col lg:flex-row w-full bg-[#07070a] min-h-[calc(100vh-56px)] select-none font-inter">
      
      {/* LEFT SIDEBAR (Editorial Dark Style - Reference 2) */}
      <aside className="w-full lg:w-[320px] border-r border-[#222232] bg-[#0c0c12] p-6 shrink-0 flex flex-col space-y-6">
        
        {/* Match Dropdown */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Target size={14} className="text-[#00c2a8]" />
            <DataLabel>MATCH SELECTOR</DataLabel>
          </div>
          <select
            value={selectedMatch.id}
            onChange={handleMatchChange}
            className="w-full bg-[#15151f] text-white border border-[#222232] rounded-none p-3 font-teko text-[18px] tracking-wider uppercase focus:outline-none focus:border-[#2b66ff] transition-colors cursor-pointer"
          >
            {SET_PIECE_MATCHES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name.split(" · ")[0]} ({m.year})
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-[#222232]" />

        {/* Set Piece Selector list */}
        <div>
          <DataLabel className="mb-3.5">SET PIECE SELECTOR</DataLabel>
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {filteredCorners.length > 0 ? (
              filteredCorners.map((c) => {
                const isActive = selectedCorner?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleCornerSelect(c)}
                    className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#181822] border-[#2b66ff] border-l-4 border-l-[#2b66ff]"
                        : "bg-transparent border-[#222232] hover:bg-[#15151f]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-teko text-[16px] text-white tracking-wider leading-none uppercase">
                        {c.minute} {c.team} CORNER
                      </span>
                      <span className="font-inter text-[9px] text-[#8e8e9f] mt-1 font-bold uppercase tracking-wider">
                        xG: {c.xG.toFixed(2)}
                      </span>
                    </div>
                    <span className={`font-teko text-[15px] font-bold ${
                      c.outcome === "GOAL" ? "text-green" : c.outcome === "Saved" ? "text-[#ffd700]" : "text-red"
                    }`}>
                      → {c.outcome.toUpperCase()}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="font-inter text-[11px] text-[#666] italic py-2">
                No corners match the selected filter.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-[#222232]" />

        {/* Filter buttons - Blocky editorial corners (Reference 2) */}
        <div>
          <DataLabel className="mb-2">FORMATION FILTER</DataLabel>
          <div className="grid grid-cols-2 gap-1.5">
            {["All", "Goals", "Shots", "Cleared"].map((pill) => (
              <button
                key={pill}
                onClick={() => setFilter(pill)}
                className={`py-1.5 font-teko text-[14px] tracking-widest uppercase border transition-all cursor-pointer ${
                  filter === pill
                    ? "bg-[#00c2a8] text-black border-[#00c2a8] font-black"
                    : "bg-[#15151f] text-[#8e8e9f] border-[#222232] hover:text-white hover:border-[#444]"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#222232]" />

        {/* Legend */}
        <div>
          <DataLabel className="mb-2.5">TACTICAL LEGEND</DataLabel>
          <div className="space-y-2 text-[11.5px] font-inter text-[#8e8e9f]">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
              <span>Attacker (Red Circle)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2b66ff]" />
              <span>Defender (Blue Circle)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#ffd700]" />
              <span>Goalkeeper (Gold Circle)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-0.5 border-t border-dashed border-[#ccc]" />
              <span>Ball Flight Trajectory</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-2 rounded-full border border-[#00c2a8] bg-[#00c2a8]/10" />
              <span>Target Delivery Area</span>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN DISPLAY CANVAS PANEL (flex-grow) */}
      <main className="flex-grow flex flex-col">

        {/* ── VIEWPORT-LOCKED SECTION: topbar + canvas + playback always fit one screen ── */}
        <div className="h-[calc(100vh-52px)] flex flex-col overflow-hidden">

          {/* Top bar */}
          <div className="h-[48px] border-b border-[#222232] bg-[#0c0c12] px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-4">
              <span className="font-teko text-[20px] text-white tracking-widest uppercase font-bold mr-2">
                {selectedMatch.name}
              </span>
              {/* View Mode Toggle */}
              <div className="flex bg-[#15151f] border border-[#222232] rounded-lg p-0.5 text-[9px] font-bold select-none">
                {["REPLAY", "PASS MAP & DOMINANCE"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTacticMode(mode === "REPLAY" ? "REPLAY" : "PASS_MAP")}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer uppercase ${
                      (mode === "REPLAY" && tacticMode === "REPLAY") || (mode !== "REPLAY" && tacticMode === "PASS_MAP")
                        ? "bg-[#00c2a8] text-black font-black"
                        : "text-[#8e8e9f] hover:text-white"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-1.5 bg-[#0a2a0a]/60 border border-[#1a4a1a]/50 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c2a8]" />
                <span className="font-inter text-[8.5px] text-[#00c2a8] font-bold uppercase tracking-wider">StatsBomb Open Data</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="font-inter text-[10px] text-[#8e8e9f] uppercase tracking-widest font-bold">SCORE</span>
                <span className="font-teko text-[24px] text-[#ffd700] tracking-widest font-black leading-none">{selectedMatch.score}</span>
              </div>
            </div>
          </div>

          {/* Pitch canvas frame — flex flex-col so canvas grows and playback bar stays fixed */}
          <div className="flex-1 min-h-0 px-4 pt-3 pb-3 flex flex-col gap-3 bg-[#07070a]">
          {tacticMode === "PASS_MAP" ? (
            <TacticsPassMap matchId={selectedMatch.id} />
          ) : (
            <>
              {selectedCorner ? (
                <TacticsCanvas
                  corner={selectedCorner}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  playbackSpeed={playbackSpeed}
                  progress={progress}
                  setProgress={setProgress}
                />
              ) : (
                <div className="flex-1 min-h-0 flex items-center justify-center border border-[#222232] border-dashed rounded-xl">
                  <span className="text-[#8e8e9f] font-inter italic text-xs">
                    Select a corner kick to load simulation.
                  </span>
                </div>
              )}

              {/* Timeline & Playback control tray */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 bg-[#0c0c12] border border-[#222232] rounded-xl p-3.5 px-5 gap-3 shrink-0">
                {/* Play/Pause controls */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={handlePlayToggle}
                    disabled={!selectedCorner}
                    className="bg-[#15151f] hover:bg-[#181822] disabled:opacity-30 border border-[#222232] rounded-lg p-2.5 transition-colors cursor-pointer select-none"
                  >
                    {isPlaying ? <Pause size={14} color="#ffffff" /> : <Play size={14} color="#00c2a8" />}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={!selectedCorner}
                    className="bg-[#15151f] hover:bg-[#181822] disabled:opacity-30 border border-[#222232] rounded-lg p-2.5 transition-colors cursor-pointer select-none"
                  >
                    <RotateCcw size={14} color="#ffffff" />
                  </button>
                  
                  {/* Playback speeds */}
                  <div className="flex bg-[#15151f] border border-[#222232] rounded-lg p-0.5 ml-2 text-[10px] font-bold select-none">
                    {[0.5, 1, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                          playbackSpeed === spd ? "bg-[#2b66ff] text-white" : "text-[#8e8e9f] hover:text-white"
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline slider scrubber */}
                <div className="flex-1 w-full flex items-center space-x-3 select-none">
                  <span className="font-inter text-[9px] text-[#8e8e9f] font-bold uppercase tracking-wider shrink-0">
                    TIMELINE
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={progress}
                    onChange={handleProgressBarChange}
                    disabled={!selectedCorner}
                    className="flex-1 h-1.5 bg-[#15151f] rounded-lg appearance-none cursor-pointer accent-[#2b66ff]"
                  />
                  <span className="font-teko text-[16px] text-white tracking-widest shrink-0 w-8 text-right font-semibold">
                    {Math.round(progress * 100)}%
                  </span>
                </div>

                {/* Replay state logo */}
                {isPlaying && (
                  <div className="flex items-center space-x-1.5 bg-[#ff3b30]/10 border border-[#ff3b30]/30 px-2 py-0.5 rounded shrink-0 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] animate-ping" />
                    <span className="text-[9px] text-[#ff3b30] font-bold font-inter tracking-wider">
                      LIVE REPLAY
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
          </div>{/* end pitch canvas frame */}
        </div>{/* end viewport-locked section */}

        {/* BOTTOM: Analysis panel — scrolls into view naturally below the fold */}
        {tacticMode === "REPLAY" && selectedCorner && (
          <TacticsAnalysis
            corner={selectedCorner}
            matchName={selectedMatch.name}
            onLoadCorner={(cid) => {
              const matchCorner = selectedMatch.corners.find((c) => c.id === cid);
              if (matchCorner) {
                handleCornerSelect(matchCorner);
              }
            }}
          />
        )}

      </main>
    </div>
  );
}
