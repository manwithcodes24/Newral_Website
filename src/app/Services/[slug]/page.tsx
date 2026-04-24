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
        maintittle: "Build apps that scale perform reliably",
        title: "App/Software Development",
        description:
            "We build high-performance applications designed for real-world usage — not just demos. From MVP to production, every system is engineered for scalability, reliability, and long-term maintainability.",
        previewUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60",
        previewUrl2: "https://images.unsplash.com/photo-1650636353551-1275516077b6?w=500&auto=format&fit=crop&q=60",
        mainHeading: "Build applications that scale from day one.",
        tegLine: "Engineered for performance, stability, and long-term growth.",
        tags: ["Mobile Apps", "Full-Stack", "Scalable Systems"],
        images: [
            "https://images.unsplash.com/photo-1763568258415-6f6a78a4ef18?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1763568258177-4ea94966595a?w=500&auto=format&fit=crop&q=60",
            "https://plus.unsplash.com/premium_photo-1683262038148-2ac280407276?w=500&auto=format&fit=crop&q=60"
        ]
    },

    {
        id: "02",
        slug: "web-development",
        maintittle: "High performance web platforms built scale",
        title: "Web Development",
        description:
            "We build fast, scalable web platforms that handle real traffic and real users. Designed for performance, optimized for growth, and built to stay reliable under load.",
        previewUrl: "https://images.unsplash.com/photo-1617240016072-d92174e44171?w=500&auto=format&fit=crop&q=60",
        previewUrl2: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=500&auto=format&fit=crop&q=60",
        mainHeading: "Web platforms built for speed and scale.",
        tegLine: "Optimized for performance, conversion, and reliability.",
        tags: ["Next.js", "Full-Stack", "High Performance"],
        images: [
            "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&auto=format&fit=crop&q=60"
        ]
    },

    {
        id: "03",
        slug: "branding",
        maintittle: "Brand systems that build trust authority",
        title: "Branding & Design",
        description:
            "We design brand systems that communicate clearly, build trust, and stand out in competitive markets. Every visual element is built for consistency, clarity, and long-term recognition.",
        previewUrl: "https://images.unsplash.com/photo-1613759612065-d5971d32ca49?w=500&auto=format&fit=crop&q=60",
        previewUrl2: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&auto=format&fit=crop&q=60",
        mainHeading: "Build a brand that people trust and remember.",
        tegLine: "Strategic design that strengthens identity and positioning.",
        tags: ["Branding", "Identity", "Design Systems"],
        images: [
            "https://images.unsplash.com/photo-1716471330463-f475b00f0506?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1636247498719-a8a04ed961a4?w=500&auto=format&fit=crop&q=60"
        ]
    },

    {
        id: "04",
        slug: "ui-ux",
        maintittle: "Design experiences users trust engage convert",
        title: "UI/UX Design",
        description:
            "We design user experiences that reduce friction, improve engagement, and drive real results. Every interface is built with clarity, usability, and conversion in mind.",
        previewUrl: "https://images.unsplash.com/photo-1621111848501-8d3634f82336?w=500&auto=format&fit=crop&q=60",
        previewUrl2: "https://images.unsplash.com/photo-1690369519543-c81a2121f740?w=500&auto=format&fit=crop&q=60",
        mainHeading: "Design products users actually enjoy using.",
        tegLine: "Built for usability, engagement, and conversion.",
        tags: ["UI Design", "UX Research", "Product Design"],
        images: [
            "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1690228254548-31ef53e40cd1?w=500&auto=format&fit=crop&q=60"
        ]
    },

    {
        id: "05",
        slug: "social-media",
        maintittle: "Growth systems content strategy real engagement",
        title: "Social Media & Growth",
        description:
            "We build content and growth systems that drive consistent engagement and real audience growth. Focused on strategy, execution, and measurable results.",
        previewUrl: "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=500&auto=format&fit=crop&q=60",
        previewUrl2: "https://images.unsplash.com/photo-1553532435-93d532a45f15?w=500&auto=format&fit=crop&q=60",
        mainHeading: "Grow your brand with strategy, not guesswork.",
        tegLine: "Content and growth built for consistency and impact.",
        tags: ["Growth", "Content", "Strategy"],
        images: [
            "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60"
        ]
    },

    {
        id: "06",
        slug: "devops",
        maintittle: "Infrastructure that scales handles real demand",
        title: "DevOps & Cloud",
        description:
            "We design and manage infrastructure that scales efficiently under real-world demand. From CI/CD to cloud architecture, everything is built for reliability and performance.",
        previewUrl: "https://images.unsplash.com/photo-1599949104055-2d04026aee1e?w=500&auto=format&fit=crop&q=60",
        previewUrl2: "https://plus.unsplash.com/premium_photo-1733306493254-52b143296396?w=500&auto=format&fit=crop&q=60",
        mainHeading: "Infrastructure built for scale and reliability.",
        tegLine: "Optimized systems that perform under pressure.",
        tags: ["Cloud", "CI/CD", "Scalability"],
        images: [
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?w=500&auto=format&fit=crop&q=60"
        ]
    },

    {
        id: "07",
        slug: "code-review",
        maintittle: "Audit optimize secure production ready systems",
        title: "Code Review & Security",
        description:
            "We audit and optimize your codebase to improve performance, eliminate bottlenecks, and secure your system before it scales.",
        previewUrl: "https://plus.unsplash.com/premium_photo-1683134329824-6f2d0af14ccf?w=500&auto=format&fit=crop&q=60",
        previewUrl2: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60",
        mainHeading: "Make your system secure, clean, and scalable.",
        tegLine: "Deep audits that improve performance and reliability.",
        tags: ["Security", "Audit", "Optimization"],
        images: [
            "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop&q=60"
        ]
    }
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
    const words = activeService.maintittle.split(" ");

    // Row 1 parts
    const firstWord = words[0] || "";
    const nextWords = words.slice(1, 3).join(" ");

    // Row 2 remaining
    const remainingWords = words.slice(3).join(" ");

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
                            className="text-6xl md:text-8xl lg:text-8xl font-bold tracking-tighter text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
                        >
                            {firstWord}

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`hero1-${activeService.id}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    src={activeService.previewUrl}
                                    className="h-16 md:h-24 lg:h-28 w-24 md:w-36 lg:w-40 object-cover rounded-2xl border border-white/10 shadow-2xl"
                                />
                            </AnimatePresence>

                            {nextWords}
                        </motion.h1>


                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-8xl font-bold tracking-tighter text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2 -mt-4 md:-mt-8"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`hero2-${activeService.id}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    src={activeService.previewUrl2}
                                    className="h-16 md:h-24 lg:h-28 w-24 md:w-36 lg:w-40  object-cover rounded-2xl border border-white/10 shadow-2xl"
                                />
                            </AnimatePresence>

                            {remainingWords}
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