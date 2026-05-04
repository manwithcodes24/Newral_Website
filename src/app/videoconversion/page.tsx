"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Globe, 
  X, 
  Check, 
  ChevronDown, 
  Languages, 
  Sparkles,
  Loader2,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

const AVAILABLE_LANGUAGES = [
  "Hindi", "Spanish", "French", "German", "Japanese", 
  "Mandarin", "Russian", "Arabic", "Portuguese", "Korean",
  "Italian", "Dutch", "Turkish", "Vietnamese"
];

export default function VideoTranslatorPrototype() {
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const filteredLanguages = AVAILABLE_LANGUAGES.filter(lang => 
    lang.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedLangs.includes(lang)
  );

  const toggleLanguage = (lang: string) => {
    if (selectedLangs.includes(lang)) {
      setSelectedLangs(selectedLangs.filter(l => l !== lang));
    } else {
      setSelectedLangs([...selectedLangs, lang]);
      setSearchQuery("");
    }
  };

  const handleStartConversion = () => {
    if (selectedLangs.length === 0) return alert("Please select at least one language");
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate Processing Progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            alert("✅ Video conversion complete!");
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
           
            <h1 className="text-xl font-bold tracking-tighter">Synappses.in<span className="text-blue-500"></span></h1>
          </div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">AI Video Localizer v1.0</div>
        </header>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Left: Video Preview (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="relative aspect-video bg-zinc-900 rounded-[2rem] border border-white/10 overflow-hidden group shadow-2xl">
              {/* Mock Video Content */}
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <video controls className="" src="https://res.cloudinary.com/dmpsz3ohd/video/upload/v1777899148/wovlyryk6hlpukxlfakv.mp4"></video>
                
              </div>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 rounded-2xl">
                <h4 className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-2">Video Metadata</h4>
                <p className="text-sm text-white/60">Product_Demo_Final_v2.mp4 • 48.2 MB • 4K Resolution</p>
            </div>
          </div>

          {/* Right: Controls (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-zinc-950 border border-white/10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-6 tracking-tight">Translation Settings</h3>
              
              <div className="space-y-6">
                
                {/* Language Multi-Select */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Target Languages</label>
                  
                  <div className="relative">
                    <div 
                      className="min-h-[56px] p-2 bg-white/5 border border-white/10 rounded-xl flex flex-wrap gap-2 cursor-text focus-within:border-blue-500 transition-all"
                      onClick={() => setIsDropdownOpen(true)}
                    >
                      {selectedLangs.map(lang => (
                        <span key={lang} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-medium animate-in zoom-in-95 duration-200">
                          {lang}
                          <button onClick={(e) => { e.stopPropagation(); toggleLanguage(lang); }}>
                            <X size={14} className="hover:text-black transition-colors" />
                          </button>
                        </span>
                      ))}
                      <input 
                        type="text"
                        placeholder={selectedLangs.length === 0 ? "Search languages..." : ""}
                        className="bg-transparent outline-none flex-1 min-w-[120px] text-sm px-2"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsDropdownOpen(true);
                        }}
                      />
                      <ChevronDown className={cn("absolute right-4 top-5 text-white/20 transition-transform", isDropdownOpen && "rotate-180")} size={16} />
                    </div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl max-h-[240px] overflow-y-auto custom-scrollbar"
                          >
                            {filteredLanguages.length > 0 ? (
                              filteredLanguages.map(lang => (
                                <button
                                  key={lang}
                                  onClick={() => toggleLanguage(lang)}
                                  className="w-full px-4 py-3 text-left text-sm hover:bg-blue-600 transition-colors flex justify-between items-center group"
                                >
                                  {lang}
                                  <Plus size={14} className="opacity-0 group-hover:opacity-100" />
                                </button>
                              ))
                            ) : (
                              <div className="p-4 text-center text-xs text-white/20 font-mono">No languages found</div>
                            )}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <label className="text-[10px] font-mono text-white/40 uppercase block mb-2">Dubbing Quality</label>
                    <select className="bg-transparent text-sm font-bold w-full outline-none">
                      <option className="bg-zinc-900">Studio HD</option>
                      <option className="bg-zinc-900">Standard</option>
                    </select>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <label className="text-[10px] font-mono text-white/40 uppercase block mb-2">Lip Sync</label>
                    <select className="bg-transparent text-sm font-bold w-full outline-none">
                      <option className="bg-zinc-900">Enabled</option>
                      <option className="bg-zinc-900">Disabled</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  disabled={isProcessing || selectedLangs.length === 0}
                  onClick={handleStartConversion}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-2xl font-bold uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing {progress}%
                    </>
                  ) : (
                    <>
                      <Globe size={18} />
                      Generate Dubbing
                    </>
                  )}
                </button>

                {/* Processing Progress Bar */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-blue-500" 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-[10px] font-mono text-center text-white/30 uppercase tracking-widest">
                        Encoding audio layers for {selectedLangs.length} languages
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Hint Box */}
            <div className="flex gap-4 p-6 bg-blue-600/5 border border-blue-600/20 rounded-2xl">
                <Sparkles className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-200/60 leading-relaxed">
                    Our AI will preserve the original speaker's voice characteristics, tone, and emotion across all selected languages using neural voice cloning.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Icons for logic
const Plus = ({ className, size }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} height={size || 24} 
        viewBox="0 0 24 24" fill="none" stroke="currentColor" 
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className={className}
    >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);