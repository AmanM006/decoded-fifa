"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroV12() {
  const [text, setText] = useState("");
  const fullText = `> INIT DECODED_PLATFORM_V1.0
> CONNECTING TO WATSONX INFERENCE ENGINE... [OK]
> FETCHING STATSBOMB EVENT DATA (WC_2026)... [OK]
> CALIBRATING SAOT MESH PHYSICS... [OK]
> 
> SYSTEM READY. AWAITING USER COMMAND.`;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="min-h-screen bg-black flex flex-col p-6 md:p-12 font-mono text-[#00ff41] select-none">
      
      {/* ASCII Art Header */}
      <div className="whitespace-pre text-[8px] md:text-xs leading-none mb-8 opacity-80 overflow-hidden">
        {`
██████╗ ███████╗    ██████╗  ██████╗ ██████╗ ███████╗██████╗ 
██╔══██╗██╔════╝    ██╔══██╗██╔═══██╗██╔══██╗██╔════╝██╔══██╗
██████╔╝█████╗      ██║  ██║██║   ██║██████╔╝█████╗  ██║  ██║
██╔══██╗██╔══╝      ██║  ██║██║   ██║██╔══██╗██╔══╝  ██║  ██║
██║  ██║███████╗    ██████╔╝╚██████╔╝██║  ██║███████╗██████╔╝
╚═╝  ╚═╝╚══════╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
        `}
      </div>

      {/* Terminal Output */}
      <div className="flex-1 max-w-3xl">
        <div className="text-sm md:text-base leading-loose whitespace-pre-wrap mb-8">
          {text}
          <span className="animate-pulse">_</span>
        </div>

        {text.length === fullText.length && (
          <div className="animate-[fadeIn_0.5s_ease-in]">
            <div className="mb-4 text-xs opacity-50">AVAILABLE MODULES:</div>
            <ul className="space-y-2 mb-8">
              <li><Link href="/tactics" className="hover:bg-[#00ff41] hover:text-black px-2 py-1 transition-colors">[1] TACTICS_AI</Link></li>
              <li><Link href="/pressure" className="hover:bg-[#00ff41] hover:text-black px-2 py-1 transition-colors">[2] STRESS_DNA</Link></li>
              <li><Link href="/vardict" className="hover:bg-[#00ff41] hover:text-black px-2 py-1 transition-colors">[3] VARDICT</Link></li>
              <li><Link href="/laws" className="hover:bg-[#00ff41] hover:text-black px-2 py-1 transition-colors">[4] ASK_THE_REF</Link></li>
            </ul>
            <div className="flex items-center space-x-2">
              <span>$</span>
              <Link href="/tactics" className="border-b border-[#00ff41] pb-0.5 hover:bg-[#00ff41] hover:text-black transition-colors">
                EXECUTE ./start.sh
              </Link>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
