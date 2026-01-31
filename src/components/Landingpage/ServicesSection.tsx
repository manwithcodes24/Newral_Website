"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview"; // Ensure path is correct
import { cn } from "@/lib/utils";

const SERVICES = [
    {
        id: "01",
        title: "Branding & Graphic Design",
        description: "We design products that people love to use, combining creativity with functionality to craft experiences that are intuitive, visually stunning, and future-ready.",
        link: "https://newral.in/about",
        previewUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "02",
        title: "Web Devlopment",
        description: "Building high-performance, scalable web applications using the latest technologies like Next.js, React, and Node.js with a focus on speed and SEO.",
        link: "https://newral.in/services",
        previewUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "03",
        title: "DevOps Development",
        description: "Streamlining your development workflow with robust CI/CD pipelines, cloud infrastructure management, and automated scaling solutions.",
        link: "https://newral.in/review",
        previewUrl: "https://images.unsplash.com/photo-1667372333374-9d4458352920?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "04",
        title: "Code Review & Security",
        description: "Ensuring your codebase is clean, efficient, and secure. We perform deep audits to identify vulnerabilities and optimize performance bottlenecks.",
        link: "https://newral.in/",
        previewUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    }
];

export default function ServicesSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="bg-black font-sans text-white py-24 px-6 md:px-12 lg:px-20 min-h-screen">
            <div className="mx-auto">
                {/* Main Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-medium mb-20 tracking-tighter leading-[1.1] max-w-6xl"
                >
                    Speed up product development & reduce go-to-market time.
                </motion.h2>

                {/* Accordion List */}
                <div className="border-t border-zinc-800">
                    {SERVICES.map((service, index) => (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            isOpen={hoveredIndex === index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceItem({ service, isOpen, onMouseEnter, onMouseLeave }: any) {
    return (
        <motion.div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cn(
                "relative overflow-hidden transition-all duration-500 border-b border-zinc-800 cursor-pointer",
                isOpen ? "bg-blue-600 border-transparent" : "bg-transparent hover:bg-zinc-900/30"
            )}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 px-4 md:px-8 relative z-10">

                {/* Title & Link Preview Trigger */}
                <div className="flex items-center gap-6">
                    <LinkPreview url={service.link} className="inline-block">
                        <h3 className={cn(
                            "text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300",
                            isOpen ? "text-white" : "text-zinc-300"
                        )}>
                            {service.title}
                        </h3>
                    </LinkPreview>
                </div>

                {/* Content visible only when open */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="mt-4 md:mt-0 md:max-w-3xl justify-between flex w-full items-center gap-6"
                        >
                            <p className="text-white/90 text-sm md:text-base leading-relaxed font-light">
                                {service.description}
                            </p>

                            <div className="flex-shrink-0 flex items-start justify-between gap-4 group/btn">
                                <span className="text-xs font-medium tracking-widest uppercase">Projects</span>
                                <div className="">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background visual element (optional - for the image overlay look) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 top-0 h-full w-1/3 pointer-events-none"
                        style={{
                            backgroundImage: `url(${service.previewUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            maskImage: 'linear-gradient(to left, black, transparent)'
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}