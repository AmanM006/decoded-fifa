"use client";

import React from "react";
import DataLabel from "../shared/DataLabel";

export default function PressurePentagon({ pentagonData }) {
  if (!pentagonData) return null;

  const axes = [
    { key: "composure", label: "COMPOSURE" },
    { key: "clutch", label: "CLUTCH CAPABILITY" },
    { key: "fatigue", label: "STAMINA FACTOR" },
    { key: "crowd", label: "CROWD DEAFENING" },
    { key: "experience", label: "BIG GAME EXPERIENCE" }
  ];

  const cx = 150;
  const cy = 135;
  const r = 90;

  const getCoordinates = (index, value) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
    const x = cx + r * value * Math.cos(angle);
    const y = cy + r * value * Math.sin(angle);
    return { x, y };
  };

  const getNormalizedValue = (key, stateType) => {
    const rawVal = pentagonData[key]?.[stateType] ?? 0.5;
    if (key === "fatigue") return 1 - rawVal; // high fatigue bad, low is good
    if (key === "crowd") return 1 - rawVal; // high sensitivity bad, insulation is good
    return rawVal;
  };

  const generatePolygonPath = (stateType) => {
    const points = axes.map((axis, i) => {
      const val = getNormalizedValue(axis.key, stateType);
      const coords = getCoordinates(i, val);
      return `${coords.x},${coords.y}`;
    });
    return points.join(" ");
  };

  const ringLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col select-none h-full justify-between font-inter text-[#f0f0f5]">
      <div>
        <div className="mb-2">
          <DataLabel>PSYCHOLOGICAL PRESSURE PROFILE</DataLabel>
        </div>

        {/* SVG Pentagon Radar */}
        <div className="flex justify-center items-center py-4 bg-[#07070a]/50 rounded-xl border border-[#222232]/50">
          <svg width="300" height="260" className="overflow-visible">
            {/* Background rings */}
            {ringLevels.map((level, ringIdx) => {
              const points = Array.from({ length: 5 }).map((_, i) => {
                const coords = getCoordinates(i, level);
                return `${coords.x},${coords.y}`;
              }).join(" ");
              return (
                <polygon
                  key={ringIdx}
                  points={points}
                  fill="none"
                  stroke="#222232"
                  strokeWidth="1"
                  strokeDasharray={level === 1.0 ? "none" : "3,3"}
                />
              );
            })}

            {/* Background Axis Lines */}
            {axes.map((_, i) => {
              const coords = getCoordinates(i, 1.0);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={coords.x}
                  y2={coords.y}
                  stroke="#222232"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Labels outside */}
            {axes.map((axis, i) => {
              const coords = getCoordinates(i, 1.18);
              const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
              let textAnchor = "middle";
              if (Math.cos(angle) > 0.1) textAnchor = "start";
              else if (Math.cos(angle) < -0.1) textAnchor = "end";

              let labelOverride = axis.label;
              if (axis.key === "fatigue") labelOverride = "STAMINA";
              if (axis.key === "crowd") labelOverride = "INSULATION";

              return (
                <text
                  key={i}
                  x={coords.x}
                  y={coords.y + 4}
                  fill="#8e8e9f"
                  fontSize="9px"
                  fontWeight="bold"
                  textAnchor={textAnchor}
                  className="font-inter tracking-wider"
                >
                  {labelOverride}
                </text>
              );
            })}

            {/* Career Average Polygon (dashed grey) */}
            <polygon
              points={generatePolygonPath("career")}
              fill="rgba(142,142,159,0.04)"
              stroke="#8e8e9f"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />

            {/* Current State Polygon (solid gold/yellow - FUT styling Reference 4) */}
            <polygon
              points={generatePolygonPath("current")}
              fill="rgba(255,215,0,0.08)"
              stroke="#ffd700"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center space-x-6 text-[10px] text-[#8e8e9f] mt-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700]" />
            <span className="font-bold text-white tracking-wider">Current State</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-0.5 border-t border-dashed border-[#8e8e9f] inline-block" />
            <span className="font-bold tracking-wider">Career Average</span>
          </div>
        </div>
      </div>

      {/* Metric comparison bars */}
      <div className="space-y-3.5 mt-5">
        {axes.map((axis, i) => {
          const currentVal = pentagonData[axis.key]?.current ?? 0.5;
          const careerVal = pentagonData[axis.key]?.career ?? 0.5;
          
          let delta = currentVal - careerVal;
          if (axis.key === "fatigue" || axis.key === "crowd") {
            delta = careerVal - currentVal;
          }
          
          const deltaSign = delta >= 0 ? "+" : "";
          const deltaColor = delta >= 0 ? "text-[#00c2a8]" : "text-[#ff3b30]";

          let displayName = axis.label;
          if (axis.key === "fatigue") displayName = "STAMINA INDEX";
          if (axis.key === "crowd") displayName = "CROWD PRESSURE INSULATION";

          return (
            <div key={axis.key} className="space-y-1">
              <div className="flex justify-between items-baseline text-[10px]">
                <span className="font-bold text-white tracking-wider">{displayName}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[#8e8e9f] font-semibold">
                    {currentVal.toFixed(2)} <span className="text-[8.5px] font-normal">/ {careerVal.toFixed(2)}</span>
                  </span>
                  <span className={`font-bold text-[9px] font-inter ${deltaColor}`}>
                    ({deltaSign}{delta.toFixed(2)})
                  </span>
                </div>
              </div>

              {/* Progress bar overlay */}
              <div className="h-2 w-full bg-[#15151f] rounded-none relative overflow-hidden border border-[#222232]">
                <div
                  className="h-full bg-[#ffd700]"
                  style={{ width: `${currentVal * 100}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#8e8e9f] z-10 opacity-80"
                  style={{ left: `${careerVal * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
