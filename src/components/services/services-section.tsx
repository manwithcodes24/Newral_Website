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
    title: "Product Development",
    description:
      "We design and build scalable products from the ground up — engineered for real users, real load, and long-term growth. From MVP to production, every system is built to perform.",
    redirectlink: "/Services/service?service=app-development",
    link: "https://newral.in/Services/service?service=app-development",
    previewUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    title: "Web Platforms",
    description:
      "High-performance web platforms built for speed, scalability, and reliability. Designed to handle traffic, convert users, and grow with your product.",
    redirectlink: "/Services/service?service=web-development",
    link: "https://newral.in/Services/service?service=web-development",
    previewUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    title: "Branding & Design",
    description:
      "Strategic brand systems and design that build trust, communicate clearly, and stand out in competitive markets.",
    redirectlink: "/Services/service?service=branding",
    link: "https://newral.in/Services/service?service=branding",
    previewUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "04",
    title: "UI/UX Design",
    description:
      "User-first product experiences designed to reduce friction, improve engagement, and drive real conversion.",
    redirectlink: "/Services/service?service=ui-ux",
    link: "https://newral.in/Services/service?service=ui-ux",
    previewUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "05",
    title: "Growth & Content",
    description:
      "Content and growth systems built to attract, engage, and retain your audience — focused on consistency and measurable impact.",
    redirectlink: "/Services/service?service=social-media",
    link: "https://newral.in/Services/service?service=social-media",
    previewUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "06",
    title: "DevOps & Infrastructure",
    description:
      "Cloud infrastructure and deployment systems designed for performance, stability, and seamless scaling under real-world demand.",
    redirectlink: "/Services/service?service=devops",
    link: "https://newral.in/Services/service?service=devops",
    previewUrl: "https://images.unsplash.com/photo-1667372333374-9d4458352920?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "07",
    title: "Code Audit & Optimization",
    description:
      "Deep audits to improve performance, eliminate bottlenecks, and make your system secure, efficient, and ready to scale.",
    redirectlink: "/Services/service?service=code-review",
    link: "https://newral.in/Services/service?service=code-review",
    previewUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "08",
    title: "Retainer & Ongoing Support",
    description:
      "A long-term engineering partner to continuously improve, maintain, and scale your product. From bug fixes to new features, we work as an extension of your team.",
    redirectlink: "/Services/service?service=retainer",
    link: "https://newral.in/Services/service?service=retainer",
    previewUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
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
                    className="text-5xl md:text-7xl text-center font-medium mb-20 tracking-tighter leading-[1.1] "
                >
               Products, Systems & Infrastructure — Built to Scale
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
            <LinkPreview url={service.link} className="block w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 relative z-10">

                    {/* Title */}
                    <div className="flex items-center gap-6">
                        <h3 className={cn(
                            "text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300",
                            isOpen ? "text-white md:px-8" : "text-zinc-300"
                        )}>
                            {service.title}
                        </h3>
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

                                <div className="shrink-0 flex items-start justify-between gap-4 group/btn">
                                    <span className="text-xs font-medium tracking-widest uppercase">Learn More</span>
                                    <div>
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </LinkPreview>

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