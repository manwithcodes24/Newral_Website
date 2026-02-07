"use client";

import React from "react";
import { motion } from "framer-motion";

interface ServiceDescriptionProps {
  text: string;
}

const ServiceDescription = ({ text }: ServiceDescriptionProps) => {
  return (
    <section className="relative h-screen flex justify-center items-center bg-black py-24 md:py-32 lg:py-40 px-6 overflow-hidden">
      {/* 
         Consistency Logic: 
         1. max-w-5xl (approx 1024px) ensures the text block doesn't get 
            too wide on a 21-inch monitor, maintaining high-end editorial spacing.
         2. mx-auto keeps it perfectly centered.
      */}
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
          /* 
             Typography Logic:
             text-xl (mobile) -> text-2xl (laptop) -> text-4xl (21" monitor)
             leading-relaxed ensures breathing room between lines.
          */
          className="text-white text-center font-sans font-medium 
                     text-xl md:text-2xl lg:text-3xl xl:text-4xl 
                     leading-relaxed md:leading-snug lg:leading-tight 
                     tracking-tight opacity-90"
        >
          {text}
        </motion.p>
      </div>

      {/* Optional: Very subtle bottom border to separate from next section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default ServiceDescription;