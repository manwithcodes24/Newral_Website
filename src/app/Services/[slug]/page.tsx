"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { useRef, useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown } from "lucide-react"
import ServiceDescription from "@/components/servicesDetails/service-description"
import ProjectSection from "@/components/servicesDetails/project-section"

const SERVICES = [
    {
        id: "01",
        slug: "app-development",
        title: "App & Software Development",
        description: "We start by conducting thorough research, diving into your audience’s behaviors, preferences, and pain points. We also analyze current market trends and the competitive landscape to uncover opportunities and insights that can set your product apart. This research-driven foundation ensures that the product we design aligns with the real needs of your users and positions your business for success.",
        previewUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
        mainHeading: "Speed up product development & reduce go-to-market time.",
        subtitle: "Fintech App Ecosystem",
        tags: ["Mobile App", "iOS & Android", "React Native"],
        images: [
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
             "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: "02",
        slug: "web-development",
        title: "Web Development Services",
        description: "Our web development process focuses on building high-performance, conversion-optimized platforms. We leverage modern frameworks to create seamless digital experiences that scale with your traffic and business goals.",
        previewUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        mainHeading: "Scalable web architectures for modern enterprises.",
        subtitle: "E-Commerce SaaS Platform",
        tags: ["Next.js", "Web Design", "Full-Stack"],
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: "03",
        slug: "branding",
        title: "Branding & Graphic Design",
        description: "We create visual identities that resonate. From typography to color theory, we ensure your brand tells a consistent and compelling story across every touchpoint, building immediate trust with your audience.",
        previewUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80",
        mainHeading: "Visual identities that define market leaders.",
        subtitle: "Newral Brand Identity System",
        tags: ["Branding", "Logo Design", "Visual Guidelines"],
        images: [
            "https://images.unsplash.com/photo-1634942537034-2531766767d7?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: "04",
        slug: "ui-ux",
        title: "UI/UX Design Services",
        description: "Design is more than how it looks; it's how it works. Our UI/UX team focuses on user-centric journeys that minimize friction and maximize engagement, turning complex features into intuitive interactions.",
        previewUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80",
        mainHeading: "Crafting intuitive journeys for complex products.",
        subtitle: "SaaS Dashboard Redesign",
        tags: ["UI Design", "UX Research", "Figma"],
        images: [
            "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: "05",
        slug: "social-media",
        title: "Social Media Management",
        description: "We grow communities, not just follower counts. Our strategic approach to social media ensures your brand stays relevant and active, driving organic traffic and building real relationships.",
        previewUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
        mainHeading: "Organic growth driven by community engagement.",
        subtitle: "Global Tech Campaign",
        tags: ["Strategy", "Content", "Growth"],
        images: [
            "https://images.unsplash.com/photo-1611162616475-46b635cbca86?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: "06",
        slug: "devops",
        title: "DevOps & Cloud Solutions",
        description: "Automate your workflow and secure your infrastructure. Our DevOps solutions bridge the gap between development and operations, ensuring rapid deployments and high availability.",
        previewUrl: "https://images.unsplash.com/photo-1667372333374-9d4458352920?auto=format&fit=crop&w=800&q=80",
        mainHeading: "Infrastructure that scales as fast as your ideas.",
        subtitle: "AWS Cloud Migration",
        tags: ["Kubernetes", "CI/CD", "Security"],
        images: [
            "https://images.unsplash.com/photo-1667372333374-9d4458352920?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
        ]
    },
    {
        id: "07",
        slug: "code-review",
        title: "Code Review & Security Services",
        description: "Security is non-negotiable. Our deep-dive code reviews identify vulnerabilities and performance bottlenecks before they reach production, keeping your data and users safe.",
        previewUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        mainHeading: "Bulletproof code for high-stakes environments.",
        subtitle: "Security Audit 2024",
        tags: ["Audit", "Security", "Clean Code"],
        images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
        ]
    },
];

function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const shaderContainerRef = useRef<HTMLDivElement>(null);

    // Dynamic State Management
    const activeSlug = searchParams.get("service") || "ui-ux";
    const activeIndex = SERVICES.findIndex(s => s.slug === activeSlug);
    const activeService = SERVICES[activeIndex] || SERVICES[3];

    // Logic for the "Next Image" in the heading
    const nextService = SERVICES[(activeIndex + 1) % SERVICES.length];

    const handleTabChange = (slug: string) => {
        router.push(`?service=${slug}`, { scroll: false });
    };

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <main className="relative bg-black min-h-screen">
            <CustomCursor />
            <GrainOverlay />

            <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                {/* Shader Background */}
                <div ref={shaderContainerRef} className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                    <Shader className="h-full w-full">
                        <Swirl colorA="#0000FE" colorB="#0A0A0A" speed={0.8} detail={0.8} blend={50} />
                        <ChromaFlow baseColor="#0A0A0A" upColor="#0000FE" downColor="#0A0A0A" leftColor="#6666FE" rightColor="#CCCCFF" intensity={0.9} radius={1.8} momentum={25} maskType="alpha" opacity={0.97} />
                    </Shader>
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                    <div className="flex gap-14 flex-col items-center select-none">
                        {/* Heading Row 1 */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
                        >
                            Human
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`hero1-${activeService.id}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    src={activeService.previewUrl}
                                    className="h-16 md:h-24 lg:h-28 w-24 md:w-36 lg:w-40 object-cover rounded-2xl border border-white/10 shadow-2xl"
                                />
                            </AnimatePresence>
                            first design
                        </motion.h1>

                        {/* Heading Row 2 */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2 -mt-4 md:-mt-8"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`hero2-${nextService.id}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    src={nextService.previewUrl}
                                    className="h-16 md:h-24 lg:h-28 w-24 md:w-36 lg:w-40 object-cover rounded-2xl border border-white/10 shadow-2xl"
                                />
                            </AnimatePresence>
                            modern products
                        </motion.h1>
                    </div>

                    {/* Shadcn Tabs */}
                    <div className="relative py-12">
                        <Tabs value={activeService.slug} onValueChange={handleTabChange} className="w-full flex flex-col items-center">
                            <TabsList className="bg-transparent h-auto flex flex-wrap justify-center gap-2 md:gap-4">
                                {SERVICES.map((service) => (
                                    <TabsTrigger
                                        key={service.id}
                                        value={service.slug}
                                        className="rounded-full px-6 py-2.5 text-sm md:text-base transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400 hover:text-white border border-transparent data-[state=active]:border-blue-400/50"
                                    >
                                        {service.slug === 'ui-ux' ? 'UI/UX Design' : service.title.split(' ')[0] + (service.title.split(' ')[1] ? ' ' + service.title.split(' ')[1] : '')}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                </div>

                <div className="absolute bottom-12 flex items-center gap-2">
                    <p className="font-sans text-xs text-white/60">Scroll to explore</p>
                    <ArrowDown size={12} className="animate-bounce" />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
            </section>

            {/* SECTIONS BEYOND HERO */}
            <div className="relative z-30">
                {/* Dynamically updates text based on URL */}
                <ServiceDescription text={activeService.description} />

                {/* Dynamically updates images and project info based on URL */}
                <ProjectSection
                    data={{
                        mainHeading: activeService.mainHeading,
                        title: activeService.subtitle,
                        tags: activeService.tags,
                        images: activeService.images
                    }}
                />
            </div>
        </main>
    )
}

export default function Home() {
    return (
        <Suspense fallback={<div className="bg-black h-screen" />}>
            <HomeContent />
        </Suspense>
    )
}