"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const text = "We build products that scale. Faster launches. Lower costs. Better performance. Built for startups that move fast and think bigger.";

const FinalSmoothNarrative = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative h-[170vh] bg-black font-sans">
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
        <div className="max-w-6xl mx-auto">
          <p className="flex flex-wrap justify-center gap-x-[1.0em] gap-y-2 text-center">
            {words.map((word, i) => {
              /* 
                 FIX: We distribute the starts between 0 and 0.8 
                 and give each word a 0.2 duration. 
                 This ensures the last word hits 100% completion (0.8 + 0.2 = 1.0)
              */
              const start = (i / words.length) * 0.8;
              const end = start + 0.2;

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
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blur = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);
  const y = useTransform(progress, range, [15, 0]);
  const color = useTransform(progress, range, ["#333333", "#ffffff"]);

  return (
    <motion.span
      style={{
        opacity,
        filter: blur,
        y,
        color,
        willChange: "transform, opacity, filter",
      }}
      className="relative inline-block text-[30px] sm:text-[40px] md:text-[50px] lg:text-[62px] font-bold tracking-tighter leading-[1.1]"
    >
      {children}
    </motion.span>
  );
};

export default FinalSmoothNarrative;