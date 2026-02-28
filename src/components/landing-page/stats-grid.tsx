"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Zap, Clock, Gauge } from "lucide-react";

interface StatItem {
  id: string;
  number: string;
  text: string;
  className: string;
}

const stats: StatItem[] = [
  {
    id: "1",
    number: "01",
    text: "Reduced CPU utilization to 4 cores from 32 cores",
    className: "min-h-[120px] sm:min-h-[220px] md:min-h-[400px] md:col-span-1 md:row-span-2",
  },
  {
    id: "2",
    number: "02",
    text: "Optimized GPU usage from 3 GPUs to 1 GPU while maintaining flawless video transcoding",
    className: "min-h-[120px] sm:min-h-[200px] md:min-h-[240px] md:col-span-1 md:row-span-1",
  },
  {
    id: "3",
    number: "03",
    text: "Reduced video processing time from 6 hours to under 30 minutes",
    className: "min-h-[120px] sm:min-h-[200px] md:min-h-[240px] md:col-span-1 md:row-span-1",
  },
  {
    id: "4",
    number: "04",
    text: "Reduced CPU utilization from 99% to 15%",
    className: "min-h-[120px] sm:min-h-[200px] md:min-h-[240px] md:col-span-2 md:row-span-1",
  },
];

const StatsGrid = () => {
  return (
    <section className="relative w-full h-full mx-auto p-4 sm:p-6 md:p-12 bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
      {/* Background Decorative Wave */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1123 501" fill="none">
          <path d="M-95.1705 309.78C-85.9168 303.953 -73.5381 296.73..." fill="#0066FF" fillOpacity="0.1" />
        </svg>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative h-full z-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-2 md:gap-5"
      >
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>
    </section>
  );
};

const StatCard = ({ stat }: { stat: StatItem }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent)`
  );

  return (
    <motion.div
      onMouseMove={onMouseMove}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className={`
        ${stat.className}
        group relative bg-[#0066FF] text-white 
        p-6 sm:p-8 rounded-3xl md:rounded-4xl
        flex flex-col justify-between shadow-lg overflow-hidden
      `}
    >
      <motion.div className="absolute inset-0 z-0" style={{ background: spotlight }} />

      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="text-xl md:text-3xl font-bold opacity-40">{stat.number}</span>
          {/* LOGIC-BASED ICONS */}
          <div className="opacity-80">
            {stat.id === "1" && <Cpu size={32} />}
            {stat.id === "2" && <Zap size={32} />}
            {stat.id === "3" && <Clock size={32} />}
            {stat.id === "4" && <Gauge size={32} />}
          </div>
        </div>

        {/* DATA VISUALIZATION AREA */}
        <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
          {stat.id === "1" && <CpuReductionAnim />}
          {stat.id === "2" && <GpuMergeAnim />}
          {stat.id === "3" && <TimeSavingAnim />}
          {stat.id === "4" && <UsageDropAnim />}
        </div>

        <p className="text-sm sm:text-base md:text-2xl font-normal leading-tight">
          {stat.text}
        </p>
      </div>
    </motion.div>
  );
};

// --- DATA ANIMATION COMPONENTS ---

// 1. 32 CORES -> 4 CORES
const CpuReductionAnim = () => (
  <div className="grid grid-cols-8 gap-1 md:gap-2">
    {[...Array(32)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          opacity: i < 4 ? [0.4, 1, 0.4] : 0.05,
          scale: i < 4 ? [1, 1.1, 1] : 0.9
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
        className={`h-3 w-3 md:h-5 md:w-5 rounded-sm ${i < 4 ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white'}`}
      />
    ))}
  </div>
);

// 2. 3 GPUs -> 1 GPU
const GpuMergeAnim = () => (
  <div className="flex items-center gap-6">
    <div className="flex flex-col gap-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 50], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          className="h-4 w-10 bg-white/30 rounded"
        />
      ))}
    </div>
    <motion.div
      animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px white", "0 0 20px white", "0 0 0px white"] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="h-14 w-14 bg-white rounded-xl flex items-center justify-center"
    >
      <Zap size={24} className="text-[#0066FF]" />
    </motion.div>
  </div>
);

// 3. 6 HOURS -> 30 MINUTES
const TimeSavingAnim = () => (
  <div className="w-full space-y-4 px-4">
    <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
      <div className="absolute left-2 -top-4 text-[10px] uppercase font-bold opacity-60">Legacy (6h)</div>
      <motion.div 
        animate={{ x: ["-100%", "100%"] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="h-full w-full bg-white/40" 
      />
    </div>
    <div className="relative h-3 w-full bg-white/20 rounded-full overflow-hidden">
      <div className="absolute left-2 -top-4 text-[10px] uppercase font-bold">Newral (30m)</div>
      <motion.div 
        animate={{ x: ["-100%", "100%"] }} 
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full bg-white shadow-[0_0_15px_white]" 
      />
    </div>
  </div>
);

// 4. 99% -> 15%
const UsageDropAnim = () => (
  <div className="flex items-end gap-2 h-24">
    <div className="flex flex-col items-center gap-2">
       <motion.div 
        animate={{ height: ["90%", "90%"] }}
        className="w-12 md:w-20 bg-white/20 rounded-t-lg"
       />
       <span className="text-[10px] font-bold opacity-50">99%</span>
    </div>
    <motion.div 
      animate={{ height: ["90%", "15%", "90%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-1 bg-white/40 h-full mx-4"
    />
    <div className="flex flex-col items-center gap-2">
       <motion.div 
        animate={{ height: ["15%", "15%"] }}
        className="w-12 md:w-20 bg-white rounded-t-lg shadow-[0_0_20px_white]"
       />
       <span className="text-[10px] font-bold">15%</span>
    </div>
  </div>
);

export default StatsGrid;