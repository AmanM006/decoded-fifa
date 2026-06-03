"use client";

import React, { useEffect, useState } from "react";

export default function TypewriterText({ text, speed = 12 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (!text) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [text, currentIndex, speed]);

  return (
    <span className="font-inter leading-relaxed text-[#ccc] whitespace-pre-line">
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-[6px] h-[15px] bg-[#ffd700] ml-1 animate-[blink_1s_infinite]" />
      )}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
