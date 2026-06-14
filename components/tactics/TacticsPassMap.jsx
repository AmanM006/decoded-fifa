"use client";

import React, { useRef, useEffect, useState } from "react";
import DataLabel from "../shared/DataLabel";
import { Brain, Cpu, Database } from "lucide-react";

// Mock Passing Network data for matches
const PASSING_DATA = {
  "arg-fra-2022": {
    team: "Argentina",
    nodes: [
      { id: "messi", name: "Lionel Messi (10)", x: 260, y: 160, r: 14, stats: { passes: 68, accuracy: "87%", keyPasses: 5, forward: 24 } },
      { id: "alvarez", name: "Julián Álvarez (9)", x: 380, y: 160, r: 12, stats: { passes: 32, accuracy: "81%", keyPasses: 2, forward: 9 } },
      { id: "macallister", name: "Alexis Mac Allister (20)", x: 280, y: 80, r: 12, stats: { passes: 48, accuracy: "89%", keyPasses: 3, forward: 18 } },
      { id: "depaul", name: "Rodrigo De Paul (7)", x: 240, y: 240, r: 13, stats: { passes: 72, accuracy: "91%", keyPasses: 2, forward: 22 } },
      { id: "enzo", name: "Enzo Fernández (24)", x: 180, y: 160, r: 14, stats: { passes: 85, accuracy: "93%", keyPasses: 1, forward: 31 } },
      { id: "otamendi", name: "Nicolás Otamendi (19)", x: 100, y: 110, r: 12, stats: { passes: 54, accuracy: "95%", keyPasses: 0, forward: 12 } },
      { id: "romero", name: "Cristian Romero (13)", x: 100, y: 210, r: 12, stats: { passes: 62, accuracy: "94%", keyPasses: 0, forward: 14 } }
    ],
    edges: [
      { from: "enzo", to: "messi", weight: 18 },
      { from: "enzo", to: "depaul", weight: 22 },
      { from: "depaul", to: "messi", weight: 25 },
      { from: "messi", to: "alvarez", weight: 14 },
      { from: "macallister", to: "messi", weight: 16 },
      { from: "macallister", to: "alvarez", weight: 11 },
      { from: "enzo", to: "macallister", weight: 20 },
      { from: "romero", to: "depaul", weight: 19 },
      { from: "otamendi", to: "enzo", weight: 15 }
    ]
  },
  "fra-cro-2018": {
    team: "France",
    nodes: [
      { id: "griezmann", name: "Antoine Griezmann (7)", x: 270, y: 160, r: 14, stats: { passes: 51, accuracy: "84%", keyPasses: 4, forward: 19 } },
      { id: "mbappe", name: "Kylian Mbappé (10)", x: 320, y: 250, r: 13, stats: { passes: 28, accuracy: "79%", keyPasses: 3, forward: 12 } },
      { id: "giroud", name: "Olivier Giroud (9)", x: 380, y: 160, r: 12, stats: { passes: 22, accuracy: "72%", keyPasses: 1, forward: 4 } },
      { id: "pogba", name: "Paul Pogba (6)", x: 210, y: 220, r: 14, stats: { passes: 64, accuracy: "88%", keyPasses: 3, forward: 23 } },
      { id: "kante", name: "N'Golo Kanté (13)", x: 180, y: 100, r: 13, stats: { passes: 58, accuracy: "91%", keyPasses: 1, forward: 15 } },
      { id: "varane", name: "Raphaël Varane (4)", x: 100, y: 120, r: 12, stats: { passes: 44, accuracy: "94%", keyPasses: 0, forward: 9 } },
      { id: "umtiti", name: "Samuel Umtiti (5)", x: 100, y: 200, r: 12, stats: { passes: 41, accuracy: "93%", keyPasses: 0, forward: 8 } }
    ],
    edges: [
      { from: "kante", to: "pogba", weight: 15 },
      { from: "pogba", to: "griezmann", weight: 21 },
      { from: "kante", to: "griezmann", weight: 14 },
      { from: "griezmann", to: "mbappe", weight: 12 },
      { from: "griezmann", to: "giroud", weight: 8 },
      { from: "pogba", to: "mbappe", weight: 18 },
      { from: "varane", to: "kante", weight: 16 },
      { from: "umtiti", to: "pogba", weight: 13 }
    ]
  },
  "bra-ger-2014": {
    team: "Germany",
    nodes: [
      { id: "kroos", name: "Toni Kroos (18)", x: 240, y: 130, r: 14, stats: { passes: 81, accuracy: "93%", keyPasses: 4, forward: 28 } },
      { id: "khedira", name: "Sami Khedira (6)", x: 210, y: 200, r: 13, stats: { passes: 62, accuracy: "89%", keyPasses: 2, forward: 19 } },
      { id: "schweinsteiger", name: "B. Schweinsteiger (7)", x: 160, y: 160, r: 14, stats: { passes: 76, accuracy: "91%", keyPasses: 1, forward: 14 } },
      { id: "lahm", name: "Philipp Lahm (16)", x: 260, y: 270, r: 13, stats: { passes: 58, accuracy: "95%", keyPasses: 2, forward: 22 } },
      { id: "ozil", name: "Mesut Özil (8)", x: 300, y: 90, r: 13, stats: { passes: 49, accuracy: "86%", keyPasses: 3, forward: 18 } },
      { id: "muller", name: "Thomas Müller (13)", x: 340, y: 220, r: 12, stats: { passes: 38, accuracy: "82%", keyPasses: 3, forward: 12 } },
      { id: "klose", name: "Miroslav Klose (11)", x: 390, y: 160, r: 12, stats: { passes: 24, accuracy: "79%", keyPasses: 1, forward: 5 } }
    ],
    edges: [
      { from: "schweinsteiger", to: "kroos", weight: 24 },
      { from: "schweinsteiger", to: "khedira", weight: 18 },
      { from: "kroos", to: "khedira", weight: 15 },
      { from: "kroos", to: "ozil", weight: 22 },
      { from: "khedira", to: "muller", weight: 17 },
      { from: "ozil", to: "klose", weight: 11 },
      { from: "muller", to: "klose", weight: 9 },
      { from: "lahm", to: "muller", weight: 20 },
      { from: "kroos", to: "lahm", weight: 14 }
    ]
  },
  "esp-ned-2010": {
    team: "Spain",
    nodes: [
      { id: "xavi", name: "Xavi (#8)", x: 260, y: 160, r: 14, stats: { passes: 85, accuracy: "92%", keyPasses: 6, forward: 34 } },
      { id: "iniesta", name: "Andrés Iniesta (#6)", x: 340, y: 180, r: 14, stats: { passes: 62, accuracy: "89%", keyPasses: 4, forward: 22 } },
      { id: "alonso", name: "Xabi Alonso (#14)", x: 200, y: 130, r: 13, stats: { passes: 74, accuracy: "90%", keyPasses: 1, forward: 18 } },
      { id: "busquets", name: "Sergio Busquets (#16)", x: 180, y: 220, r: 13, stats: { passes: 81, accuracy: "94%", keyPasses: 1, forward: 16 } },
      { id: "villa", name: "David Villa (#7)", x: 360, y: 90, r: 12, stats: { passes: 29, accuracy: "81%", keyPasses: 2, forward: 8 } },
      { id: "puyol", name: "Carles Puyol (#5)", x: 110, y: 110, r: 12, stats: { passes: 56, accuracy: "96%", keyPasses: 1, forward: 11 } },
      { id: "pique", name: "Gerard Piqué (#3)", x: 110, y: 210, r: 12, stats: { passes: 61, accuracy: "95%", keyPasses: 0, forward: 9 } }
    ],
    edges: [
      { from: "busquets", to: "alonso", weight: 22 },
      { from: "alonso", to: "xavi", weight: 26 },
      { from: "busquets", to: "xavi", weight: 19 },
      { from: "xavi", to: "iniesta", weight: 31 },
      { from: "iniesta", to: "villa", weight: 14 },
      { from: "xavi", to: "villa", weight: 12 },
      { from: "pique", to: "busquets", weight: 18 },
      { from: "puyol", to: "alonso", weight: 15 }
    ]
  },
  "eng-col-2018": {
    team: "Colombia",
    nodes: [
      { id: "cuadrado", name: "Juan Cuadrado (#11)", x: 280, y: 250, r: 13, stats: { passes: 48, accuracy: "83%", keyPasses: 3, forward: 19 } },
      { id: "james", name: "James Rodríguez (#10)", x: 280, y: 120, r: 14, stats: { passes: 54, accuracy: "86%", keyPasses: 4, forward: 24 } },
      { id: "falcao", name: "Radamel Falcao (#9)", x: 380, y: 160, r: 12, stats: { passes: 21, accuracy: "76%", keyPasses: 1, forward: 5 } },
      { id: "barrios", name: "Wilmar Barrios (#5)", x: 190, y: 180, r: 13, stats: { passes: 65, accuracy: "91%", keyPasses: 1, forward: 12 } },
      { id: "sanchez", name: "Carlos Sánchez (#6)", x: 170, y: 100, r: 12, stats: { passes: 52, accuracy: "88%", keyPasses: 0, forward: 11 } },
      { id: "mina", name: "Yerry Mina (#13)", x: 100, y: 130, r: 13, stats: { passes: 41, accuracy: "93%", keyPasses: 1, forward: 7 } },
      { id: "mojica", name: "Johan Mojica (#17)", x: 220, y: 60, r: 12, stats: { passes: 39, accuracy: "82%", keyPasses: 2, forward: 14 } }
    ],
    edges: [
      { from: "sanchez", to: "barrios", weight: 16 },
      { from: "barrios", to: "james", weight: 20 },
      { from: "james", to: "cuadrado", weight: 18 },
      { from: "james", to: "falcao", weight: 12 },
      { from: "cuadrado", to: "falcao", weight: 14 },
      { from: "mojica", to: "james", weight: 15 },
      { from: "mina", to: "sanchez", weight: 11 },
      { from: "sanchez", to: "mojica", weight: 13 }
    ]
  }
};

// Heatmap zones
const ZONES = [
  { id: "z14", name: "Zone 14 (Apex)", x: 260, y: 110, w: 100, h: 100, stats: { entries: 28, success: "68%", xG_generated: 0.84, explanation: "Zone 14 is the critical golden rectangle just outside the penalty area. Success here dictates central penetration and shooting opportunities." } },
  { id: "left_wing", name: "Left Flank Corridor", x: 150, y: 20, w: 180, h: 70, stats: { entries: 34, success: "59%", xG_generated: 0.42, explanation: "Flank entry routes focused on overloading block widths and delivering cutbacks or crosses to central runners." } },
  { id: "right_wing", name: "Right Flank Corridor", x: 150, y: 230, w: 180, h: 70, stats: { entries: 39, success: "64%", xG_generated: 0.58, explanation: "Right side isolation plays and wing overlaps designed to drag opposition fullbacks out of shape." } },
  { id: "penalty_box", name: "Penalty Area Box", x: 360, y: 60, w: 110, h: 200, stats: { entries: 19, success: "48%", xG_generated: 1.45, explanation: "Deep box entries. Maximum threat zone where quick ball releases and low crosses create high conversion probabilities." } }
];

export default function TacticsPassMap({ matchId }) {
  const canvasRef = useRef(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null); // { type: 'player'|'zone', data: object }

  const matchData = PASSING_DATA[matchId] || PASSING_DATA["arg-fra-2022"];

  useEffect(() => {
    setSelectedPlayer(matchData.nodes[0]);
    setSelectedZone(null);
  }, [matchId, matchData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    let animFrame;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // 1. Draw Pitch Surface (half pitch zoomed for tactical detail)
      ctx.fillStyle = "#0c150c";
      ctx.fillRect(0, 0, W, H);

      // Pitch lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1.5;

      // Halfway line (Left side)
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(10, H - 10);
      ctx.stroke();

      // Goal line (Right side)
      ctx.beginPath();
      ctx.moveTo(W - 40, 10);
      ctx.lineTo(W - 40, H - 10);
      ctx.stroke();

      // Penalty area (Right side)
      ctx.beginPath();
      ctx.moveTo(W - 40, 60);
      ctx.lineTo(W - 160, 60);
      ctx.lineTo(W - 160, H - 60);
      ctx.lineTo(W - 40, H - 60);
      ctx.stroke();

      // Goal area
      ctx.beginPath();
      ctx.moveTo(W - 40, 110);
      ctx.lineTo(W - 90, 110);
      ctx.lineTo(W - 90, H - 110);
      ctx.lineTo(W - 40, H - 110);
      ctx.stroke();

      // Center circle arc segment on left
      ctx.beginPath();
      ctx.arc(10, H / 2, 60, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();

      // Penalty arc segment on right
      ctx.beginPath();
      ctx.arc(W - 140, H / 2, 45, 1.1 * Math.PI, 0.9 * Math.PI, true);
      ctx.stroke();

      // 2. Draw Heatmap Zones if hovered or selected
      ZONES.forEach((zone) => {
        const isHovered = hoveredItem?.type === "zone" && hoveredItem.data.id === zone.id;
        const isSelected = selectedZone?.id === zone.id;

        if (isHovered || isSelected) {
          ctx.fillStyle = isSelected ? "rgba(0, 194, 168, 0.15)" : "rgba(0, 194, 168, 0.07)";
          ctx.strokeStyle = isSelected ? "#00c2a8" : "rgba(0, 194, 168, 0.4)";
          ctx.lineWidth = isSelected ? 2 : 1;
          ctx.fillRect(zone.x, zone.y, zone.w, zone.h);
          ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);

          // Zone name overlay
          ctx.fillStyle = "#00c2a8";
          ctx.font = "bold 8px Inter";
          ctx.textAlign = "left";
          ctx.fillText(zone.name.toUpperCase(), zone.x + 8, zone.y + 14);
        } else {
          // Subtle outline for interactive zones
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.lineWidth = 1;
          ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);
        }
      });

      // 3. Draw Passing Network Edges (Connections)
      matchData.edges.forEach((edge) => {
        const fromNode = matchData.nodes.find((n) => n.id === edge.from);
        const toNode = matchData.nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;

        // Draw line with thickness reflecting connection weight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = edge.weight / 6;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Edge weight text if hovered
        const isFromSelected = selectedPlayer?.id === fromNode.id || selectedPlayer?.id === toNode.id;
        if (isFromSelected) {
          ctx.strokeStyle = "#00c8ff";
          ctx.lineWidth = edge.weight / 4.5;
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();

          // Small count indicator label
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.x + toNode.y) / 2;
          // Clean it up, just let the lines glow
        }
      });

      // 4. Draw Passing Network Nodes (Players)
      matchData.nodes.forEach((node) => {
        const isSelected = selectedPlayer?.id === node.id;
        const isHovered = hoveredItem?.type === "player" && hoveredItem.data.id === node.id;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#00c2a8" : isHovered ? "#2b66ff" : "#12121e";
        ctx.fill();
        ctx.strokeStyle = isSelected ? "#fff" : "rgba(255,255,255,0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node text labels
        ctx.fillStyle = isSelected ? "#000" : "#fff";
        ctx.font = "bold 9px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Extract shirt number from name
        const num = node.name.match(/\((\d+)\)/)?.[1] || "10";
        ctx.fillText(num, node.x, node.y);

        // Player Name text block
        ctx.fillStyle = isSelected ? "#00c2a8" : "#8e8e9f";
        ctx.font = "bold 8px Inter";
        ctx.fillText(node.name.split(" (")[0], node.x, node.y + node.r + 10);
      });

      // 5. Draw HUD Overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.font = "bold 20px Teko";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`STATSbomb match pass network: ${matchData.team.toUpperCase()}`, 15, 15);

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [matchData, selectedPlayer, selectedZone, hoveredItem]);

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // Translate client coordinates to matches coordinates based on canvas resolution (500x320)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check Player nodes first
    const hitNode = matchData.nodes.find((n) => {
      const dist = Math.hypot(n.x - clickX, n.y - clickY);
      return dist <= n.r + 4;
    });

    if (hitNode) {
      setHoveredItem({ type: "player", data: hitNode });
      return;
    }

    // Check Zones
    const hitZone = ZONES.find((z) => {
      return clickX >= z.x && clickX <= z.x + z.w && clickY >= z.y && clickY <= z.y + z.h;
    });

    if (hitZone) {
      setHoveredItem({ type: "zone", data: hitZone });
      return;
    }

    setHoveredItem(null);
  };

  const handleCanvasClick = (e) => {
    if (hoveredItem) {
      if (hoveredItem.type === "player") {
        setSelectedPlayer(hoveredItem.data);
        setSelectedZone(null);
      } else {
        setSelectedZone(hoveredItem.data);
        setSelectedPlayer(null);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full font-inter">
      {/* Canvas column */}
      <div className="lg:col-span-8 flex flex-col items-center">
        <div className="relative border border-[#222232] bg-[#0c150c] rounded-xl overflow-hidden w-full select-none cursor-pointer">
          <canvas
            ref={canvasRef}
            width="500"
            height="320"
            onMouseMove={handleCanvasMouseMove}
            onClick={handleCanvasClick}
            className="w-full h-auto aspect-[500/320] block"
          />
        </div>
        <p className="text-[10px] text-[#555] uppercase font-bold tracking-widest mt-2 select-none">
          💡 Click on player circles or hover over pitch zones (wings/box) to audit metrics
        </p>
      </div>

      {/* Metrics inspector panel column */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
        {selectedPlayer ? (
          /* Render player metrics dashboard card */
          <div className="bg-[#0f0f15] border border-[#222232] rounded-xl p-5 select-none">
            <span className="bg-[#00c2a8]/10 text-[#00c2a8] border border-[#00c2a8]/25 text-[8.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-inter inline-block mb-3">
              Player network node details
            </span>
            <h3 className="font-teko text-[24px] text-white uppercase leading-none font-bold">
              {selectedPlayer.name}
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-black/50 border border-[#222232] rounded p-2 text-center">
                <span className="font-teko text-[22px] text-white font-black leading-none block">
                  {selectedPlayer.stats.passes}
                </span>
                <span className="text-[8px] text-[#8e8e9f] uppercase tracking-wider block font-bold mt-1">
                  Passes Completed
                </span>
              </div>
              <div className="bg-black/50 border border-[#222232] rounded p-2 text-center">
                <span className="font-teko text-[22px] text-[#00c2a8] font-black leading-none block">
                  {selectedPlayer.stats.accuracy}
                </span>
                <span className="text-[8px] text-[#8e8e9f] uppercase tracking-wider block font-bold mt-1">
                  Pass Accuracy
                </span>
              </div>
              <div className="bg-black/50 border border-[#222232] rounded p-2 text-center">
                <span className="font-teko text-[22px] text-[#ffd700] font-black leading-none block">
                  {selectedPlayer.stats.keyPasses}
                </span>
                <span className="text-[8px] text-[#8e8e9f] uppercase tracking-wider block font-bold mt-1">
                  Key Passes
                </span>
              </div>
              <div className="bg-black/50 border border-[#222232] rounded p-2 text-center">
                <span className="font-teko text-[22px] text-[#2b66ff] font-black leading-none block">
                  {selectedPlayer.stats.forward}
                </span>
                <span className="text-[8px] text-[#8e8e9f] uppercase tracking-wider block font-bold mt-1">
                  Progressive Passes
                </span>
              </div>
            </div>

            {/* IBM Granite tactical audit */}
            <div className="bg-black/40 border border-[#111122] rounded p-3 mt-4">
              <div className="flex items-center space-x-1.5 mb-2">
                <Brain size={10} className="text-[#2b66ff]" />
                <span className="text-[8px] text-[#5b9cf6] font-bold uppercase tracking-wider font-inter">IBM Granite node review</span>
              </div>
              <p className="text-[11.5px] text-[#8e8e9f] leading-relaxed">
                {selectedPlayer.name.split(" (")[0]} serves as a primary passing hub, showing high progressive pass volumes ({selectedPlayer.stats.forward}) and maintaining an elite {selectedPlayer.stats.accuracy} completion rate under opposition spatial compression blocks.
              </p>
            </div>
          </div>
        ) : selectedZone ? (
          /* Render zone metrics card */
          <div className="bg-[#0f0f15] border border-[#222232] rounded-xl p-5 select-none">
            <span className="bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/25 text-[8.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-inter inline-block mb-3">
              Territorial Zone audit details
            </span>
            <h3 className="font-teko text-[24px] text-white uppercase leading-none font-bold">
              {selectedZone.name}
            </h3>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-black/50 border border-[#222232] rounded p-2 text-center">
                <span className="font-teko text-[20px] text-white font-black block">
                  {selectedZone.stats.entries}
                </span>
                <span className="text-[7.5px] text-[#8e8e9f] uppercase tracking-wider block font-bold mt-1">
                  Zone Entries
                </span>
              </div>
              <div className="bg-black/50 border border-[#222232] rounded p-2 text-center">
                <span className="font-teko text-[20px] text-[#00c2a8] font-black block">
                  {selectedZone.stats.success}
                </span>
                <span className="text-[7.5px] text-[#8e8e9f] uppercase tracking-wider block font-bold mt-1">
                  Entry Success
                </span>
              </div>
              <div className="bg-black/50 border border-[#222232] rounded p-2 text-center">
                <span className="font-teko text-[20px] text-[#ffd700] font-black block">
                  {selectedZone.stats.xG_generated}
                </span>
                <span className="text-[7.5px] text-[#8e8e9f] uppercase tracking-wider block font-bold mt-1">
                  xG Generated
                </span>
              </div>
            </div>

            <p className="text-[12px] text-[#8e8e9f] leading-relaxed mt-4 font-semibold">
              {selectedZone.stats.explanation}
            </p>
          </div>
        ) : (
          <div className="bg-[#0f0f15]/50 border border-[#222232] border-dashed rounded-xl p-5 text-center flex flex-col justify-center items-center flex-1 h-[200px] select-none">
            <span className="text-[11px] text-[#555] uppercase font-bold tracking-wider font-inter">
              Click a player node or select a zone on the pitch map
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
