"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
const cardData = [
  {
    id: "01",
    title: "Our Vision",
    description:
      "We aim to be a global leader in digital innovation, turning bold ideas into meaningful products. By challenging the boundaries of AI, cybersecurity, and scalable technology, we build solutions that truly matter.",
  },
  {
    id: "02",
    title: "Our Mission",
    description:
      "Our mission at Newral is to build future-ready digital solutions that not only exhibit innovation, security, and performance attributes, but do so in a sustainable manner with AI-powered technology, automation, and partnerships",
  },
  {
    id: "03",
    title: "Our History",
    description:
      "Newral was founded to close the gap between cutting-edge technology and practical business challenges. From a small team of passionate developers to a global tech agency that offers impactful solutions in artificial intelligence, cybersecurity, software as a service, and digital products, we have grown significantly.",
  },
  {
    id: "04",
    title: "Our Ethics",
    description:
      "Our ethical stance underpins our commitment to trust, partnerships, and excellence in everything we do. Our focus is on transparency, fairness, and quality to create lasting impact."
  },
  {
    id: "05",
    title: "Our Approach",
    description:
      "We believe in clarity over complexity. By understanding problems deeply and executing with precision, we deliver scalable, reliable solutions that support long-term growth.",
  },
];


export default function ExpandableCards() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="bg-black py-20">

            <div className=" px-4 md:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="lg:col-span-6"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-[84px] font-medium leading-[1.2] tracking-tight">
                        Diverse perspectives,<br />
                        World-class work
                    </h2>
                </motion.div>
            </div>
            <div className="w-full mt-12 flex flex-col md:flex-row h-[600px] gap-0 overflow-hidden  rounded-lg">
                {cardData.map((card, index) => (
                    <motion.div
                        key={card.id}
                        layout
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="relative flex flex-col justify-between p-8 border-r border-white/10 last:border-r-0 cursor-pointer overflow-hidden group"
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
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
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
                                        className="text-neutral-400 text-sm md:text-base max-w-[300px] leading-relaxed"
                                    >
                                        {card.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Subtle background highlight */}
                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}