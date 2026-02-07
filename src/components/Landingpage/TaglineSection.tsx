"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const text = "We Build Technology That Accelerates Product Development And Drives Real Business Impact";

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
    <div ref={containerRef} className="relative h-[300vh] bg-[#000000] pt-12 font-sans">
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">

        {/* WRAPPER FOR BOTH CARDS AND TEXT TO KEEP THEM TOGETHER */}
        <div className="flex flex-col h-screen  justify-center items-center w-full max-w-7xl">

         

          {/* TEXT SECTION: margin-top is reduced to mt-4 for a tight fit */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className=" w-full text-center z-20"
          >
            <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-4xl md:text-8xl font-medium leading-none tracking-tight ">
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

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["#111111", "#FFFFFF"]);

  return (
    <motion.span style={{ color }} className="relative inline-block">
      {children}
    </motion.span>
  );
};

export default FinalCardExperience;