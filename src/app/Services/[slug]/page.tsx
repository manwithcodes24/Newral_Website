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
        maintittle: "Human app engineering real-world performance",
        title: "App/Software Development",
        description: "We design and develop high-performance, scalable applications tailored to your business goals. From MVPs to enterprise-grade systems, we ensure clean architecture, long-term maintainability, and seamless performance across every platform.",
        previewUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tcHV0ZXIlMjBzY2llbmNlfGVufDB8fDB8fHww",
        previewUrl2: "https://images.unsplash.com/photo-1650636353551-1275516077b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwJTIwZGV2fGVufDB8fDB8fHww",
        mainHeading: "Turn your ideas into powerful, scalable digital products.",
        tegLine: "Custom-built applications engineered for performance and long-term growth.",
        tags: ["Mobile App", "iOS & Android", "React Native"],
        images: [
            "https://images.unsplash.com/photo-1763568258415-6f6a78a4ef18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGFwcCUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1763568258177-4ea94966595a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxhcHAlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1683262038148-2ac280407276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHxhcHAlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D"
        ]
    },

    {
        id: "02",
        slug: "web-development",
        maintittle: "Modern web platforms scalable user experiences",
        title: "Web Development Services",
        description: "We build fast, secure, and scalable web platforms optimized for growth. Using modern frameworks and best engineering practices, we create systems that perform reliably under real-world demands.",
        previewUrl: "https://images.unsplash.com/photo-1617240016072-d92174e44171?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
        previewUrl2: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
        mainHeading: "High-performance web platforms built to scale.",
        tegLine: "Modern web solutions designed for speed, stability, and growth.",
        tags: ["Next.js", "Web Design", "Full-Stack"],
        images: [
            "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww"
        ]
    },

    {
        id: "03",
        slug: "branding",
        maintittle: "Strategic brand systems market leadership",
        title: "Branding & Graphic Design",
        description: "We craft strategic visual identities that establish credibility and differentiate your business in competitive markets. Every design system is built for consistency, clarity, and long-term recognition.",
        previewUrl: "https://images.unsplash.com/photo-1613759612065-d5971d32ca49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJyYW5kaW5nfGVufDB8fDB8fHww",
        previewUrl2: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGJyYW5kaW5nfGVufDB8fDB8fHww",
        mainHeading: "Build a brand that inspires trust and recognition.",
        tegLine: "Strategic branding designed for clarity, impact, and growth.",
        tags: ["Branding", "Logo Design", "Visual Identity"],
        images: [
            "https://images.unsplash.com/photo-1716471330463-f475b00f0506?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJyYW5kaW5nfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGJyYW5kaW5nfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1636247498719-a8a04ed961a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGJyYW5kaW5nfGVufDB8fDB8fHww"
        ]
    },

    {
        id: "04",
        slug: "ui-ux",
        maintittle: "Human interface design meaningful interaction",
        title: "UI/UX Design Services",
        description: "We design user-centric experiences that reduce friction and improve engagement. Every interface is crafted through research and usability insights to align business objectives with user needs.",
        previewUrl: "https://images.unsplash.com/photo-1621111848501-8d3634f82336?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dWklMjB1eHxlbnwwfHwwfHx8MA%3D%3D",
        previewUrl2: "https://images.unsplash.com/photo-1690369519543-c81a2121f740?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVpJTIwdXh8ZW58MHx8MHx8fDA%3D",
        mainHeading: "Design experiences that users love and trust.",
        tegLine: "Intuitive interfaces built for clarity and conversion.",
        tags: ["UI Design", "UX Research", "Figma"],
        images: [
            "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dWklMjB1eHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVpJTIwdXh8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1690228254548-31ef53e40cd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHVpJTIwdXh8ZW58MHx8MHx8fDA%3D"
        ]
    },

    {
        id: "05",
        slug: "social-media",
        maintittle: "Digital growth strategies measurable impact",
        title: "Social Media Management",
        description: "We grow digital communities through strategic content planning, engagement strategies, and performance-driven campaigns designed for sustainable growth.",
        previewUrl: "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D",
        previewUrl2: "https://images.unsplash.com/photo-1553532435-93d532a45f15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHNvY2lhbCUyMG1lZGlhfGVufDB8fDB8fHww",
        mainHeading: "Grow your digital presence with strategy and consistency.",
        tegLine: "Community-driven growth backed by data and creativity.",
        tags: ["Strategy", "Content", "Growth"],
        images: [
            "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c29jaWFsJTIwbWVkaWElMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNvY2lhbCUyMG1lZGlhJTIwbWFya2V0aW5nfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
        ]
    },

    {
        id: "06",
        slug: "devops",
        maintittle: "Reliable cloud infrastructure scalable systems",
        title: "DevOps & Cloud Solutions",
        description: "We streamline deployments, automate workflows, and secure cloud environments to ensure high availability and operational efficiency at scale.",
        previewUrl: "https://images.unsplash.com/photo-1599949104055-2d04026aee1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRldm9wc3xlbnwwfHwwfHx8MA%3D%3D",
        previewUrl2: "https://plus.unsplash.com/premium_photo-1733306493254-52b143296396?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWQlMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D",
        mainHeading: "Infrastructure that grows as fast as your vision.",
        tegLine: "Cloud architecture engineered for reliability and performance.",
        tags: ["Kubernetes", "CI/CD", "Security"],
        images: [
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdWQlMjBzZXJ2ZXJ8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3VkJTIwc2VydmVyfGVufDB8fDB8fHww"
        ]
    },

    {
        id: "07",
        slug: "code-review",
        maintittle: "Secure code audits production readiness",
        title: "Code Review & Security Services",
        description: "We perform in-depth code audits and security reviews to identify vulnerabilities, improve maintainability, and enhance system performance before deployment.",
        previewUrl: "https://plus.unsplash.com/premium_photo-1683134329824-6f2d0af14ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvZGUlMjByZXZpZXd8ZW58MHx8MHx8fDA%3D",
        previewUrl2: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZSUyMHJldmlld3xlbnwwfHwwfHx8MA%3D%3D",
        mainHeading: "Secure, optimized, and production-ready software.",
        tegLine: "Expert-level audits that strengthen performance and protection.",
        tags: ["Audit", "Security", "Clean Code"],
        images: [
            "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZSUyMHJldmlld3xlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VjdXJpdHl8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlY3VyaXR5fGVufDB8fDB8fHww"
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

                {/* Dynamically updates images and project info based on URL */}
                <ProjectSection
                    data={{
                        mainHeading: activeService.mainHeading,
                        title: activeService.tegLine,
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