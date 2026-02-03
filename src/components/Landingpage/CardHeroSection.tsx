"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const text = "We make technology that accelerates product development  &  Represents Bottom  line  measures.";

const FinalCardExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // 1. CARDS MOVEMENT
  // Reduced travel distance (from 0 to -120px) to keep it closer to the text
  const cardY = useTransform(smoothProgress, [0, 0.3], [0, -120]);
  const cardScale = useTransform(smoothProgress, [0, 0.3], [1, 0.75]);

  // 2. TEXT ENTRANCE
  // The text now appears much earlier and closer to the cards
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const textY = useTransform(smoothProgress, [0, 0.3], [20, -80]); // Moves up with the cards

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#000000] pt-12 font-sans">
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* WRAPPER FOR BOTH CARDS AND TEXT TO KEEP THEM TOGETHER */}
        <div className="flex flex-col h-screen mt-32 justify-center items-center w-full max-w-7xl">
          
          {/* CARDS SECTION */}
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            className="relative z-50 flex items-center justify-center"
          >
            {/* Top Tilted Card (Blue) */}
            <motion.div
              initial={{ rotate: -20 }}
              className="absolute -top-16 -left-14 pointer-events-none z-10 w bg-[#0066FF] px-12 py-6 rounded-xl shadow-[0_10px_40px_rgba(0,102,255,0.4)] border border-white/20"
            >
              <span className="text-white font-sans text-xl md:text-4xl tracking-tight  ">
                Creating
              </span>
            </motion.div>

            {/* Main Card (Purple) */}
            <div className="bg-[#8A38F5] px-12 py-6 rounded-2xl shadow-[0_10px_40px_rgba(138,56,245,0.4)] border border-white/10">
              <span className="text-white font-sans text-2xl md:text-4xl  tracking-tighter whitespace-nowrap">
                digital experience
              </span>
            </div>
          </motion.div>

          {/* TEXT SECTION: margin-top is reduced to mt-4 for a tight fit */}
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="mt-4 w-full text-center z-20"
          >
            <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-4xl md:text-8xl font-bold leading-none tracking-tight">
              {words.map((word, i) => {
                // Word-by-word reveal starts after the initial grouping animation
                const start = 0.25 + (i / words.length) * 0.65;
                const end = start + (1 / words.length) * 0.65;
                
                return (
                  <Word key={i} progress={smoothProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const color = useTransform(progress, range, ["#111111", "#FFFFFF"]);
  
  return (
    <motion.span style={{ color }} className="relative inline-block">
      {children}
    </motion.span>
  );
};

export default FinalCardExperience;