"use client";

import React, { useRef, useEffect } from "react";

export default function VARCanvas({ incident, showOffsideLine = true, showCameras = true, viewMode = "MATCH", calibratedOffset = 0, aiText = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    let animFrame;
    let animProgress = 0;

    const draw = () => {
      // 1. Background (dark grass green)
      ctx.fillStyle = "#0d1f0d";
      ctx.fillRect(0, 0, W, H);

      // 2. Grid lines overlay (very subtle)
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // 3. Pitch markings (white lines, low opacity)
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;

      // Draw goal line / box boundaries based on incident type
      // Let's assume a zoomed goal box on the right
      ctx.beginPath();
      // Goal line
      ctx.moveTo(W - 40, 20);
      ctx.lineTo(W - 40, H - 20);
      
      // Goal post markers
      ctx.moveTo(W - 40, H / 2 - 40);
      ctx.lineTo(W - 30, H / 2 - 40);
      ctx.lineTo(W - 30, H / 2 + 40);
      ctx.lineTo(W - 40, H / 2 + 40);

      // Penalty area box (18-yard box)
      ctx.moveTo(W - 40, 50);
      ctx.lineTo(W - 200, 50);
      ctx.lineTo(W - 200, H - 50);
      ctx.lineTo(W - 40, H - 50);

      // 6-yard box
      ctx.moveTo(W - 40, 110);
      ctx.lineTo(W - 90, 110);
      ctx.lineTo(W - 90, H - 110);
      ctx.lineTo(W - 40, H - 110);
      
      // Penalty spot
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(W - 140, H / 2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fill();

      // End of general pitch layout
      ctx.stroke();

      if (!incident || !incident.drawingData) return;

      const data = incident.drawingData;
      const progress = Math.min(1, animProgress);

      const highlightPenaltyBox = aiText && aiText.includes("[HIGHLIGHT: PENALTY_BOX]");
      const highlightZone14 = aiText && (aiText.includes("[HIGHLIGHT: ZONE_14]") || aiText.includes("[HIGHLIGHT: OFFSIDE_LINE]"));
      const focusAttacker = aiText && aiText.includes("[FOCUS: ATTACKER]");
      const focusDefender = aiText && aiText.includes("[FOCUS: DEFENDER]");

      // Draw Highlight Penalty Box if triggered
      if (highlightPenaltyBox) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 59, 48, 0.8)";
        ctx.lineWidth = 3 + Math.sin(Date.now() * 0.005) * 1.5;
        ctx.fillStyle = "rgba(255, 59, 48, 0.06)";
        ctx.beginPath();
        ctx.moveTo(W - 40, 50);
        ctx.lineTo(W - 200, 50);
        ctx.lineTo(W - 200, H - 50);
        ctx.lineTo(W - 40, H - 50);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Draw Highlight Zone 14 / offside area if triggered
      if (highlightZone14) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
        ctx.lineWidth = 3 + Math.sin(Date.now() * 0.005) * 1.5;
        ctx.fillStyle = "rgba(255, 215, 0, 0.06)";
        ctx.beginPath();
        const lineX = data.offsideLineX || W / 2;
        ctx.rect(lineX - 50, 20, 100, H - 40);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // 4. Camera calibration cones (Show Cameras toggle)
      if (showCameras) {
        ctx.strokeStyle = "rgba(0,188,212,0.12)";
        ctx.fillStyle = "rgba(0,188,212,0.02)";
        ctx.lineWidth = 1;
        
        // Target point
        const targetX = data.contactPoint?.x || data.attacker?.x || W / 2;
        const targetY = data.contactPoint?.y || data.attacker?.y || H / 2;

        // Camera sources (e.g. top-left corner, bottom-left, etc.)
        const cameraPositions = [
          { x: 20, y: 20, label: "CAM 1 (High Main)" },
          { x: 20, y: H - 20, label: "CAM 2 (16m Line)" },
          { x: W - 100, y: 15, label: "CAM 3 (Behind Goal)" }
        ];

        cameraPositions.forEach((cam) => {
          ctx.beginPath();
          ctx.moveTo(cam.x, cam.y);
          ctx.lineTo(targetX - 25, targetY - 15);
          ctx.lineTo(targetX + 25, targetY + 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Mini camera icon label
          ctx.fillStyle = "rgba(0,188,212,0.4)";
          ctx.font = "8px Inter";
          ctx.fillText(cam.label, cam.x + 5, cam.y === 20 ? cam.y + 10 : cam.y - 5);
        });
      }

      // Render content based on incident type
      if (incident.type === "OFFSIDE") {
        const attacker = data.attacker;
        const defender = data.defender;
        // Shift line visually on screen (1cm = 2 pixels)
        const offsideX = data.offsideLineX + (calibratedOffset * 2.0);
        const displayGap = data.gap + calibratedOffset;

        // Draw Player Dots
        // Attacker (red)
        if (attacker) {
          const currentX = W / 2 + (attacker.x - W / 2) * progress;
          const currentY = H / 2 + (attacker.y - H / 2) * progress;

          // Focus glow on attacker
          if (focusAttacker) {
            ctx.save();
            ctx.strokeStyle = "#ffd700";
            ctx.lineWidth = 2.5 + Math.sin(Date.now() * 0.01) * 1;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 20 + Math.sin(Date.now() * 0.01) * 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }

          ctx.beginPath();
          ctx.arc(currentX, currentY, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#e8002d";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Jersey number
          ctx.fillStyle = "#fff";
          ctx.font = "bold 9px Inter";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(attacker.num || "9", currentX, currentY);

          // Name label
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.font = "9px Inter";
          ctx.fillText(attacker.label || "Attacker", currentX, currentY + 22);
        }

        // Defender (blue)
        if (defender) {
          const currentX = W / 2 + (defender.x - W / 2) * progress;
          const currentY = H / 2 + (defender.y - H / 2) * progress;

          // Focus glow on defender
          if (focusDefender) {
            ctx.save();
            ctx.strokeStyle = "#ffd700";
            ctx.lineWidth = 2.5 + Math.sin(Date.now() * 0.01) * 1;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 20 + Math.sin(Date.now() * 0.01) * 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }

          ctx.beginPath();
          ctx.arc(currentX, currentY, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#1565c0";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Jersey number
          ctx.fillStyle = "#fff";
          ctx.font = "bold 9px Inter";
          ctx.fillText(defender.num || "4", currentX, currentY);

          // Name label
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.font = "9px Inter";
          ctx.fillText(defender.label || "Defender", currentX, currentY + 22);
        }

        // Draw Offside Line
        if (showOffsideLine && progress >= 0.7) {
          const lineAlpha = (progress - 0.7) / 0.3;
          
          if (viewMode === "BODY_PART" && incident.id === "griezmann-2022") {
            // Draw 3D-like broadcast layout with blue (defender heel) and red (attacker armpit) lines
            ctx.strokeStyle = `rgba(0, 200, 83, ${lineAlpha})`; // Green base
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(offsideX, 20);
            ctx.lineTo(offsideX, H - 20);
            ctx.stroke();

            // Attacker Armpit limit line (Red)
            ctx.strokeStyle = `rgba(232, 0, 45, ${lineAlpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(attacker.x, attacker.y - 12);
            ctx.lineTo(attacker.x, H - 35);
            ctx.stroke();

            // Defender Foot limit line (Blue)
            ctx.strokeStyle = `rgba(21, 101, 192, ${lineAlpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(defender.x, defender.y + 12);
            ctx.lineTo(defender.x, H - 35);
            ctx.stroke();

            // Shaded GAP area between the two lines
            ctx.fillStyle = displayGap > 0 ? `rgba(232, 0, 45, ${lineAlpha * 0.15})` : `rgba(0, 200, 83, ${lineAlpha * 0.15})`;
            ctx.fillRect(defender.x, H - 35, attacker.x - defender.x, 15);

            ctx.fillStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.font = "10px Inter";
            ctx.textAlign = "center";
            ctx.fillText(`GAP: ${displayGap.toFixed(1)}cm`, (defender.x + attacker.x) / 2, H - 25);
          } else {
            // Single official Red offside line (standard match view)
            ctx.strokeStyle = displayGap > 0 ? `rgba(232, 0, 45, ${lineAlpha})` : `rgba(0, 200, 83, ${lineAlpha})`;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(offsideX, 20);
            ctx.lineTo(offsideX, H - 20);
            ctx.stroke();

            // Draw gap arrow
            if (attacker && defender) {
              ctx.strokeStyle = "rgba(255,215,0,0.6)";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(defender.x, defender.y);
              ctx.lineTo(attacker.x, defender.y);
              ctx.stroke();

              ctx.fillStyle = "#ffd700";
              ctx.font = "bold 9px Inter";
              ctx.textAlign = "center";
              ctx.fillText(`${displayGap.toFixed(1)} cm`, (defender.x + attacker.x) / 2, defender.y - 8);
            }
          }
          
          // Technical indicator HUD overlay on Canvas
          ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
          ctx.fillRect(20, 20, 160, 25);
          ctx.strokeStyle = displayGap > 0 ? "#e8002d" : "#00c853";
          ctx.lineWidth = 1;
          ctx.strokeRect(20, 20, 160, 25);

          ctx.fillStyle = displayGap > 0 ? "#e8002d" : "#00c853";
          ctx.font = "bold 10px Inter";
          ctx.textAlign = "left";
          ctx.fillText(`OFFSIDE DETECTION: ${displayGap.toFixed(1)}cm`, 28, 36);
        }

      } else if (incident.type === "HANDBALL") {
        const player = data.player;
        const contact = data.contactPoint;

        // Draw Player Center Dot
        if (player) {
          ctx.beginPath();
          ctx.arc(player.x, player.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#1565c0";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Label
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.font = "9px Inter";
          ctx.textAlign = "center";
          ctx.fillText(player.label || "Player", player.x, player.y + 22);

          // Draw arm lines representing the contact shoulder -> elbow -> hand
          ctx.strokeStyle = "#ff6d00";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(player.x + 8, player.y - 8); // shoulder
          // Project elbow using armAngle
          const armAngleRad = (player.armAngle * Math.PI) / 180;
          const elbowX = player.x + 8 + 20 * Math.cos(armAngleRad);
          const elbowY = player.y - 8 + 20 * Math.sin(armAngleRad);
          ctx.lineTo(elbowX, elbowY); // elbow
          ctx.lineTo(contact.x, contact.y); // contact point (hand)
          ctx.stroke();

          // Label arm angle degrees
          ctx.fillStyle = "#ff6d00";
          ctx.font = "bold 9px Inter";
          ctx.fillText(`${player.armAngle}° ANGLE`, player.x - 35, player.y - 12);
        }

        // Draw Ball flight trajectory curve
        if (data.ballPath) {
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(data.ballPath[0].x, data.ballPath[0].y);
          ctx.quadraticCurveTo(
            (data.ballPath[0].x + data.ballPath[2].x) / 2,
            data.ballPath[0].y - 80,
            data.ballPath[2].x,
            data.ballPath[2].y
          );
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw Contact Point X
        if (contact && progress >= 0.5) {
          ctx.strokeStyle = "#e8002d";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(contact.x - 6, contact.y - 6);
          ctx.lineTo(contact.x + 6, contact.y + 6);
          ctx.moveTo(contact.x + 6, contact.y - 6);
          ctx.lineTo(contact.x - 6, contact.y + 6);
          ctx.stroke();

          // Render glowing indicator around it
          ctx.beginPath();
          ctx.arc(contact.x, contact.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(232,0,45,0.3)";
          ctx.stroke();

          ctx.fillStyle = "#e8002d";
          ctx.font = "bold 9px Inter";
          ctx.fillText("CONTACT POINT", contact.x + 45, contact.y - 5);
        }

      } else if (incident.type === "PENALTY" || incident.type === "RED CARD") {
        const attacker = data.attacker;
        const defender = data.defender || data.goalkeeper;
        const contact = data.contactPoint;

        // Draw penalty spot focal highlights (Foul Zone)
        ctx.fillStyle = "rgba(232,0,45,0.06)";
        ctx.beginPath();
        ctx.arc(contact?.x || W - 140, contact?.y || H / 2, 45, 0, Math.PI * 2);
        ctx.fill();

        // Draw players
        if (attacker) {
          ctx.beginPath();
          ctx.arc(attacker.x, attacker.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#e8002d";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.font = "9px Inter";
          ctx.textAlign = "center";
          ctx.fillText(attacker.label, attacker.x, attacker.y + 22);
        }

        if (defender) {
          ctx.beginPath();
          ctx.arc(defender.x, defender.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#1565c0";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.font = "9px Inter";
          ctx.textAlign = "center";
          ctx.fillText(defender.label, defender.x, defender.y + 22);
        }

        // Draw impact marker
        if (contact && progress >= 0.5) {
          ctx.strokeStyle = "#ffd700";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(contact.x - 7, contact.y - 7);
          ctx.lineTo(contact.x + 7, contact.y + 7);
          ctx.moveTo(contact.x + 7, contact.y - 7);
          ctx.lineTo(contact.x - 7, contact.y + 7);
          ctx.stroke();

          // Shockwave ripple
          ctx.strokeStyle = "rgba(255,215,0,0.4)";
          ctx.beginPath();
          ctx.arc(contact.x, contact.y, 14, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "#ffd700";
          ctx.font = "bold 9px Inter";
          ctx.fillText("COLLISION", contact.x + 35, contact.y - 5);
        }

        // Specific to Goal Line
        if (incident.id === "eng-ger-2010" && data.goalLineX) {
          // Draw official goal line vertical
          ctx.strokeStyle = "rgba(255,255,255,0.6)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(data.goalLineX, 20);
          ctx.lineTo(data.goalLineX, H - 20);
          ctx.stroke();

          // Draw ball crossing the goal line
          const ballRadius = 8;
          ctx.beginPath();
          ctx.arc(data.ballX, data.ballY, ballRadius, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Line to show ball is past line
          ctx.strokeStyle = "#e8002d";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(data.goalLineX, data.ballY);
          ctx.lineTo(data.ballX, data.ballY);
          ctx.stroke();

          // Text for distance inside
          ctx.fillStyle = "#e8002d";
          ctx.font = "bold 9px Inter";
          ctx.textAlign = "left";
          ctx.fillText("+33cm PAST GOAL LINE", data.goalLineX + 15, data.ballY - 12);
        }
      }

      // 5. HUD watermark labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.font = "bold 28px Teko";
      ctx.textAlign = "left";
      ctx.fillText("VAR CAMERA RECONSTRUCTION", 20, H - 20);

      animProgress += 0.02; // Increment speed (approx 50 frames to completion)
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [incident, showOffsideLine, showCameras, viewMode, calibratedOffset, aiText]);

  return (
    <div className="flex flex-col items-center select-none w-full">
      <div className="relative border border-[#222] bg-[#0d1f0d] rounded-xl overflow-hidden shadow-2xl w-full">
        <canvas
          ref={canvasRef}
          width="500"
          height="320"
          className="w-full h-auto aspect-[500/320] block"
        />
      </div>
    </div>
  );
}
