"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import PremiumAceternityButton from "../PremiumAceternityButton";

export default function HeroServices() {
  return (
    <section className="h-full w-full relative flex items-center justify-center">
      {/* Content Container */}
      <div className="flex flex-1 h-screen flex-col items-center justify-center px-6 text-center md:px-12">

        {/* Top Glass Badge */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-sm font-medium tracking-wide text-white/90">
              We’ve helped clients secure over $100+M in funding
            </p>
          </div>
        </div>

        {/* Main Title */}
        <h1 className=" relative mb-8 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-white duration-1000 md:text-7xl lg:text-8xl">
          <span className="text-balance">
            We build, maintain, and scale
            <br />
            <span className="italic">robust digital products</span> you can trust
          </span>
        </h1>

        {/* CTA Button */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
         <PremiumAceternityButton/>
        </div>

 <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-20" />
      </div>
      {/* Full Width Bottom Image
      <div className="mt-20 w-full px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl md:rounded-t-[3rem]"
        >
        
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt="Digital Product Showcase"
            className="h-full w-full object-cover"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>
     
        */}
    </section>
  );
}