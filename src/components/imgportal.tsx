"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function CompetishunHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // 1. Fix: Ensure hydration before calculating scroll
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Smooth the scroll progress to prevent "jitter"
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // 3. Transform Logic (Blur, Scale, Opacity)
  // We start blur at 2px and go to 20px as we scroll
  const imageBlur = useTransform(smoothProgress, [0, 0.5], ["blur(2px)", "blur(25px)"]);
  const imageScale = useTransform(smoothProgress, [0, 0.5], [1.1, 0.95]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.5], [0.7, 0.3]);
  
  // Text Parallax
  const textY = useTransform(smoothProgress, [0, 0.5], [0, -150]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  // If not mounted yet, render a static version or empty div to prevent hydration error
  if (!mounted) {
    return <div ref={containerRef} className="h-[180vh] bg-black" />;
  }

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* --- THE IMAGE PORTAL --- */}
        <motion.div 
          style={{ 
            scale: imageScale, 
            filter: imageBlur, 
            opacity: imageOpacity 
          }}
          className="relative w-[94%] md:w-[90%] h-[75vh] md:h-[85vh] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <img
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/dyktjldc4/image/upload/v1769791807/9W6d74zIQjmmrhiQrJlFg5EACE4_zq7hzz.avif"
            alt="Competishun Platform"
          />
          
          {/* Professional Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
          
          {/* Subtle Blue Tint Overlay */}
          <div className="absolute inset-0 bg-blue-600/8 mix-blend-color" />
        </motion.div>

        {/* --- FLOATING CONTENT --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <motion.div style={{ y: textY, opacity: textOpacity }} className="z-10">
            
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Engineering Excellence
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              COMPETISHUN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-800 italic">
                RE-ENGINEERED.
              </span>
            </h1>

            {/* Sub-description */}
            <p className="max-w-xl mx-auto text-zinc-400 text-sm md:text-lg font-medium leading-relaxed opacity-90 px-4">
              Reducing operational overhead by 88% while building a zero-lag 
              infrastructure for India's premier EdTech platform.
            </p>
          </motion.div>
        </div>

        {/* --- SCROLL INDICATOR --- */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-bold ml-1">Scroll</span>
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown size={16} className="text-blue-500" />
            </motion.div>
          </div>
          <div className="w-[1px] h-20 bg-gradient-to-b from-blue-500/50 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}