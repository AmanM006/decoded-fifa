"use client";

import React, { useRef, useEffect, useState } from "react";

export default function TacticsCanvas({
  corner,
  isPlaying,
  setIsPlaying,
  playbackSpeed = 1,
  progress,
  setProgress,
  aiText = "" // active canvas director trigger text
}) {
  const canvasRef = useRef(null);
  
  // Track coordinates of players
  const [playerPositions, setPlayerPositions] = useState({ attackers: [], defenders: [], goalkeeper: null });

  // Update positions according to animation progress t (scrubbing or playing)
  useEffect(() => {
    if (corner) {
      const t = progress;
      setPlayerPositions({
        attackers: corner.attackers.map(p => ({
          ...p,
          curX: p.x + (p.runX - p.x) * t,
          curY: p.y + (p.runY - p.y) * t
        })),
        defenders: corner.defenders.map(p => ({
          ...p,
          curX: p.x + (p.trackX - p.x) * t,
          curY: p.y + (p.trackY - p.y) * t
        })),
        goalkeeper: corner.goalkeeper ? {
          ...corner.goalkeeper,
          curX: corner.goalkeeper.x,
          curY: corner.goalkeeper.y
        } : null
      });
    }
  }, [progress, corner]);

  // Handle local state or animation frames
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    let animFrame;
    let lastTime = performance.now();

    const draw = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Update progress if playing
      let nextProgress = progress;
      if (isPlaying) {
        // Full animation takes 3 seconds at 1x speed
        nextProgress += (delta / 3) * playbackSpeed;
        if (nextProgress >= 1) {
          nextProgress = 1;
          setIsPlaying(false);
        }
        setProgress(nextProgress);
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Pitch surface
      ctx.fillStyle = "#1a3a1a";
      ctx.fillRect(0, 0, W, H);

      // 2. Grid overlay (very subtle)
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.8;
      const cols = 10;
      const rows = 10;
      for (let i = 1; i < cols; i++) {
        const x = (W / cols) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let j = 1; j < rows; j++) {
        const y = (H / rows) * j;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // 3. Pitch markings (white lines, low opacity)
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1.5;

      // Draw goal line (Right boundary, offset by 50px for margin)
      const goalLineX = W - 50;
      ctx.beginPath();
      ctx.moveTo(goalLineX, 20);
      ctx.lineTo(goalLineX, H - 20);
      ctx.stroke();

      // Goal post markers (y = 190 to y = 310)
      ctx.beginPath();
      ctx.moveTo(goalLineX, 190);
      ctx.lineTo(W - 35, 190);
      ctx.lineTo(W - 35, 310);
      ctx.lineTo(goalLineX, 310);
      ctx.stroke();

      // Penalty box (starts at goalLineX, extends left by 220px, y = 70 to 430)
      ctx.beginPath();
      ctx.moveTo(goalLineX, 70);
      ctx.lineTo(goalLineX - 220, 70);
      ctx.lineTo(goalLineX - 220, H - 70);
      ctx.lineTo(goalLineX, H - 70);
      ctx.stroke();

      // Goal area (6 yard box, extends left by 75px, y = 160 to 340)
      ctx.beginPath();
      ctx.moveTo(goalLineX, 150);
      ctx.lineTo(goalLineX - 75, 150);
      ctx.lineTo(goalLineX - 75, H - 150);
      ctx.lineTo(goalLineX, H - 150);
      ctx.stroke();

      // Penalty spot (12 yards / 135px from goalLineX, y centered)
      ctx.beginPath();
      ctx.arc(goalLineX - 135, H / 2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fill();

      // Penalty arc (center at spot, radius 70px, drawn on left of penalty box)
      ctx.beginPath();
      ctx.arc(goalLineX - 135, H / 2, 80, 1.15 * Math.PI, 0.85 * Math.PI, true);
      ctx.stroke();

      // Corner arcs (top-right and bottom-right corner flags)
      ctx.beginPath();
      ctx.arc(goalLineX, 20, 15, Math.PI / 2, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(goalLineX, H - 20, 15, Math.PI, 1.5 * Math.PI);
      ctx.stroke();

      if (!corner) return;

      const t = nextProgress;

      // Active Canvas Director triggers parsing
      const highlightPenaltyBox = aiText && aiText.includes("[HIGHLIGHT: PENALTY_BOX]");
      const highlightZone14 = aiText && aiText.includes("[HIGHLIGHT: ZONE_14]");
      const focusAttackerNum = aiText ? aiText.match(/\[FOCUS: ATTACKER_(\d+)\]/)?.[1] : null;
      const showLinesForce = aiText && aiText.includes("[SHOW_LINES]");

      // Draw Highlight Penalty Box if triggered
      if (highlightPenaltyBox) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 59, 48, 0.8)";
        ctx.lineWidth = 3 + Math.sin(Date.now() * 0.005) * 1.5;
        ctx.fillStyle = "rgba(255, 59, 48, 0.06)";
        ctx.beginPath();
        ctx.moveTo(goalLineX, 70);
        ctx.lineTo(goalLineX - 220, 70);
        ctx.lineTo(goalLineX - 220, H - 70);
        ctx.lineTo(goalLineX, H - 70);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Draw Highlight Zone 14 if triggered
      if (highlightZone14) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
        ctx.lineWidth = 3 + Math.sin(Date.now() * 0.005) * 1.5;
        ctx.fillStyle = "rgba(255, 215, 0, 0.06)";
        ctx.beginPath();
        ctx.rect(goalLineX - 340, 120, 120, 240);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // 4. Target zone / delivery area
      const target = corner.targetZone;
      if (target) {
        ctx.beginPath();
        ctx.ellipse(target.x, target.y, target.rx, target.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 200, 83, 0.12)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 200, 83, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = "rgba(0, 200, 83, 0.6)";
        ctx.font = "bold 8px Inter";
        ctx.textAlign = "center";
        ctx.fillText("TARGET AREA", target.x, target.y + 4);
      }

      // 5. Draw Player movement runs (under player dots)
      playerPositions.attackers.forEach((p) => {
        if (isPlaying) {
          ctx.strokeStyle = "rgba(255, 109, 0, 0.35)";
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.runX, p.runY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      playerPositions.defenders.forEach((p) => {
        if (isPlaying) {
          ctx.strokeStyle = "rgba(21, 101, 192, 0.35)";
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.trackX, p.trackY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // 6. Draw Player Positions
      // Attackers (Red, R=12)
      playerPositions.attackers.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.curX, p.curY, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#e8002d";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "bold 9px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.num, p.curX, p.curY);

        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.font = "8px Inter";
        ctx.fillText(p.name, p.curX, p.curY + 20);
      });

      // Defenders (Blue, R=12)
      playerPositions.defenders.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.curX, p.curY, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#1565c0";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "bold 9px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.num, p.curX, p.curY);

        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.font = "8px Inter";
        ctx.fillText(p.name, p.curX, p.curY + 20);
      });

      // Goalkeeper (Gold, R=14)
      const gk = playerPositions.goalkeeper;
      if (gk) {
        ctx.beginPath();
        ctx.arc(gk.curX, gk.curY, 14, 0, Math.PI * 2);
        ctx.fillStyle = "#ffd700";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "#000";
        ctx.font = "bold 9px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(gk.num, gk.curX, gk.curY);

        ctx.fillStyle = "rgba(255,215,0,0.75)";
        ctx.font = "8px Inter";
        ctx.fillText(gk.name, gk.curX, gk.curY + 22);
      }

      // Player focus glow (Active Canvas Director)
      if (focusAttackerNum) {
        const targetPlayer = playerPositions.attackers.find(p => String(p.num) === String(focusAttackerNum));
        if (targetPlayer) {
          ctx.save();
          ctx.strokeStyle = "#ffd700";
          ctx.lineWidth = 3 + Math.sin(Date.now() * 0.01) * 1.5;
          ctx.beginPath();
          ctx.arc(targetPlayer.curX, targetPlayer.curY, 20 + Math.sin(Date.now() * 0.01) * 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 7. Dynamic passing lane counterfactual drawing
      if (!isPlaying || showLinesForce) {
        playerPositions.attackers.forEach((att) => {
          // Calculate if passing lane is clear from ball start to this attacker
          const start = corner.ballStart;
          let blocked = false;
          
          // Simple collision line segment checking against defenders
          playerPositions.defenders.forEach((def) => {
            // Distance from defender center to passing line segment
            const x0 = def.curX, y0 = def.curY;
            const x1 = start.x, y1 = start.y;
            const x2 = att.curX, y2 = att.curY;
            const A = x0 - x1, B = y0 - y1, C = x2 - x1, D = y2 - y1;
            const dot = A * C + B * D;
            const lenSq = C * C + D * D;
            let param = -1;
            if (lenSq !== 0) param = dot / lenSq;

            let xx, yy;
            if (param < 0) { xx = x1; yy = y1; }
            else if (param > 1) { xx = x2; yy = y2; }
            else { xx = x1 + param * C; yy = y1 + param * D; }

            const dist = Math.hypot(x0 - xx, y0 - yy);
            if (dist < 22) { // 22px collision threshold
              blocked = true;
            }
          });

          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(att.curX, att.curY);
          if (blocked) {
            ctx.strokeStyle = "#ff3b30";
            ctx.setLineDash([4, 4]);
          } else {
            ctx.strokeStyle = "#00c853";
            ctx.lineWidth = 2;
          }
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.lineWidth = 1;
        });
      }

      // 8. Ball trajectory and flight
      // Render ball flight always (even when paused) to allow scrubbing the timeline and showing position
      const start = corner.ballStart;
      const end = { x: target.x, y: target.y };
      const cp = {
        x: (start.x + end.x) / 2 - 80,
        y: (start.y + end.y) / 2 - 90
      };

      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.quadraticCurveTo(cp.x, cp.y, end.x, end.y);
      ctx.stroke();
      ctx.setLineDash([]);

      const bx = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * cp.x + t * t * end.x;
      const by = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * cp.y + t * t * end.y;
      const heightMultiplier = 1 + 6 * Math.sin(t * Math.PI);

      ctx.beginPath();
      ctx.arc(bx, by, 4 + heightMultiplier, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bx, by, 1, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();

      // 9. Outcome overlay label (top right)
      if (isPlaying && t >= 0.95) {
        ctx.save();
        ctx.font = "bold 32px Teko";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        if (corner.outcome === "GOAL") {
          ctx.fillStyle = "#00c853";
          ctx.fillText("GOAL", W - 20, 20);
        } else if (corner.outcome === "Saved") {
          ctx.fillStyle = "#ffd700";
          ctx.fillText("SAVED", W - 20, 20);
        } else {
          ctx.fillStyle = "#e8002d";
          ctx.fillText("CLEARED", W - 20, 20);
        }
        ctx.restore();
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animFrame);
  }, [corner, isPlaying, playbackSpeed, progress, setProgress, setIsPlaying, playerPositions, aiText]);

  return (
    <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
      <div className="relative border border-[#222] rounded-xl overflow-hidden shadow-2xl w-full max-h-full mx-auto bg-[#1a3a1a]"
           style={{ aspectRatio: "760/480", maxHeight: "100%", maxWidth: "calc(100% * 760/480)" }}>
        <canvas
          ref={canvasRef}
          width="760"
          height="480"
          className="w-full h-full block"
        />
      </div>
    </div>
  );
}
