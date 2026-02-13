"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";


export default function HeroAboutus() {
  return (
    <>
    <div className="relative z-10 flex h-full items-center px-6 md:px-12">
      <div className="flex flex-col items-center justify-center w-full text-center">

        <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl text-center font-bold leading-[1.1] tracking-tight text-white duration-1000 md:text-7xl lg:text-8xl">
          <span className="text-balance">
           Shaping the future of Technology
          </span>
        </h1>
        {/*
            
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-white/70 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Transforming digital spaces with dynamic shader effects and real-time visual experiences that captivate
                and inspire.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                className="bg-white text-black hover:bg-white/90"
                onClick={() => window.open("https://v0.app/templates/R3n0gnvYFbO", "_blank")}
              >
                Open in v0
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="secondary"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                View Demo
              </MagneticButton>
            </div>
            */}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
        <div className="flex items-center gap-2">
          <p className="font-sans text-xs text-white/60">Scroll to explore</p>
          <ArrowDown size={12} />
        </div>
      </div>
 <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-20" />
      
    </div>
    
    </>
  );
}