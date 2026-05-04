"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor, Cpu, Globe, ArrowUpRight,
  CheckCircle2, MapPin, Zap, Terminal,
  Minus, Plus, Database, Code2, Server
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ANIMATION HELPER ---
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// --- 1. HERO & REGISTRATION FORM ---
const HeroSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    track: "offline-3-months",
    occupation: "student"
  });

  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder-white/20 text-sm appearance-none";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("🎉 Application Received! We'll contact you within 24 hours.");
        setFormData({ fullName: "", email: "", phone: "", city: "", track: "offline-3-months", occupation: "student" });
      } else {
        alert("Something went wrong 😅");
      }
    } catch (err) {
      alert("Server error 😅");
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-black flex items-center">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] uppercase tracking-widest mb-6 text-blue-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Summer 2025 • Training & Placement Assistance
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85] mb-8">
                Build Systems. <br />
                <span className="text-white/20 italic font-serif">Not just tutorials.</span>
              </h1>
              <p className="text-lg text-white/50 max-w-lg mb-8 leading-relaxed">
                A 3-month intensive bootcamp by <span className="text-white font-bold">NEWRAL</span>. 
                Learn to build, scale, and run reliable systems in an AI-driven world from the people who build them for a living.
              </p>
              
              <div className="flex flex-col gap-4 text-white/40 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-blue-500" />
                  <span>Noida Sector 62 (i-Thum Tower B)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-blue-500" />
                  <span>100% Internship Opportunity (Offline Batch)</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="bg-zinc-950 border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold rotate-12 border-4 border-black">
                100 Seats
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Claim Your Spot 🚀</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono font-bold">Callback within 24 hours</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Full Name" className={inputClass} required />
                  <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className={inputClass} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone" className={inputClass} required />
                  <input name="city" value={formData.city} onChange={handleChange} type="text" placeholder="City" className={inputClass} required />
                </div>
                
                <select name="track" value={formData.track} onChange={handleChange} className={inputClass}>
                  <option value="offline-3-months" className="bg-zinc-900">Offline (Noida): 3 Months - ₹14,999</option>
                  <option value="offline-1-month" className="bg-zinc-900">Offline (Noida): 1 Month - ₹4,999</option>
                  <option value="online-3-months" className="bg-zinc-900">Online: 3 Months - ₹5,999</option>
                  <option value="online-1-month" className="bg-zinc-900">Online: 1 Month - ₹1,999</option>
                </select>

                <select name="occupation" value={formData.occupation} onChange={handleChange} className={inputClass}>
                  <option value="student" className="bg-zinc-900">Student</option>
                  <option value="professional" className="bg-zinc-900">Working Professional</option>
                </select>

                <button
                  disabled={loading}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Apply for Bootcamp →"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- 2. THE ENGINEERING FACULTY (Updated with your Bios) ---
const MENTORS = [
  {
    name: "Yash Rajan Shukla",
    role: "Founder & CEO Newral Inc",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1777369086/Screenshot_2026-04-28_at_15-04-05_Instagram_ns3qxf.png",
    icon: <Cpu size={20} />,
    featured: true,
    bio: "Passionate entrepreneur and founder of CSExplained and Newral, known for his expertise in software development and commitment to educating and inspiring the next generation of coders and tech innovators."
  },
  {
    name: "Ram Bhardwaj",
    role: "Tech Lead • Synappsys",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770395324/Screenshot_2026-02-06_at_21-57-09_Newral_-_Cutting-Edge_Tech_Solutions_for_Scalable_Growth_gjralv.png",
    icon: <Code2 size={20} />,
    featured: false,
    bio: "Founding Engineer at Synappsys. Works on real production systems and infrastructure. Now bringing that experience to help students learn how to actually build projects — not just watch tutorials."
  },
  {
    name: "Bhanu Pratap",
    role: "Tech Lead • Synappsys",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770395324/Screenshot_2026-02-06_at_21-57-17_Newral_-_Cutting-Edge_Tech_Solutions_for_Scalable_Growth_vejsm1.png",
    icon: <Server size={20} />,
    featured: false,
    bio: "Building and managing real-world infrastructure — from deployments to production systems. Helping students become strong developers who can build and scale reliable systems."
  },
];

const TeachersSection = () => (
  <section className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20">
        <Reveal>
          <span className="text-blue-500 text-xs font-mono tracking-widest uppercase mb-4 block">The Faculty</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            THE ENGINEERING FACULTY <br /> 
            <span className="text-zinc-600 italic">Learn from real builders.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MENTORS.map((mentor, index) => (
          <motion.div
            key={mentor.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-[500px] rounded-[2.5rem] border border-zinc-800 bg-zinc-950 overflow-hidden transition-all duration-500 hover:border-blue-500/50"
          >
            <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105">
              <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {mentor.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3 inline-block">
                  {mentor.role}
                </span>
                <h3 className={cn("font-bold text-white mb-2", mentor.featured ? "text-4xl" : "text-2xl")}>{mentor.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {mentor.bio}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- 3. PRICING & PROGRAM DETAILS ---
const PricingSection = () => (
  <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold text-white tracking-tighter mb-4">Summer Tracks</h2>
        <p className="text-white/40 italic">Choose your mode of transformation.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="p-10 rounded-[2.5rem] border border-white/5 bg-black">
          <h3 className="text-xl font-bold text-white mb-4">Remote Online</h3>
          <div className="space-y-4 mb-10">
            <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
              <span>1 Month</span>
              <span className="text-white font-bold">₹1,999</span>
            </div>
            <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
              <span>3 Months</span>
              <span className="text-white font-bold text-2xl">₹5,999</span>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-white/40 mb-10">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Live Interactive Sessions</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Official Certificate</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Real-world Projects</li>
          </ul>
        </div>

        <div className="p-10 rounded-[2.5rem] border-2 border-blue-600 bg-blue-600/5 relative">
          <h3 className="text-xl font-bold text-white mb-4">Academy Offline (Noida)</h3>
          <div className="space-y-4 mb-10">
            <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
              <span>1 Month</span>
              <span className="text-white font-bold">₹4,999</span>
            </div>
            <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
              <span>3 Months</span>
              <span className="text-white font-bold text-2xl">₹14,999</span>
            </div>
          </div>
          <ul className="space-y-3 text-sm text-white/70 mb-10">
            <li className="flex items-center gap-2 text-white font-bold"><CheckCircle2 size={14} className="text-blue-500" /> 100% Internship Opportunity</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Professional Studio Access</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Resume & Portfolio Building</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500" /> Mock Interviews & HR Prep</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// --- 4. FAQ & FOOTER ---
const FAQSection = () => (
  <section className="py-32 px-6 bg-black">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-12 tracking-tighter">Common Questions</h2>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5">
          <h4 className="text-white font-bold mb-2">How does the 1-week free trial work?</h4>
          <p className="text-white/40 text-sm">Experience the curriculum, mentors, and the build environment for 7 days before paying the full fee.</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5">
          <h4 className="text-white font-bold mb-2">Is the internship guaranteed?</h4>
          <p className="text-white/40 text-sm">Yes, for the 3-month offline batch, subject to successful program completion and consistent performance criteria.</p>
        </div>
      </div>
    </div>
  </section>
);

export default function NewralFullPage() {
  return (
    <main className="bg-black text-white selection:bg-blue-600">
      <HeroSection />
      
      <section className="py-24 border-y border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { l: "Faculty", v: "Industry Tech Leads" },
                { l: "Location", v: "Noida Sec 62" },
                { l: "Focus", v: "100% Practical" },
                { l: "Outcome", v: "Real Engineering" }
            ].map(s => (
                <div key={s.l} className="text-center">
                    <p className="text-blue-500 font-mono text-[10px] uppercase mb-1">{s.l}</p>
                    <p className="text-lg font-bold">{s.v}</p>
                </div>
            ))}
        </div>
      </section>

      <TeachersSection />
      
      <section className="py-32 px-6 bg-black flex justify-center">
        <div className="max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-12">Official industrial Certification</h2>
            <div className="p-4 bg-zinc-900 rounded-[2rem] border border-white/10 shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/dyktjldc4/image/upload/v1777372750/ChatGPT_Image_Apr_28_2026_04_08_48_PM_zih8bt.png" 
                  alt="Newral Certification" 
                  className="w-full rounded-2xl opacity-80" 
                />
            </div>
        </div>
      </section>

      <PricingSection />
      <FAQSection />

      <footer className="py-20 bg-zinc-950 border-t border-white/5 text-center">
        <div className="mb-8 flex justify-center gap-8 text-white/30 text-xs font-mono">
            <span>contact@newral.in</span>
            <span>+91-9116768791</span>
        </div>
        <p className="text-[10px] text-white/10 tracking-[0.4em] uppercase">Built by Builders for Builders • Newral Inc.</p>
      </footer>
    </main>
  );
}