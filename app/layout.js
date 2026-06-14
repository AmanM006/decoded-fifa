import { Teko, Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import KeyboardNav from "../components/KeyboardNav";

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "DECODED — World Cup 2026 AI Explainability Platform",
  description: "Tactics, psychological pressure profiles, and VAR decisions decoded by AI using IBM Granite, Docling, and StatsBomb open data.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${teko.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#07070a] text-[#f0f0f5]">
        <KeyboardNav />
        
        {/* Floating Centered Pill Navbar */}
        <Nav />
        
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        
        {/* Global Footer */}
        <footer className="bg-black py-8 border-t border-[#222232] text-center select-none text-[11px] font-inter text-[#8e8e9f]">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© 2026 DECODED. AI World Cup Analytical Index. All rights reserved.</span>
            <div className="flex items-center space-x-5 font-bold uppercase tracking-wider text-[10px]">
              <span className="text-[#1565c0]">IBM Granite 3.0</span>
              <span>Docling PDF Parser</span>
              <span>StatsBomb Open Data</span>
              <a href="/about" className="text-[#00c2a8] hover:text-white transition-colors">About</a>
            </div>
          </div>
        </footer>


      </body>
    </html>
  );
}
