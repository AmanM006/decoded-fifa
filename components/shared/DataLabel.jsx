import React from "react";

export default function DataLabel({ children, className = "" }) {
  return (
    <h3 className={`text-[10px] sm:text-[11px] text-[#666] font-medium uppercase tracking-widest font-inter ${className}`}>
      {children}
    </h3>
  );
}
