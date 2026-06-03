"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Target, Brain, Scale, BookOpen, Heart } from "lucide-react";

export default function HeroV7() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    { id: 1, title: "Tactics AI", icon: Target, color: "#00c2a8", rotation: -12, link: "/tactics" },
    { id: 2, title: "Stress DNA", icon: Brain, color: "#ffd700", rotation: -6, link: "/pressure" },
    { id: 3, title: "VARdict", icon: Scale, color: "#ff3b30", rotation: 0, link: "/vardict" },
    { id: 4, title: "Ask the Ref", icon: BookOpen, color: "#2b66ff", rotation: 6, link: "/laws" },
    { id: 5, title: "Drama", icon: Heart, color: "#ff3b30", rotation: 12, link: "/drama" },
  ];

  return (
    <section className="min-h-screen bg-[#111118] flex flex-col items-center justify-center relative overflow-hidden select-none py-24">
      
      <div className="absolute top-1/4 text-center z-10 w-full px-6">
        <h1 className="font-teko text-[70px] md:text-[100px] leading-none text-white font-black uppercase tracking-wide">
          DECODED 2026
        </h1>
        <p className="font-inter text-[#8e8e9f] text-sm md:text-base mt-2">
          Select a module to begin intelligence analysis.
        </p>
      </div>

      {/* Floating Card Stack */}
      <div className="relative w-full max-w-2xl h-[400px] flex items-center justify-center z-20 mt-32 perspective-[1000px]">
        {cards.map((card, idx) => {
          const isHovered = hoveredCard === card.id;
          const isAnyHovered = hoveredCard !== null;
          
          let translateZ = 0;
          let translateY = 0;
          let rotateZ = card.rotation;

          if (isHovered) {
            translateZ = 50;
            translateY = -30;
            rotateZ = 0;
          } else if (isAnyHovered) {
            // Push other cards down and away
            translateZ = -20;
            translateY = 20;
            rotateZ = card.rotation * 1.5;
          }

          return (
            <Link 
              key={card.id}
              href={card.link}
              className="absolute w-[240px] h-[320px] rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 ease-out cursor-pointer"
              style={{
                backgroundColor: "#07070a",
                border: `2px solid ${card.color}`,
                boxShadow: isHovered ? `0 20px 40px ${card.color}40` : "0 10px 30px rgba(0,0,0,0.5)",
                transform: `rotateZ(${rotateZ}deg) translateY(${translateY}px) translateZ(${translateZ}px)`,
                zIndex: isHovered ? 50 : 10 + idx,
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex justify-between items-center">
                <card.icon size={24} color={card.color} />
                <span className="font-mono text-[10px] text-white/50 uppercase">Module {card.id}</span>
              </div>
              <div className="font-teko text-3xl text-white uppercase tracking-wider">
                {card.title}
              </div>
            </Link>
          );
        })}
      </div>
      
    </section>
  );
}
