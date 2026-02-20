"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Cpu, Video, Zap, ShieldCheck, TrendingUp,
  ArrowUpRight, AlertCircle, CheckCircle2,
  Activity, DollarSign, Clock, Smartphone,
  HardDrive, Search, Database, Layout, Filter
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CompetishunHero from "@/components/imgportal";

// --- DATA SOURCE: DETAILED PERFORMANCE METRICS ---
const PERFORMANCE_COMPARE = [
  { name: 'CPU Cores', before: 32, after: 4 },
  { name: 'CPU Load %', before: 99, after: 15 },
  { name: 'GPU Nodes', before: 3, after: 1 },
  { name: 'Networking Cost (₹)', before: 5000, after: 600 },
];

const STUDENT_GROWTH = [
  { month: "Sep", students: 100, growth: "0%" },
  { month: "Oct", students: 103.8, growth: "3.8%" },
  { month: "Nov", students: 114.6, growth: "10.4%" },
  { month: "Dec", students: 141.4, growth: "23.4%" },
  { month: "Jan", students: 196.4, growth: "38.9%" },
];

const METHODOLOGY = [
  {
    id: "01",
    title: "Infrastructure Audit & Cost Analysis",
    description: "Conducted a deep review of resource mapping to identify inefficiencies and reduce operational costs without impacting performance.",
    outcome: "₹15k → ₹1k Daily Burn"
  },
  {
    id: "02",
    title: "Codebase Performance Profiling",
    description: "Analyzed and refactored backend services to eliminate N+1 query bottlenecks and improve memory processing efficiency.",
    outcome: "99% → 15% CPU Stability"
  },
  {
    id: "03",
    title: "Video Pipeline Architecture Redesign",
    description: "Rebuilt the entire transcoding workflow to enable DRM-protected, multi-bitrate delivery with 92% less lag.",
    outcome: "6 Hours → <30 Mins"
  },
  {
    id: "04",
    title: "UI/UX Evaluation & Optimization",
    description: "Refined user journeys and interface design to deliver a smoother, frictionless learning experience on web and mobile.",
    outcome: "90% Crash Reduction"
  },
  {
    id: "05",
    title: "Monetization Engine Integration",
    description: "Implemented scalable banner and advertisement integration for new revenue streams without degrading page performance.",
    outcome: "Ad-Ready Platform"
  },
  {
    id: "06",
    title: "Zero-Downtime Deployment",
    description: "Implemented a phased rollout strategy to ensure uninterrupted service for thousands of concurrent students during migration.",
    outcome: "Seamless Migration"
  }
];

const FULL_RESULTS = [
  { metric: "CPU Cores", before: "32 Cores", after: "4 Cores", impact: "-87.5%" },
  { metric: "CPU Usage", before: "99%", after: "15%", impact: "-84%" },
  { metric: "GPU Nodes", before: "3 GPUs", after: "1 GPU", impact: "-66%" },
  { metric: "Transcoding Time", before: "6 Hours", after: "< 30 Minutes", impact: "-92%" },
  { metric: "Daily Network Cost", before: "₹5,000", after: "₹600", impact: "-88%" },
  { metric: "App Crash Rate", before: "High Frequency", after: "90% Reduction", impact: "+90% Stable" },
  { metric: "Content Delivery", before: "Slow/Direct", after: "CDN Optimized", impact: "Zero Lag" },
  { metric: "User Experience", before: "Laggy", after: "Smooth & Fluid", impact: "High NPS" },
];

export default function CompetishunCaseStudy() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  return (
    <div className="bg-[#000] text-white font-sans selection:bg-blue-600 overflow-x-hidden">

      <CompetishunHero />

      {/* 2. EXECUTIVE SUMMARY GRID */}
      <section className="relative z-30 px-6 py-20 -mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <StatCard icon={<Cpu />} label="CPU EFFICIENCY" value="99% → 15%" sub="Resource Optimization" />
          <StatCard icon={<DollarSign />} label="OPEX SAVINGS" value="₹5,000 → ₹600" sub="Daily Networking" />
          <StatCard icon={<Clock />} label="VIDEO DELIVERY" value="6h → 30m" sub="Transcoding Speed" />
          <StatCard icon={<ShieldCheck />} label="STABILITY" value="90%" sub="Crash Reduction" />
        </div>
      </section>

      {/* 3. THE PROBLEM & SOLUTION (Bento Grid) */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Key <br /><span className="text-red-500">Problems.</span></h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                The existing infrastructure was facing high operational costs, slow processing, and performance bottlenecks impacting scalability.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProblemBox
                title="Excessive Infra Costs"
                icon={<DollarSign className="text-red-500" />}
                desc="High networking costs and excessive CPU/GPU mapping caused unsustainable financial burn."
              />
              <ProblemBox
                title="Inefficient Video Pipeline"
                icon={<Clock className="text-red-500" />}
                desc="Transcoding took up to 6 hours with no DRM workflow, limiting content freshness."
              />
              <ProblemBox
                title="System Instability"
                icon={<Zap className="text-red-500" />}
                desc="CPU consistently hit 99%, leading to frequent app crashes and user trust issues."
              />
              <ProblemBox
                title="UX Bottlenecks"
                icon={<Smartphone className="text-red-500" />}
                desc="Laggy performance on mobile/web and lack of monetization integration restricted growth."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE COCKPIT (Interactive Data) */}
      <section className="py-24 px-6 md:px-20 bg-zinc-950/50 rounded-[3rem] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter">System Diagnostic</h2>
              <p className="text-zinc-500 mt-4 text-lg">Detailed before and after performance mapping.</p>
            </div>
            <div className="flex gap-4 bg-black p-2 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-red-500 uppercase">
                <div className="w-2 h-2 bg-red-500 rounded-full" /> Legacy
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-blue-500 uppercase bg-blue-500/10 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> Optimized
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-zinc-900/30 p-6 md:p-10 rounded-[2.5rem] border border-white/5 h-[400px] md:h-[500px]">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><Activity size={20} className="text-blue-500" /> Infrastructure Stress Test</h3>
              <div className="w-full h-full pb-10">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PERFORMANCE_COMPARE} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="before" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={35} />
                      <Bar dataKey="after" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={35} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <MetricComparison label="CPU Utilization" old="99%" current="15%" />
              <MetricComparison label="Networking Cost" old="₹5,000" current="₹600" />
              <MetricComparison label="GPU Footprint" old="3 Nodes" current="1 Node" />
              <div className="p-8 bg-blue-600 rounded-[2rem] flex flex-col justify-center items-center text-center">
                <TrendingUp size={40} className="mb-4 text-white" />
                <h4 className="text-3xl font-black italic tracking-tighter">88%</h4>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-200">OPEX COST REDUCTION</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: RESULTS TABLE SECTION */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black tracking-tighter mb-12">Comparative <span className="text-blue-600">Results.</span></h2>
          <div className="overflow-x-auto rounded-[2rem] border border-white/5">
            <table className="w-full text-left border-collapse bg-zinc-900/20">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-900/50">
                  <th className="p-6 text-sm font-black uppercase tracking-widest text-zinc-500">Metric</th>
                  <th className="p-6 text-sm font-black uppercase tracking-widest text-red-500">Before</th>
                  <th className="p-6 text-sm font-black uppercase tracking-widest text-blue-500">After</th>
                  <th className="p-6 text-sm font-black uppercase tracking-widest text-zinc-300 text-right">Impact</th>
                </tr>
              </thead>
              <tbody>
                {FULL_RESULTS.map((res, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-bold">{res.metric}</td>
                    <td className="p-6 text-zinc-500">{res.before}</td>
                    <td className="p-6 text-blue-400 font-bold">{res.after}</td>
                    <td className="p-6 text-right font-mono text-blue-500">{res.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. METHODOLOGY */}
      <section className="py-24 px-6 md:px-20 overflow-hidden">
        <div className=" mx-auto">
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-20">
            Smarter <br /> <span className="text-blue-600 italic">Methodology.</span>
          </h2>

          <div className="border-t border-zinc-800">
            {METHODOLOGY.map((step, index) => (
              <MethodologyItem
                key={step.id}
                step={step}
                isOpen={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. GROWTH ANALYSIS */}
      <div className="flex justify-center items-center w-full bg-zinc-50 py-32">
        <section className="max-w-7xl mx-auto px-6 md:px-20 text-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-blue-600 font-black tracking-widest uppercase text-xs">Business Momentum</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mt-4 mb-8">Accelerating <br /> Adoption.</h2>
              <p className="text-zinc-600 text-lg leading-relaxed mb-10 max-w-md">
                Technical reliability directly drives user engagement. Since optimization, student onboarding has seen accelerating exponential growth.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-4 border-blue-600 pl-6">
                  <p className="text-4xl font-black tracking-tighter">38.9%</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Jan Peak Growth</p>
                </div>
                <div className="border-l-4 border-black pl-6">
                  <p className="text-4xl font-black tracking-tighter">90%</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Uptime Increase</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[3rem] h-[400px] shadow-2xl">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={STUDENT_GROWTH}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload) return (
                          <div className="bg-black p-3 rounded-xl text-white font-bold text-xs shadow-xl">
                            {payload[0].payload.month}: +{payload[0].payload.growth} Growth
                          </div>
                        )
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={6} fillOpacity={1} fill="url(#colorGrowth)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* NEW: CHALLENGES & LESSONS */}
      <section className="py-24 px-6 md:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-3xl font-black tracking-tighter flex items-center gap-4">
              <Layout className="text-blue-500" /> Key Challenges
            </h3>
            <div className="space-y-4">
              <ChallengeItem label="Service Continuity" desc="Maintaining zero-downtime during massive infrastructure migration." />
              <ChallengeItem label="DRM Security" desc="Ensuring content protection while reducing transcoding overhead." />
              <ChallengeItem label="Scalability" desc="Managing peak concurrent users during exam cycles." />
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-3xl font-black tracking-tighter flex items-center gap-4">
              <Database className="text-blue-500" /> Lessons Learned
            </h3>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p><span className="text-white font-bold">1. Efficiency is Business:</span> Infrastructure costs directly impact product scalability and runway.</p>
              <p><span className="text-white font-bold">2. UX Wins:</span> Page speed and crash-free sessions are the primary drivers of user retention in EdTech.</p>
              <p><span className="text-white font-bold">3. No Compromise:</span> Cost reduction doesn't mean performance degradation—it means intelligent engineering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL & CTA */}
      <section className="py-32 px-6 md:px-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl relative">
          <div className="absolute -top-10 -left-10 text-9xl text-blue-500/20 font-serif">“</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-16 relative z-10"
          >
            “Newral is handling complete tech with top most efficiency, they helped us completely transform our platform’s performance and scalability. From major cost optimization to faster video delivery and a smoother user experience, their execution was exceptional. The platform is now more stable, efficient, and growth-ready.”
          </motion.h2>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-blue-600 p-1 mb-4">
              <Image
                src="https://res.cloudinary.com/dyktjldc4/image/upload/v1769785964/image_14_oxlnw4.png"
                alt="Founder" width={100} height={100}
                className="rounded-full object-contain w-full h-full transition-all duration-500"
              />
            </div>
            <h4 className="text-xl font-black uppercase tracking-tighter">Mohit Tyagi</h4>
            <p className="text-zinc-500 font-medium tracking-widest text-xs uppercase">Founder – Competishun</p>
          </div>
        </div>

        <motion.a
          href="https://cal.com/newralfounder"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="mt-24 px-12 py-6 bg-blue-600 rounded-full font-black text-xl tracking-tighter shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center gap-4 group"
        >
          START YOUR OPTIMIZATION
          <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.a>
      </section>

      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-zinc-600 text-xs font-bold tracking-[0.3em] uppercase">© 2024 Newral • Engineering Excellence</p>
      </footer>
    </div>
  );
}

// --- REFINED SUB-COMPONENTS ---

function StatCard({ icon, label, value, sub }: any) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/10 flex flex-col items-start hover:border-blue-500/50 transition-colors">
      <div className="text-blue-500 mb-6">{React.cloneElement(icon, { size: 28 })}</div>
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-1">{value}</h3>
      <p className="text-zinc-500 text-xs font-medium">{sub}</p>
    </div>
  );
}

function ProblemBox({ title, desc, icon }: { title: string, desc: string, icon: any }) {
  return (
    <div className="p-8 bg-zinc-900/20 rounded-[2rem] border border-white/5 hover:bg-zinc-900/40 transition-all group">
      <div className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity">{icon}</div>
      <h4 className="text-lg font-bold mb-2 tracking-tight">{title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ChallengeItem({ label, desc }: { label: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <CheckCircle2 className="text-blue-500 mt-1 shrink-0" size={18} />
      <div>
        <h5 className="font-bold text-white">{label}</h5>
        <p className="text-sm text-zinc-500">{desc}</p>
      </div>
    </div>
  )
}

function MetricComparison({ label, old, current }: { label: string, old: string, current: string }) {
  return (
    <div className="p-6 bg-zinc-900/40 rounded-3xl border border-white/5 flex flex-col justify-between">
      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{label}</span>
      <div className="flex items-baseline justify-between">
        <span className="text-zinc-600 line-through text-lg font-bold">{old}</span>
        <div className="flex items-center gap-2 text-blue-500">
          <ArrowUpRight size={16} />
          <span className="text-2xl font-black tracking-tighter text-white">{current}</span>
        </div>
      </div>
    </div>
  );
}

function MethodologyItem({ step, isOpen, onMouseEnter, onMouseLeave }: any) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      className={cn(
        "relative transition-all duration-500 border-b border-zinc-800 cursor-default",
        isOpen ? "bg-blue-600" : "bg-transparent hover:bg-zinc-900/30"
      )}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-14 px-6 md:px-10 relative z-10">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <span className={cn("font-mono text-xs transition-colors", isOpen ? "text-blue-200" : "text-zinc-600")}>{step.id}</span>
          <h3 className={cn("text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter transition-colors", isOpen ? "text-white" : "text-zinc-300")}>
            {step.title}
          </h3>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="mt-4 md:mt-0 md:max-w-2xl flex flex-col md:flex-row items-start md:items-center justify-between w-full"
            >
              <p className="text-white/90 text-sm md:text-base leading-relaxed font-light md:pr-10 mb-4 md:mb-0">{step.description}</p>
              <div className="md:text-right min-w-fit">
                <span className="text-[10px] block font-black uppercase tracking-widest text-blue-200 mb-1">Impact</span>
                <span className="text-xl md:text-2xl font-bold whitespace-nowrap">{step.outcome}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
