"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Zap, Clock, Gauge } from "lucide-react";
const stats = [
  {
    id: "1",
    number: "01",
    text: "8x More Efficient Infrastructure (32 → 4 cores)",
    className: "md:col-span-1 md:row-span-2 min-h-[250px]",
  },
  {
    id: "2",
    number: "02",
    text: "66% Reduction in GPU Costs (3 → 1 GPU)",
    className: "md:col-span-1 md:row-span-1 min-h-[180px]",
  },
  {
    id: "3",
    number: "03",
    text: "12x Faster Processing (6h → 30min)",
    className: "md:col-span-1 md:row-span-1 min-h-[180px]",
  },
  {
    id: "4",
    number: "04",
    text: "Massive Load Optimization (99% → 15%)",
    className: "md:col-span-2 md:row-span-1 min-h-[180px]",
  },
];

const StatsGrid = () => {
  return (
    <section className="w-full h-full mx-auto p-4 md:p-10 bg-white relative overflow-y-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative h-full z-10 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>
    </section>
  );
};

const StatCard = ({ stat }: { stat: any }) => {
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
    ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent)`
  );

  return (
    <motion.div
      onMouseMove={onMouseMove}
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className={`${stat.className} group relative bg-[#0066FF] text-white p-6 rounded-[32px] flex flex-col justify-between shadow-lg overflow-hidden`}
    >
      <motion.div className="absolute inset-0 z-0" style={{ background: spotlight }} />
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="text-2xl font-bold opacity-40">{stat.number}</span>
          <div className="opacity-80">
            {stat.id === "1" && <Cpu size={28} />}
            {stat.id === "2" && <Zap size={28} />}
            {stat.id === "3" && <Clock size={28} />}
            {stat.id === "4" && <Gauge size={28} />}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center my-4">
          {stat.id === "1" && <CpuReductionAnim />}
          {stat.id === "2" && <GpuMergeAnim />}
          {stat.id === "3" && <TimeSavingAnim />}
          {stat.id === "4" && <UsageDropAnim />}
        </div>
        <p className="text-lg md:text-xl font-bold leading-tight">{stat.text}</p>
      </div>
    </motion.div>
  );
};

// --- DATA ANIMATION COMPONENTS (Restored Exactly) ---
const CpuReductionAnim = () => (
  <div className="grid grid-cols-8 gap-1">
    {[...Array(32)].map((_, i) => (
      <motion.div key={i} animate={{ opacity: i < 4 ? [0.4, 1, 0.4] : 0.05 }} className="h-2 w-2 md:h-3 md:w-3 bg-white rounded-sm" />
    ))}
  </div>
);

const GpuMergeAnim = () => (
  <div className="flex items-center gap-4">
    <div className="flex flex-col gap-1">
      {[...Array(3)].map((_, i) => (
        <motion.div key={i} animate={{ x: [0, 30], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} className="h-2 w-8 bg-white/30 rounded" />
      ))}
    </div>
    <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-[#0066FF]"><Zap size={20} /></div>
  </div>
);

const TimeSavingAnim = () => (
  <div className="w-full space-y-3 px-2">
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="h-full w-full bg-white/40" /></div>
    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="h-full w-full bg-white shadow-[0_0_10px_white]" /></div>
  </div>
);

const UsageDropAnim = () => (
  <div className="flex items-end gap-4 h-16">
    <div className="w-10 bg-white/20 h-[90%] rounded-t-sm" />
    <motion.div animate={{ height: ["90%", "15%", "90%"] }} transition={{ duration: 3, repeat: Infinity }} className="w-0.5 bg-white/40 h-full" />
    <div className="w-10 bg-white h-[15%] rounded-t-sm shadow-[0_0_10px_white]" />
  </div>
);

export default StatsGrid;