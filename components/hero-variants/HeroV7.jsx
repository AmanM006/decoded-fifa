"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Target, Brain, Scale, BookOpen, Heart } from "lucide-react";

export default function HeroV7() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    { id: 1, title: "Tactics AI", icon: Target, color: "#00c2a8", rotation: -16, link: "/tactics" },
    { id: 2, title: "Stress DNA", icon: Brain, color: "#ffd700", rotation: -8, link: "/pressure" },
    { id: 3, title: "VARdict", icon: Scale, color: "#ff3b30", rotation: 0, link: "/vardict" },
    { id: 4, title: "Ask the Ref", icon: BookOpen, color: "#2b66ff", rotation: 8, link: "/laws" },
    { id: 5, title: "Drama", icon: Heart, color: "#ff3b30", rotation: 16, link: "/drama" },
  ];

  return (
    <section className="min-h-screen bg-[#07070a] flex flex-col items-center justify-center relative overflow-hidden select-none py-24">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute top-[15%] text-center z-10 w-full px-6">
        <h1 className="font-teko text-[70px] md:text-[110px] leading-none text-white font-black uppercase tracking-wide drop-shadow-2xl">
          DECODED 2026
        </h1>
        <p className="font-mono text-[#8e8e9f] text-[10px] uppercase tracking-widest mt-2">
          Select a module to begin intelligence analysis
        </p>
      </div>

      {/* Floating Card Stack */}
      <div className="relative w-full max-w-2xl h-[400px] flex items-center justify-center z-20 mt-32 perspective-[1200px]">
        {cards.map((card, idx) => {
          const isHovered = hoveredCard === card.id;
          const isAnyHovered = hoveredCard !== null;
          
          let translateZ = 0;
          let translateY = 0;
          let rotateZ = card.rotation;
          let rotateX = 10; // Base tilt back
          let rotateY = 0;

          if (isHovered) {
            translateZ = 100;
            translateY = -40;
            rotateZ = 0;
            rotateX = 0;
          } else if (isAnyHovered) {
            // Push other cards down and fan them out further
            translateZ = -40;
            translateY = 30;
            rotateZ = card.rotation * 1.8;
            rotateX = 20;
          }

          return (
            <Link 
              key={card.id}
              href={card.link}
              className="absolute w-[260px] h-[360px] rounded-[32px] p-8 flex flex-col justify-between transition-all duration-[600ms] cursor-pointer group"
              style={{
                backgroundColor: "rgba(20, 20, 28, 0.8)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${isHovered ? card.color : 'rgba(255,255,255,0.1)'}`,
                boxShadow: isHovered 
                  ? `0 30px 60px -10px ${card.color}40, 0 0 20px ${card.color}20 inset` 
                  : "0 20px 40px rgba(0,0,0,0.8)",
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateY(${translateY}px) translateZ(${translateZ}px)`,
                zIndex: isHovered ? 50 : 10 + idx,
                transformStyle: "preserve-3d",
                transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)"
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glossy Reflection Highlight */}
              <div 
                className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%)",
                  opacity: isHovered ? 1 : 0.3
                }}
              />

              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                  <card.icon size={20} color={card.color} />
                </div>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold pt-2">Mod 0{card.id}</span>
              </div>
              
              <div className="relative z-10">
                <div className="font-teko text-[40px] text-white uppercase tracking-wider leading-none mb-2">
                  {card.title}
                </div>
                <div className="font-inter text-xs text-[#8e8e9f] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Launch intelligence module <span className="text-white ml-1">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
    </section>
  );
}
