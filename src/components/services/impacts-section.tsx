"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { id: 1, value: "20+", label: "Projects\ncompleted" },
  { id: 2, value: "15+", label: "Happy\nClients" },
  { id: 3, value: "5+", label: "Years of\nexperience" },
  { id: 4, value: "10+", label: "Team\nmembers" },
];

const StatCard = ({ value, label, isActive, onMouseEnter }: { value: string; label: string; isActive: boolean; onMouseEnter: () => void }) => {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      className={`
        relative h-64 md:h-72 lg:h-80 w-full rounded-2xl 
         border border-white/10 
        flex flex-col items-center justify-center overflow-hidden transition-all duration-500
        ${isActive ? "border-white/20 bg-[#0066FF]" : "border-white/5 bg-[#080808]"}
      `}
    >
      {/* THE GRADIENT: Only visible when active/hovered */}
      <div
        className={`
          absolute top-0 left-0 w-48 h-48
          ${isActive ? "" : " bg-[#0055FF] blur-[70px] rounded-full opacity-100 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700"}
        `}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter">
          {value}
        </h3>
        <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mt-2 whitespace-pre-line leading-tight">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

const ImpactSection = () => {
  // Set the first or second card as active by default if you want
  const [activeIndex, setActiveIndex] = useState(1); 

  return (
    <section className="bg-black text-white py-24 px-3 min-h-screen flex flex-col justify-center">
      {/* Container to maintain consistency between 16" and 21" screens */}
      <div className="mx-auto w-full">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Impact we created so far
          </h2>
          <p className="text-white text-lg md:text-xl font-normal leading-relaxed">
         Newral is a technology agency that partners with ambitious startups to design and engineer scalable digital products. We work closely with founding teams to translate ideas into reliable, production-ready software.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
              isActive={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;