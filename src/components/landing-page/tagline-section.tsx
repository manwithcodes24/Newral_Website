"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const text = "We build technology that accelerates product development and drives real business impact";

const FinalCardExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  // Reduced height from 300vh to 140vh for a tighter, faster feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    // Reduced height makes the animation trigger faster
    <div ref={containerRef} className="relative h-[140vh] bg-black font-sans">
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
        <div className="max-w-7xl mx-auto">
          <p className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-2 text-[42px] sm:text-[68px] md:text-[72px] lg:text-[92px] font-bold tracking-tighter leading-[1.1] text-center">
            {words.map((word, i) => {
              // Adjusting the range so the animation feels more sequential and snappy
              const start = i / words.length;
              const end = start + 1 / words.length;

              return (
                <Word key={i} progress={smoothProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const Word = ({
  children,
  progress,
  range
}: {
  children: string,
  progress: MotionValue<number>,
  range: [number, number]
}) => {
  // Color transition: Dark gray to White
  const color = useTransform(progress, range, ["#222222", "#ffffff"]);

  // Subtle lift effect: Move word up slightly as it activates
  const y = useTransform(progress, range, [5, 0]);

  // Subtle scale effect: Pop the word slightly
  const scale = useTransform(progress, range, [0.95, 1]);

  return (
    <motion.span
      style={{ color, y, scale }}
      className="relative inline-block"
    >
      {children}
    </motion.span>
  );
};

export default FinalCardExperience;