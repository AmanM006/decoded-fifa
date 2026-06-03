"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Target, Brain, Scale, Trophy, BookOpen, Heart } from "lucide-react";

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen bg-[#07070a] flex flex-col lg:flex-row items-stretch select-none overflow-hidden relative pt-[52px]">

      {/* LEFT COLUMN */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center p-8 sm:p-16 md:p-24 relative z-20">
        <div className="max-w-lg space-y-8">

          {/* WC 2026 Badge */}
          <div className={`transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center space-x-1.5 bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-[9px] font-inter font-black uppercase tracking-[0.2em] px-3 py-1 rounded">
              <Trophy size={9} />
              <span>FIFA World Cup 2026 · AI Platform</span>
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1
              className={`font-teko text-[80px] sm:text-[110px] leading-[0.75] text-white tracking-tighter uppercase font-black transition-all duration-700 delay-100 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              DECODED
            </h1>
            <h2
              className={`font-teko text-[18px] sm:text-[20px] text-[#00c2a8] uppercase tracking-[0.25em] font-semibold transition-all duration-700 delay-200 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Tactical AI &amp; Law Explainers
            </h2>
          </div>

          {/* One-line description */}
          <p
            className={`font-inter text-[14px] text-[#8e8e9f] leading-relaxed transition-all duration-700 delay-300 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Tactics, pressure, and VAR decisions — finally explained by AI.
          </p>

          {/* 5 Nav Cards */}
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 gap-2 transition-all duration-700 delay-[400ms] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/tactics"
              className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#00c2a8]/40 group"
            >
              <Target size={16} className="text-[#00c2a8] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">
                Tactics AI
              </span>
            </Link>
            <Link
              href="/pressure"
              className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#ffd700]/40 group"
            >
              <Brain size={16} className="text-[#ffd700] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">
                Stress DNA
              </span>
            </Link>
            <Link
              href="/vardict"
              className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#ff3b30]/40 group"
            >
              <Scale size={16} className="text-[#ff3b30] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">
                VARdict
              </span>
            </Link>
            <Link
              href="/laws"
              className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#2b66ff]/40 group"
            >
              <BookOpen size={16} className="text-[#2b66ff] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">
                Ask Ref
              </span>
            </Link>
            <Link
              href="/drama"
              className="bg-[#0f0f15]/80 hover:bg-[#181822] border border-[#222232] rounded-xl p-3 transition-all hover:border-[#ff3b30]/40 group"
            >
              <Heart size={16} className="text-[#ff3b30] mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="font-teko text-[13px] text-white tracking-wider block uppercase">
                Drama
              </span>
            </Link>
          </div>

          {/* CTA */}
          <div
            className={`transition-all duration-700 delay-500 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/tactics"
              className="inline-flex bg-white hover:bg-[#eaeaea] text-black font-teko text-[15px] tracking-widest font-bold px-8 py-3 rounded-full uppercase items-center space-x-2 transition-all duration-150 cursor-pointer shadow-lg active:scale-95"
            >
              <span>ENTER THE PLATFORM</span>
              <span className="text-[12px] font-sans">→</span>
            </Link>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN — animated graphic panel */}
      <div className="hidden lg:block w-[45%] relative overflow-hidden select-none z-10">

        <div
          className={`absolute inset-0 bg-[#00c2a8] transition-transform duration-[1.2s] ease-out origin-top-left ${
            animate ? "translate-x-0" : "translate-x-[100%]"
          }`}
          style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div
          className={`absolute inset-0 bg-[#2b66ff] transition-transform duration-[1s] ease-out origin-top-left ${
            animate ? "translate-x-0" : "translate-x-[100%]"
          }`}
          style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 8% 100%)" }}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center font-bold">

            <div className="font-teko text-[320px] leading-none tracking-tighter text-stroke absolute top-[-50px] opacity-15">26</div>
            <div className="font-teko text-[320px] leading-none tracking-tighter text-stroke absolute bottom-[-50px] opacity-15">26</div>

            <div className="flex flex-col items-center justify-center text-white font-teko leading-[0.75] text-center">
              <span className="text-[120px] tracking-tighter font-extrabold uppercase">WE</span>
              <span className="text-[120px] tracking-tighter font-extrabold uppercase">ARE</span>
              <span className="text-[190px] tracking-tighter font-black text-[#ffd700]">26</span>
            </div>

            <div className={`absolute flex items-center justify-center transition-all duration-[1.2s] delay-300 ${
              animate ? "scale-100 rotate-0 opacity-90" : "scale-75 rotate-12 opacity-0"
            }`}>
              <div className="relative w-48 h-48 flex items-center justify-center animate-[pulse_3s_infinite]">
                <Trophy size={110} color="#ffd700" className="drop-shadow-[0_15px_25px_rgba(255,215,0,0.6)]" />
                <div className="absolute bottom-2 bg-black border border-[#ffd700]/30 px-3 py-0.5 rounded font-teko text-[12px] text-white tracking-widest uppercase">
                  FIFA WORLD CUP
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 font-teko text-[18px] text-white text-right leading-tight tracking-wider font-semibold uppercase">
              NEW YORK<br />NEW JERSEY
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
