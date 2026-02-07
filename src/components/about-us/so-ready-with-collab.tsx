"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import GetInTouchButton from "@/components/get-in-touch-button";

export default function SOREADYWITHSECTION() {
  const scrollText = "SO Ready to collaborate with Let’s Redefine Technology Together.";

  return (
    <section className="bg-black pb-14 pt-40 overflow-hidden flex flex-col items-center justify-center relative">
      
      {/* 1. Large Marquee Text Section */}
      <div className="relative w-full flex items-center mb-20">
        {/* Edge Fades: Makes text fade in/out at screen edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 60, // Adjust speed here (higher = slower)
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-[30vw] whitespace-nowrap"
        >
          {/* We repeat the text 4 times to ensure it never gaps on large screens */}
          {[1, 2, 3, 4].map((i) => (
            <span 
              key={i} 
              className="text-white gap-28 text-[6rem] md:text-[8rem] font-bold tracking-tighter pb-20 pt-10"
            >
              {scrollText}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2. Glowing CTA Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* The Aura/Glow behind the button */}
        <div className="absolute -inset-2 bg-[#0DA2FF] rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition duration-1000"></div>
        
        <GetInTouchButton />
      </motion.div>

      {/* Subtle Background Detail (Optional) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}