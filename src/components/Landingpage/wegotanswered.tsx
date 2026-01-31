"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

// FAQ Data with different "sizes" for the bento look
const FAQS = [
    { q: "How do you start a new project?", size: "md:col-span-2 md:row-span-1" },
    { q: "Can we start small and scale later?", size: "md:col-span-2 md:row-span-1" },
    { q: "Do you work with existing teams?", size: "md:col-span-1 md:row-span-1" },
    { q: "What industries do you specialize in?", size: "md:col-span-1 md:row-span-1" },
    { q: "Long-term partnership possible?", size: "md:col-span-1 md:row-span-1" },
    { q: "What is your development process?", size: "md:col-span-1 md:row-span-2" },
    { q: "How do you communicate progress?", size: "md:col-span-2 md:row-span-1" },
    { q: "Time-zone friendly collaboration?", size: "md:col-span-1 md:row-span-1" },
    { q: "Dedicated team or shared resources?", size: "md:col-span-1 md:row-span-1" },
    { q: "Do you build scalable architectures?", size: "md:col-span-2 md:row-span-1" },
    { q: "How do you ensure code quality?", size: "md:col-span-2 md:row-span-1" },
    { q: "Cloud-native or on-prem?", size: "md:col-span-2 md:row-span-1" },
    { q: "Do you follow best security practices?", size: "md:col-span-2 md:row-span-1" },
    { q: "Can you integrate third-party APIs?", size: "md:col-span-2 md:row-span-1" },
    { q: "Do you handle DevOps & CI/CD?", size: "md:col-span-1 md:row-span-1" },
    { q: "Do you provide documentation?", size: "md:col-span-1 md:row-span-1" },
    { q: "How do you approach UX research?", size: "md:col-span-2 md:row-span-1" },
    { q: "How do you handle user testing?", size: "md:col-span-1 md:row-span-1" },
    { q: "Do you design for accessibility?", size: "md:col-span-2 md:row-span-1" },
    { q: "Design system creation?", size: "md:col-span-2 md:row-span-1" },
    { q: "Branding along with product design?", size: "md:col-span-1 md:row-span-1" },
    { q: "What design tools do you use?", size: "md:col-span-1 md:row-span-1" },
    { q: "Collaboration with in-house designers?", size: "md:col-span-2 md:row-span-1" },
    { q: "MVP development support?", size: "md:col-span-2 md:row-span-1" },
    { q: "Can you help with product strategy?", size: "md:col-span-2 md:row-span-1" },
    { q: "Post-launch optimization?", size: "md:col-span-2 md:row-span-1" },
    { q: "Transparent pricing?", size: "md:col-span-1 md:row-span-1" },
    { q: "Any hidden costs?", size: "md:col-span-1 md:row-span-1" },
    { q: "Who owns IP and source code?", size: "md:col-span-2 md:row-span-2" },
    { q: "Client references available?", size: "md:col-span-2 md:row-span-1" },

];

export default function FAQBentoSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

    // This creates the "circle" that reveals the sharp content
    const spotlightMask = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 80%)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden py-24 px-6"
        >
            {/* --- LAYER 1: BLURRED BACKGROUND GRID --- */}
            <div className="absolute inset-0 z-0 opacity-20 blur-md scale-105 pointer-events-none">
                <BentoGrid />
            </div>

            {/* --- LAYER 2: SHARP REVEALED GRID (VISIBLE ON HOVER) --- */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
                style={{
                    maskImage: spotlightMask,
                    WebkitMaskImage: spotlightMask,
                }}
            >
                <BentoGrid />
            </motion.div>

            {/* --- LAYER 3: CENTRAL CONTENT --- */}
            <div className="relative z-30 max-w-3xl pointer-events-none text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-8xl font-sans font-medium text-white mb-2 tracking-tighter">
                        Got question?
                    </h2>
                    <h3 className="text-5xl md:text-8xl font-sans font-medium text-white mb-8 tracking-tighter">
                        We got answered.
                    </h3>

                    <p className="text-white pointer-events-none text-lg font-sans md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        <span className="text-blue-600 font-medium">Newral</span> is a technology agency that partners with ambitious startups
                        to design and engineer scalable digital products. We work closely
                        with founding teams to translate ideas into reliable, production-ready software.
                    </p>

                    <motion.a
                        href="https://cal.com/newral"
                        target="_blank"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-sans py-5 px-10 rounded-full text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                    >
                        Book a call with us
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

// The Bento Layout Component
function BentoGrid() {
    return (
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4  w-full h-full  mx-auto">
            {FAQS.map((faq, i) => (
                <motion.div
                    key={i}
                    className={`col-span-2 row-span-2 ${faq.size} bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 flex items-center justify-center text-center`}
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 5 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1,
                    }}
                >
                    <span className="text-white text-sm md:text-xl font-light tracking-wide md:px-2">
                        {faq.q}
                    </span>
                </motion.div>
            ))}
            {/* Filling extra space for that full Pinterest look */}
            <div className="hidden lg:block col-span-2 row-span-1 bg-zinc-900/20 border border-zinc-800/30 rounded-3xl" />
            <div className="hidden lg:block col-span-1 row-span-2 bg-zinc-900/20 border border-zinc-800/30 rounded-3xl" />
        </div>
    );
}