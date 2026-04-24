"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";


const cardData = [
  {
    id: "01",
    title: "Our Vision",
    description:
      "To build products that don’t just launch — but scale, perform, and succeed in real-world environments.",
  },
  {
    id: "02",
    title: "Our Mission",
    description:
      "To help startups build faster, reduce costs, and engineer systems that are reliable, scalable, and built for growth from day one.",
  },
  {
    id: "03",
    title: "Our Ethics",
    description:
      "We value transparency, ownership, and long-term thinking — building trust through execution, not just promises.",
  },
  {
    id: "04",
    title: "Our Approach",
    description:
      "We focus on clarity over complexity — understanding problems deeply and delivering solutions that actually work at scale.",
  },
];


export default function ExpandableCards() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="bg-black text-white py-20">

            <div className=" px-4 md:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="lg:col-span-6"
                >
                    <h2 className="text-4xl md:text-3xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight">
                     Built on Clarity, <br /> Execution, and Scale
                    </h2>
                </motion.div>
            </div>
            <div className="w-full mt-12 flex flex-col md:flex-row h-150 gap-0 overflow-hidden rounded-lg">
                {cardData.map((card, index) => (
                    <motion.div
                        key={card.id}
                        layout
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="relative flex flex-col justify-between p-8 last:border-r-0 cursor-pointer overflow-hidden group"
                        style={{
                            flex: hoveredIndex === index ? 2 : 1, // Increases width on hover
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        {/* Blue Glow Divider Effect (appears on the left of each card except the first) */}
                        {index !== 0 && (
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-blue-600 to-transparent opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                        )}

                        {/* Top Section: ID */}
                        <div className="relative z-10">
                            <span className="text-sm font-medium text-neutral-500 group-hover:text-white transition-colors">
                                {card.id}
                            </span>
                        </div>

                        {/* Bottom Section: Title and Hidden Text */}
                        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap">
                                {card.title}
                            </h3>

                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="text-white/70 text-sm md:text-base max-w-[300px] leading-relaxed"
                                    >
                                        {card.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Subtle background highlight */}
                        <div className="absolute inset-0 bg-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}