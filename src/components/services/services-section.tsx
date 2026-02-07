"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/LinkPreview"; // Ensure path is correct
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "01",
    title: "Branding & Graphic Design",
    description:
      "We craft bold, memorable brand identities and visuals that build trust, stand out, and clearly communicate your story across every touchpoint.",
    link: "https://newral.in/services/branding",
    previewUrl:
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    title: "Web Development",
    description:
      "High-performance, SEO-friendly websites and web apps built with modern stacks like Next.js, React, and Node.js—fast, scalable, and conversion-focused.",
    link: "https://newral.in/services/web-development",
    previewUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    title: "App & Software Development",
    description:
      "From idea to launch, we build secure and scalable mobile apps and custom software tailored to your business goals and users.",
    link: "https://newral.in/services/app-development",
    previewUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "04",
    title: "UI/UX Design",
    description:
      "User-first designs that look great and feel effortless. From wireframes to high-fidelity prototypes, we design experiences people love using.",
    link: "https://newral.in/services/ui-ux",
    previewUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "05",
    title: "DevOps & Cloud Solutions",
    description:
      "We help you deploy, scale, and maintain applications with clean CI/CD pipelines, cloud infrastructure, and performance-ready systems.",
    link: "https://newral.in/services/devops",
    previewUrl:
      "https://images.unsplash.com/photo-1667372333374-9d4458352920?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "06",
    title: "Code Review & Security",
    description:
      "Deep code audits to ensure your systems are secure, efficient, and production-ready—so you can scale with confidence.",
    link: "https://newral.in/services/code-review",
    previewUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "07",
    title: "Social Media Management",
    description:
      "Strategy-led content and active engagement that builds brand presence, grows community, and keeps your audience hooked.",
    link: "https://newral.in/services/social-media",
    previewUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
  },
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
                    className="text-5xl md:text-7xl text-center font-medium mb-20 tracking-tighter leading-[1.1] w-full max-w-6xl mx-auto"
                >
                   What we build and maintain and scale
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