"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectProps {
  data: {
    mainHeading: string;
    title: string;
    tags: string[];
    images: string[];
  };
}

const ProjectSection = ({ data }: ProjectProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % data.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
  };

  // Drag constraints and logic could be added here later
  // The 'x' calculation: 
  // We move by (card width + gap). 
  // On a 70vw card + 2vw gap, we shift based on index.
  const slideWidth = 72; // 70vw (card) + 2vw (gap)

  return (
    <section className="bg-black text-white py-20 lg:py-32 overflow-hidden flex flex-col items-center">
      {/* 1. TOP HEADING */}
      <div className="max-w-6xl px-6 text-center mb-16 lg:mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          {data.mainHeading}
        </motion.h2>
      </div>

      {/* 2. SLIDING CAROUSEL CONTAINER */}
      <div className="relative w-full cursor-grab active:cursor-grabbing">
        
        {/* Navigation Buttons - Overlayed on the sides */}
        <div className="absolute inset-y-0 left-0 w-[15vw] z-30 flex items-center justify-center pointer-events-none">
            <button 
                onClick={prevImage}
                className="p-4 bg-black/20 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-md transition-all pointer-events-auto"
            >
                <ChevronLeft size={32} />
            </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-[15vw] z-30 flex items-center justify-center pointer-events-none">
            <button 
                onClick={nextImage}
                className="p-4 bg-black/20 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-md transition-all pointer-events-auto"
            >
                <ChevronRight size={32} />
            </button>
        </div>

        {/* THE TRACK */}
        <motion.div 
          className="flex gap-[2vw] px-[15vw]" // px aligns the first image to center
          animate={{ x: `-${currentIndex * slideWidth}vw` }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          {data.images.map((img, index) => (
            <motion.div
              key={index}
              animate={{ 
                opacity: currentIndex === index ? 1 : 0.3,
                scale: currentIndex === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.5 }}
              className="relative shrink-0 w-[70vw] aspect-[16/10] rounded-2xl lg:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src={img}
                alt={`Project ${index}`}
                className="w-full h-full object-cover"
              />
              {/* Dim overlay for non-active images */}
              {currentIndex !== index && (
                <div className="absolute inset-0 bg-black/40 transition-opacity" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 3. BOTTOM INFO CONTAINER */}
      <div className="w-full max-w-[85vw]    px-8 md:px-40 mt-12 lg:mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {data.title}
            </h3>
            <div className="flex flex-wrap gap-3">
               {data.tags.map((tag, i) => (
                   <span key={i} className="text-gray-500 text-lg md:text-xl font-medium">
                       {tag} {i !== data.tags.length - 1 && " | "}
                   </span>
               ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectSection;