"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/LinkPreview"; // Ensure path is correct
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { link } from "fs";

const SERVICES = [
    {
        id: "01",
        title: "App & Software Development",
        description:
            "Bring your app ideas to life with scalable and secure development. We build native and cross-platform apps and custom software tailored to your business needs.",
        redirectlink: "/Services/service?service=app-development",
        link: "https://newral.com/Services/service?service=app-development",
        previewUrl:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "02",
        title: "Web Development Services",
        description:
            "Build high-performance, conversion-focused websites tailored for your goals. Whether it's a simple website or a dynamic lead generation platform, we've got you covered.",
        redirectlink: "/Services/service?service=web-development",
        link: "https://newral.com/Services/service?service=web-development",
        previewUrl:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "03",
        title: "Branding & Graphic Design",
        description:
            "Our professional branding and graphic design services help create impactful visuals that build trust, strengthen recognition, and clearly communicate your mission to the right audience.",
        redirectlink: "/Services/service?service=branding",
        link: "https://newral.com/Services/service?service=branding",
        previewUrl:
            "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "04",
        title: "UI/UX Design Services",
        description:
            "Craft intuitive and visually stunning user experiences. From basic wireframes to full-fledged prototypes, we design user-first digital products that engage and convert.",
        redirectlink: "https://newral.com/Services/service?service=ui-ux",
        link: "https://newral.com/Services/service?service=ui-ux",
        previewUrl:
            "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "05",
        title: "Social Media Management",
        link: "https://newral.com/Services/service?service=social-media",
        description:
            "Boost your online presence with strategic content creation and active audience engagement. We grow your community while you focus on your business.",
        redirectlink: "/Services/service?service=social-media",
        previewUrl:
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "06",
        title: "DevOps & Cloud Solutions",
        description:
            "Deploy, scale, and secure your applications effortlessly. Our DevOps solutions ensure your infrastructure is optimized for performance and growth.",
        redirectlink: "/Services/service?service=devops",
        link: "https://newral.com/Services/service?service=devops",
        previewUrl:
            "https://images.unsplash.com/photo-1667372333374-9d4458352920?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "07",
        title: "Code Review & Security Services",
        description:
            "Ensure your codebase is clean, secure, and performance-optimized. We provide in-depth audits to help you scale confidently and securely.",
        redirectlink: "/Services/service?service=code-review",
        link: "https://newral.com/Services/service?service=code-review",
        previewUrl:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    },
];


export default function ServicesSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="bg-black font-sans text-white py-24 px-6  min-h-screen">
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

interface ServiceItemProps {
    service: (typeof SERVICES)[0];
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

function ServiceItem({ service, isOpen, onMouseEnter, onMouseLeave }: ServiceItemProps) {
    const router = useRouter();
    return (
        <motion.div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => router.push(service.redirectlink)}
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
                            onClick={() => router.push(service.redirectlink)}
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