"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/tactics",  label: "TACTICS"  },
    { href: "/pressure", label: "PRESSURE" },
    { href: "/vardict",  label: "VARDICT"  },
    { href: "/laws",     label: "ASK REF"  },
    { href: "/drama",    label: "DRAMA"    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[52px] bg-black/80 backdrop-blur-md border-b border-white/8 flex items-center justify-between px-4 md:px-12 select-none">
      
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 shrink-0">
        <Zap size={13} className="text-[#ffd700] fill-[#ffd700]" />
        <div className="flex flex-col leading-none">
          <span className="font-teko text-[18px] font-black text-white tracking-widest uppercase leading-none">
            DECODED
          </span>
          <span className="font-inter text-[9px] text-[#8e8e9f] uppercase tracking-wider font-semibold leading-none">
            World Cup 2026 AI
          </span>
        </div>
      </Link>

      {/* Center Nav Links */}
      <nav className="hidden sm:flex items-center space-x-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 md:px-4 py-1.5 font-teko text-[12px] tracking-widest uppercase transition-all duration-150 border-b-2 ${
                isActive
                  ? "text-white border-b-white font-black"
                  : "text-[#8e8e9f] border-b-transparent hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right controls: Live Indicator */}
      <div className="flex items-center space-x-3 md:space-x-4 shrink-0">
        
        {/* Live Indicator */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c2a8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00c2a8]"></span>
          </span>
          <span className="font-inter text-[9px] md:text-[10px] text-[#8e8e9f] tracking-widest uppercase font-bold">
            LIVE
          </span>
        </div>
      </div>

    </header>
  );
}

