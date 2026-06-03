"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardNav() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      // Skip if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key.toLowerCase()) {
        case "t": router.push("/tactics"); break;
        case "p": router.push("/pressure"); break;
        case "v": router.push("/vardict"); break;
        case "h": router.push("/"); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
