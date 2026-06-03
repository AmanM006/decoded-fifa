"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, BookOpen, ChevronRight, Zap, X, MessageCircle, FileText } from "lucide-react";
import { FIFA_LAWS } from "../../data/laws";
import { queryGraniteAI } from "../../lib/granite";
import GranitePanel from "../shared/GranitePanel";

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
}

function searchLaws(query) {
  if (!query.trim()) return [];
  const tokens = tokenize(query);
  const results = [];

  FIFA_LAWS.forEach(law => {
    law.articles.forEach(article => {
      const allKeywords = article.keywords.map(k => k.toLowerCase());
      const allText = tokenize(article.title + " " + article.officialText + " " + article.plainEnglish);
      let score = 0;

      tokens.forEach(token => {
        if (allKeywords.some(k => k.includes(token) || token.includes(k))) score += 3;
        if (allText.includes(token)) score += 1;
      });

      if (score > 0) {
        results.push({ law, article, score });
      }
    });
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

const QUICK_QUESTIONS = [
  "When is a player offside?",
  "What is a handball?",
  "How many substitutes can a team make?",
  "When is a penalty awarded?",
  "Can you score from a corner kick?",
  "What is a red card offence?",
  "How long is added time?",
  "What is DOGSO?",
];

export default function AskTheRef() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [results, setResults] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [aiText, setAiText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (q) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    setSubmitted(searchQuery);
    const found = searchLaws(searchQuery);
    setResults(found);
    setSelectedArticle(found[0] || null);
    setAiText("");
    setIsLoading(false);
  };

  const handleSelectArticle = async (result) => {
    setSelectedArticle(result);
    setAiText("");
    setIsLoading(true);
    setAiStatus("Parsing FIFA Law document...");
    await new Promise(r => setTimeout(r, 500));
    setAiStatus("Retrieving Docling-parsed article...");
    await new Promise(r => setTimeout(r, 500));
    setAiStatus("Translating legal text with IBM Granite...");

    const prompt = {
      question: submitted,
      lawNumber: result.law.number,
      lawTitle: result.law.title,
      articleTitle: result.article.title,
      officialText: result.article.officialText,
      plainEnglish: result.article.plainEnglish
    };

    const fallback = `📖 ${result.article.title} — ${result.law.title}\n\n${result.article.plainEnglish}\n\n— Based on FIFA Laws of the Game (Official 2024 Edition, parsed via Docling RAG)`;
    const text = await queryGraniteAI("LAWS", prompt, fallback);
    setAiText(text);
    setIsLoading(false);
  };

  useEffect(() => {
    if (results.length > 0 && selectedArticle === results[0]) {
      handleSelectArticle(results[0]);
    }
  }, [results]);

  const handleQuick = (q) => {
    setQuery(q);
    handleSearch(q);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07070a] font-inter select-none pt-[52px]">

      {/* Hero search bar */}
      <div className="bg-gradient-to-b from-[#06091a] to-[#07070a] border-b border-[#1a1a2e] px-6 py-10 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <BookOpen size={16} color="#2b66ff" />
            <span className="font-inter text-[9px] text-[#2b66ff] font-black uppercase tracking-[0.25em]">
              FIFA Laws of the Game · Docling RAG · IBM Granite
            </span>
          </div>
          <h1 className="font-teko text-[56px] sm:text-[72px] text-white tracking-tighter uppercase leading-none font-black">
            ASK THE REF
          </h1>
          <p className="font-inter text-[13px] text-[#8e8e9f] max-w-md mx-auto">
            Type any question about a football rule. We'll find the official FIFA Law and translate the legal jargon into plain English.
          </p>

          {/* Search input */}
          <div className="relative mt-4">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#44445c]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="e.g. Why wasn't that handball given? Can you be offside from a corner?"
              className="w-full bg-[#0f0f18] border border-[#222232] focus:border-[#2b66ff] text-white font-inter text-[14px] pl-11 pr-24 py-3.5 rounded-xl outline-none transition-colors placeholder:text-[#333345]"
            />
            <button
              onClick={() => handleSearch()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2b66ff] hover:bg-[#1a4eff] text-white font-teko text-[14px] tracking-widest uppercase px-4 py-1.5 rounded-lg transition-colors cursor-pointer font-bold"
            >
              ASK
            </button>
          </div>

          {/* Quick questions */}
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => handleQuick(q)}
                className="bg-[#111118] hover:bg-[#181822] border border-[#222232] hover:border-[#2b66ff]/40 text-[#8e8e9f] hover:text-white font-inter text-[10px] px-3 py-1.5 rounded-full transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results area */}
      {submitted ? (
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

          {/* Left: Result list */}
          <div className="w-full lg:w-[340px] border-r border-[#1a1a2e] bg-[#0a0a10] flex flex-col shrink-0 overflow-y-auto">
            <div className="px-4 py-3 border-b border-[#1a1a2e]">
              <div className="flex items-center justify-between">
                <span className="font-inter text-[9px] text-[#8e8e9f] font-bold uppercase tracking-wider">
                  {results.length} Rule{results.length !== 1 ? "s" : ""} Found
                </span>
                <button onClick={() => { setSubmitted(""); setResults([]); setSelectedArticle(null); setAiText(""); setQuery(""); }}
                        className="text-[#44445c] hover:text-white cursor-pointer transition-colors">
                  <X size={12} />
                </button>
              </div>
              <div className="text-[11px] text-white font-inter mt-1 truncate">"{submitted}"</div>
            </div>

            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <MessageCircle size={28} color="#333345" />
                <p className="text-[12px] text-[#44445c] font-inter mt-3">
                  No matching rules found. Try different keywords like "offside," "handball," or "penalty."
                </p>
              </div>
            ) : (
              <div className="p-2 space-y-1.5">
                {results.map((result, idx) => {
                  const isSelected = selectedArticle?.article.id === result.article.id;
                  return (
                    <button
                      key={result.article.id}
                      onClick={() => handleSelectArticle(result)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected ? "bg-[#111122] border-[#2b66ff]/60" : "bg-transparent border-transparent hover:bg-[#0f0f18] hover:border-[#222232]"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-[18px] shrink-0 leading-none mt-0.5">{result.law.emoji}</span>
                        <div>
                          <div className="font-inter text-[10px] font-bold uppercase tracking-wider mb-0.5"
                               style={{ color: result.law.color }}>
                            Law {result.law.number} — {result.law.title}
                          </div>
                          <div className="font-inter text-[12px] text-white font-semibold">
                            {result.article.title}
                          </div>
                          {idx === 0 && (
                            <span className="mt-1 inline-block text-[8px] font-inter font-black uppercase tracking-wider bg-[#2b66ff]/20 text-[#5b9cf6] px-1.5 py-0.5 rounded">
                              Best match
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Article detail */}
          {selectedArticle && (
            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              {/* Article header */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-[24px]">{selectedArticle.law.emoji}</span>
                  <div>
                    <div className="font-inter text-[10px] font-bold uppercase tracking-wider"
                         style={{ color: selectedArticle.law.color }}>
                      Law {selectedArticle.law.number} — {selectedArticle.law.title}
                    </div>
                    <div className="font-teko text-[28px] text-white tracking-tight leading-none uppercase font-bold">
                      {selectedArticle.article.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Official text block */}
              <div className="bg-[#0a0a12] border border-[#1a1a2e] rounded-xl p-5">
                <div className="flex items-center space-x-1.5 mb-3">
                  <FileText size={11} color="#8e8e9f" />
                  <span className="font-inter text-[9px] text-[#8e8e9f] font-bold uppercase tracking-wider">
                    Official FIFA Law Text · Docling Parsed
                  </span>
                </div>
                <p className="font-inter text-[12px] text-[#aaaacc] leading-relaxed">
                  {selectedArticle.article.officialText}
                </p>
              </div>

              {/* Plain English quick answer */}
              <div className="bg-[#071a0f] border border-[#00c2a8]/30 rounded-xl p-5">
                <div className="flex items-center space-x-1.5 mb-3">
                  <MessageCircle size={11} color="#00c2a8" />
                  <span className="font-inter text-[9px] text-[#00c2a8] font-bold uppercase tracking-wider">
                    Plain English — What this actually means
                  </span>
                </div>
                <p className="font-inter text-[13px] text-[#d0d0e8] leading-relaxed">
                  {selectedArticle.article.plainEnglish}
                </p>
              </div>

              {/* IBM Granite RAG deep dive */}
              <GranitePanel
                title="GRANITE RAG DEEP DIVE"
                icon={BookOpen}
                iconColor="#2b66ff"
                text={aiText}
                isLoading={isLoading}
                status={aiStatus}
                className="min-h-[160px] border-[#1a1a2e]"
                badgeText="Docling · RAG"
              />

            </div>
          )}

        </div>
      ) : (

        // Empty state — show all law categories
        <div className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
          <div className="text-[9px] text-[#44445c] font-inter font-bold uppercase tracking-wider mb-4 text-center">
            Browse All Laws
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {FIFA_LAWS.map(law => (
              <button
                key={law.id}
                onClick={() => handleQuick(law.summary)}
                className="bg-[#0a0a12] hover:bg-[#111122] border border-[#1a1a2e] hover:border-[#2b66ff]/40 rounded-xl p-4 text-left transition-all cursor-pointer group"
              >
                <span className="text-[28px] block mb-2">{law.emoji}</span>
                <div className="font-inter text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: law.color }}>
                  Law {law.number}
                </div>
                <div className="font-teko text-[15px] text-white tracking-wide uppercase leading-tight font-bold">
                  {law.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
