"use client";

import React, { useRef, useEffect, useState } from "react";
import { Cpu, Info } from "lucide-react";

const JOINT_PAIRS = [
  ["nose", "leftShoulder"], ["nose", "rightShoulder"],
  ["leftShoulder", "rightShoulder"],
  ["leftShoulder", "leftElbow"], ["leftElbow", "leftWrist"],
  ["rightShoulder", "rightElbow"], ["rightElbow", "rightWrist"],
  ["leftShoulder", "leftHip"], ["rightShoulder", "rightHip"],
  ["leftHip", "rightHip"],
  ["leftHip", "leftKnee"], ["leftKnee", "leftAnkle"], ["leftAnkle", "leftHeel"],
  ["rightHip", "rightKnee"], ["rightKnee", "rightAnkle"], ["rightAnkle", "rightHeel"],
];

function drawSkeleton(ctx, joints, highlightKey, color, alpha = 1) {
  if (!joints) return;

  // Bones
  ctx.globalAlpha = alpha * 0.75;
  JOINT_PAIRS.forEach(([a, b]) => {
    const ja = joints[a], jb = joints[b];
    if (!ja || !jb) return;
    ctx.beginPath();
    ctx.moveTo(ja.x, ja.y);
    ctx.lineTo(jb.x, jb.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  // Joints
  ctx.globalAlpha = alpha;
  Object.entries(joints).forEach(([key, joint]) => {
    const isHighlight = key === highlightKey;
    const r = isHighlight ? 10 : 5;
    ctx.beginPath();
    ctx.arc(joint.x, joint.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isHighlight ? "#ff3b30" : color;
    ctx.fill();

    if (isHighlight) {
      // Outer ring
      ctx.beginPath();
      ctx.arc(joint.x, joint.y, r + 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,59,48,0.55)";
      ctx.lineWidth = 2;
      ctx.stroke();
      // Warning label
      ctx.globalAlpha = 1;
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillStyle = "#ff3b30";
      ctx.textAlign = "center";
      ctx.fillText("⚠ OFFSIDE LIMB", joint.x, joint.y - 20);
    }
  });
  ctx.globalAlpha = 1;
}

export default function LimbTrackingHUD({ incident }) {
  const canvasRef = useRef(null);
  const [animPulse, setAnimPulse] = useState(0);

  const limb = incident?.limbData;

  useEffect(() => {
    const interval = setInterval(() => setAnimPulse(p => (p + 0.05) % (Math.PI * 2)), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !limb) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#050508";
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;
    for (let i = 0; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
    for (let j = 0; j < H; j += 40) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke(); }

    // Offside line (red dashed)
    if (limb.offsideLineX) {
      ctx.strokeStyle = "rgba(255,59,48,0.7)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 5]);
      ctx.beginPath(); ctx.moveTo(limb.offsideLineX, 30); ctx.lineTo(limb.offsideLineX, H - 20); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255,59,48,0.9)";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("▲ OFFSIDE POINT", limb.offsideLineX, 24);
    }

    // Defender line (blue dashed)
    if (limb.defenderLineX) {
      ctx.strokeStyle = "rgba(43,102,255,0.7)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 5]);
      ctx.beginPath(); ctx.moveTo(limb.defenderLineX, 30); ctx.lineTo(limb.defenderLineX, H - 20); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(43,102,255,0.9)";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("▲ DEFENDER LINE", limb.defenderLineX, 24);
    }

    // Draw attacking player skeleton
    if (limb.attackingPlayer) {
      const ap = limb.attackingPlayer;
      drawSkeleton(ctx, ap.joints, ap.offsideLimb, "#ff3b30", 1);
      const nose = ap.joints?.nose;
      if (nose) {
        ctx.fillStyle = "rgba(255,59,48,0.95)";
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${ap.name} (${ap.team})`, nose.x, nose.y - 32);
      }
    }

    // Draw last defender skeleton
    if (limb.lastDefender) {
      const ld = limb.lastDefender;
      drawSkeleton(ctx, ld.joints, ld.referencePoint, "#2b66ff", 0.9);
      const nose = ld.joints?.nose;
      if (nose) {
        ctx.fillStyle = "rgba(43,102,255,0.95)";
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${ld.name} (${ld.team})`, nose.x, nose.y - 32);
      }
      // Pulsing ring on reference point
      const ref = ld.joints?.[ld.referencePoint];
      if (ref) {
        const pulse = 8 + 4 * Math.sin(animPulse);
        ctx.beginPath();
        ctx.arc(ref.x, ref.y, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(43,102,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Contact point (handball / foul incidents)
    if (limb.contactPoint) {
      const cp = limb.contactPoint;
      const pulse = 10 + 5 * Math.sin(animPulse);
      ctx.beginPath(); ctx.arc(cp.x, cp.y, pulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,215,0,0.6)"; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(cp.x, cp.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd700"; ctx.fill();
      ctx.fillStyle = "#ffd700"; ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⚡ CONTACT", cp.x, cp.y - 18);
    }

    // SAOT watermark
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.font = "bold 72px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SAOT", W / 2, H / 2 + 26);

  }, [limb, animPulse]);

  if (!limb) return (
    <div className="flex items-center justify-center h-[320px] bg-[#050508] border border-[#1a1a2e] rounded-xl">
      <span className="text-[#44445c] font-inter text-sm italic">No SAOT data for this incident type.</span>
    </div>
  );

  const verdictColor =
    limb.verdict === "OFFSIDE" ? "#ff3b30" :
    limb.verdict === "ONSIDE"  ? "#00c2a8" :
    limb.verdict === "CORRECT" ? "#00c2a8" :
    "#ffd700";

  return (
    <div className="space-y-3">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-[#1565c0] px-2 py-0.5 rounded flex items-center space-x-1">
            <Cpu size={10} color="white" />
            <span className="text-[9px] text-white font-inter font-black uppercase tracking-wider">SAOT</span>
          </div>
          <span className="font-teko text-[18px] text-white tracking-widest uppercase font-bold">
            29-Point Skeletal Mesh
          </span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded border"
             style={{ borderColor: verdictColor + "50", background: verdictColor + "18" }}>
          <span className="font-teko text-[15px] tracking-widest font-black" style={{ color: verdictColor }}>
            {limb.verdict}
          </span>
        </div>
      </div>

      {/* ── CANVAS — full width ── */}
      <div className="relative bg-[#050508] border border-[#1a1a2e] rounded-xl overflow-hidden w-full">
        <canvas
          ref={canvasRef}
          width="760"
          height="420"
          className="w-full h-auto block"
        />
        {/* Legend overlay */}
        <div className="absolute bottom-2 left-3 flex items-center space-x-4 bg-black/75 px-3 py-1.5 rounded-lg border border-white/10">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
            <span className="text-[9px] text-[#8e8e9f] font-inter font-bold">Attacker</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2b66ff]" />
            <span className="text-[9px] text-[#8e8e9f] font-inter font-bold">Defender</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30] ring-2 ring-[#ff3b30]/40" />
            <span className="text-[9px] text-[#ff3b30] font-inter font-bold">Offside Limb</span>
          </div>
        </div>
      </div>

      {/* ── DATA PANELS — 3-col grid below canvas ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* Attacker keypoints */}
        {limb.attackingPlayer?.joints && (
          <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-3">
            <div className="flex items-center space-x-1.5 mb-2">
              <Cpu size={10} color="#ff3b30" />
              <span className="font-inter text-[9px] text-[#ff3b30] font-bold uppercase tracking-wider">
                {limb.attackingPlayer.name}
              </span>
            </div>
            <div className="space-y-1">
              {[
                ["nose",          "Head"],
                ["leftShoulder",  "L.Shoulder"],
                ["rightShoulder", "R.Shoulder"],
                ["leftHeel",      "L.Heel"],
                ["rightHeel",     "R.Heel"],
              ].map(([key, label]) => {
                const joint = limb.attackingPlayer.joints[key];
                if (!joint) return null;
                const isOff = key === limb.attackingPlayer.offsideLimb;
                return (
                  <div key={key}
                       className={`flex items-center justify-between px-2 py-1 rounded text-[9px] font-inter ${isOff ? "bg-[#ff3b30]/15 border border-[#ff3b30]/30" : "bg-[#111118]"}`}>
                    <span className={isOff ? "text-[#ff3b30] font-bold" : "text-[#8e8e9f]"}>{label}</span>
                    <span className={`font-mono ${isOff ? "text-[#ff3b30]" : "text-[#5b5b7b]"}`}>
                      {(joint.x / 10).toFixed(1)}m, {(joint.y / 10).toFixed(1)}m{isOff && " ⚠"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Defender keypoints */}
        {limb.lastDefender?.joints ? (
          <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-3">
            <div className="flex items-center space-x-1.5 mb-2">
              <Cpu size={10} color="#2b66ff" />
              <span className="font-inter text-[9px] text-[#2b66ff] font-bold uppercase tracking-wider">
                {limb.lastDefender.name}
              </span>
            </div>
            <div className="space-y-1">
              {[
                ["leftHeel",   "L.Heel"],
                ["rightHeel",  "R.Heel"],
                ["leftAnkle",  "L.Ankle"],
                ["rightAnkle", "R.Ankle"],
              ].map(([key, label]) => {
                const joint = limb.lastDefender.joints[key];
                if (!joint) return null;
                const isRef = key === limb.lastDefender.referencePoint;
                return (
                  <div key={key}
                       className={`flex items-center justify-between px-2 py-1 rounded text-[9px] font-inter ${isRef ? "bg-[#2b66ff]/15 border border-[#2b66ff]/30" : "bg-[#111118]"}`}>
                    <span className={isRef ? "text-[#2b66ff] font-bold" : "text-[#8e8e9f]"}>{label}</span>
                    <span className={`font-mono ${isRef ? "text-[#2b66ff]" : "text-[#5b5b7b]"}`}>
                      {(joint.x / 10).toFixed(1)}m, {(joint.y / 10).toFixed(1)}m{isRef && " ← REF"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Historical / no-defender incidents */
          limb.isHistorical && (
            <div className="bg-[#1a1000] border border-[#ffd700]/30 rounded-xl p-3 flex items-start space-x-2">
              <Info size={13} color="#ffd700" className="shrink-0 mt-0.5" />
              <div>
                <div className="text-[9px] text-[#ffd700] font-bold font-inter uppercase tracking-wider mb-1">Pre-Tech Era</div>
                <div className="text-[10px] text-[#8e8e9f] font-inter leading-relaxed">{limb.technologyNote}</div>
              </div>
            </div>
          )
        )}

        {/* Margin + CV explanation */}
        <div className="flex flex-col gap-2">
          {limb.marginCm !== null && limb.marginCm !== undefined && (
            <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-3">
              <div className="text-[9px] text-[#8e8e9f] font-inter font-bold uppercase tracking-wider mb-1">Calibrated Margin</div>
              <div className="flex items-end space-x-1">
                <span className="font-teko text-[42px] leading-none font-black" style={{ color: verdictColor }}>{limb.marginCm}</span>
                <span className="font-inter text-[12px] text-[#8e8e9f] pb-1.5">cm</span>
              </div>
              <div className="text-[9px] text-[#8e8e9f] font-inter mt-0.5">
                {limb.verdict === "ONSIDE" ? "Clear onside — attacker behind defender." :
                 limb.verdict === "OFFSIDE" ? "Gap: offside limb vs defender's heel." :
                 "Contact distance — SAOT measured."}
              </div>
            </div>
          )}

          <div className="bg-[#06091a] border border-[#1a1a2e] rounded-xl p-3 flex-1">
            <div className="flex items-center space-x-1 mb-1.5">
              <Cpu size={9} color="#5b9cf6" />
              <span className="text-[9px] text-[#5b9cf6] font-bold font-inter uppercase tracking-wider">CV Calibration</span>
            </div>
            <p className="text-[10px] text-[#8e8e9f] font-inter leading-relaxed">{limb.explanation}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
