"use client";
import React, { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import PremiumAceternityButton from "../PremiumAceternityButton";

const TEXT =
  "Let’s redefine technology together?";

export default function ScrollDrivenHorizontalText() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------------- SCROLL PROGRESS ---------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Smooth scrub (feels premium)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  /* ---------------- HORIZONTAL SCRUB ---------------- */
  /**
   * Scroll down  → moves left
   * Scroll up    → moves right
   */
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["80vw", "-200vw"]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-black"
    >
      {/* Sticky pin */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scroll-driven text */}
        <motion.div
          style={{ x }}
          className="whitespace-nowrap"
        >
          <ScrollText progress={smoothProgress} />
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <PremiumAceternityButton
            size="md"
            label="Get in touch"
            href="https://cal.com/newralfounder"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- TEXT BLOCK ---------------- */

function ScrollText({ progress }: { progress: any }) {
  const words = useMemo(() => TEXT.split(" "), []);

  return (
    <h3 className="flex gap-6 text-[clamp(2rem,8vw,10rem)] font-bold tracking-tighter leading-[1.1] text-white">
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="flex">
          {word.split("").map((char, charIdx) => (
            <Character
              key={charIdx}
              char={char}
              progress={progress}
              index={wordIdx * 4 + charIdx}
              totalCharacters={TEXT.length}
            />
          ))}
          <span className="inline-block w-[2vw]" />
        </span>
      ))}
    </h3>
  );
}

/* ---------------- CHARACTER ANIMATION ---------------- */

function Character({
  char,
  progress,
  index,
  totalCharacters,
}: {
  char: string;
  progress: any;
  index: number;
  totalCharacters: number;
}) {
  const start = index / (totalCharacters * 1.4);
  const end = start + 0.12;

  const randomY = useMemo(
    () => (index % 2 === 0 ? 1 : -1) * (120 + (index % 8) * 16),
    [index]
  );

  const randomRotate = useMemo(
    () => (index % 2 === 0 ? 1 : -1) * (16 + (index % 5) * 4),
    [index]
  );

  const y = useTransform(progress, [start, end], [randomY, 0], {
    clamp: true,
  });

  const rotate = useTransform(progress, [start, end], [randomRotate, 0], {
    clamp: true,
  });

  const opacity = useTransform(progress, [start, end], [0, 1], {
    clamp: true,
  });

  return (
    <motion.span
      style={{ y, rotate, opacity }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}
