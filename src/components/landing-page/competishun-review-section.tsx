"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import GetInTouchButton from "@/components/get-in-touch-button";
import BgSvg2 from "./bg-2-svg";
import StatsGrid from "./stats-grid";
import PremiumAceternityButton from "../PremiumAceternityButton";


// --- Types ---
type CardType = "testimonial" | "stats" | "image";

interface CardData {
    id: number;
    type: CardType;
    bg: string;
    // Testimonial specific
    quote?: string;
    author?: string;
    role?: string;
    avatar?: string;
    // Image specific
    image?: string;
}

const cards: CardData[] = [
    {
        id: 3,
        type: "image",
        bg: "#111",
        image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769791807/9W6d74zIQjmmrhiQrJlFg5EACE4_zq7hzz.avif",
    },
    {
        id: 1,
        type: "testimonial",
        bg: "#0066FF",
        quote: "Newral created some Landing pages for Competishun. They captured our vision perfectly, delivering a great design with a quick turnaround.",
        author: "Mohit Tyagi",
        role: "Founder, Competishun",
        avatar: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770375801/Ellipse_5_pj9nqq.png",
    },
    {
        id: 2,
        type: "stats",
        bg: "#ffffff", // White background to make the blue cards pop like the screenshot
    },

];

export default function CardStackScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div className="bg-black">
            <div className="flex flex-col items-center justify-center pt-20 px-4">
                <div className="mb-8 flex flex-col gap-2 max-w-5xl  text-center">
                    <h1 className="md:text-[64px] leading-tight -space-y-4 text-4xl font-medium tracking-tight text-white">
                        Trusted By Competishun, <br /> Edtech Startup Featured On <br />
                        <span className="text-[#0A8CB9]"> Shark Tank</span>
                        <span className="text-[#FAE071] ml-3">India</span>
                    </h1>
                </div>
                <div className="flex flex-col gap-2 max-w-2xl text-center">
                    <p className="text-white text-lg leading-normal font-medium mb-8">
                        At Newral, we specialize in delivering cutting-edge technology solutions that drive growth, security, and scalability. Our expertise spans multiple domains, ensuring that businesses, startups, and enterprises get the best-in-class digital products tailored to their needs.
                    </p>
                </div>
                <div className="mb-12">
                    <PremiumAceternityButton />
                </div>
            </div>

            <section ref={containerRef} className="relative h-[250vh]">
                <div className="sticky top-14 h-screen w-full flex items-center justify-center overflow-hidden">
                    {cards.map((card, index) => (
                        <Card
                            key={card.id}
                            card={card}
                            index={index}
                            progress={scrollYProgress}
                            total={cards.length}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

const Card = ({ card, index, progress, total }: {
    card: CardData;
    index: number;
    progress: MotionValue<number>;
    total: number
}) => {
    const CARD_PEEK_OFFSET = 30;
    const SCALE_FACTOR = 0.05;

    const y = useTransform(progress, (p) => {
        const cardProgress = p * total;

        if (index === 0) {
            if (cardProgress <= 1) return 0;
            const stackDepth = cardProgress - 1;
            return stackDepth * -CARD_PEEK_OFFSET;
        }

        if (cardProgress < index) return 1000;
        if (cardProgress >= index && cardProgress <= index + 1) {
            const entryProgress = cardProgress - index;
            return (1 - entryProgress) * 1000;
        }

        const stackDepth = cardProgress - (index + 1);
        return stackDepth * -CARD_PEEK_OFFSET;
    });

    const scale = useTransform(progress, (p) => {
        const cardProgress = p * total;
        if (cardProgress <= index + 1) return 1;
        const stackDepth = cardProgress - (index + 1);
        return 1 - (stackDepth * SCALE_FACTOR);
    });

    return (
        <motion.div
            style={{
                y: y,
                scale: scale,
                zIndex: index,
                backgroundColor: card.bg,
                transformOrigin: "top center",
            }}
            className="absolute h-[80vh] w-[90vw] md:w-[85vw] max-w-7xl rounded-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.4)] border border-white/20 overflow-hidden"
        >
            {/* 1. Testimonial Card Layout */}
            {card.type === "testimonial" && (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-20 text-center">
                    <div className="absolute inset-0 z-0">
                        <BgSvg2 />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <p className="text-white text-xl md:text-4xl max-w-4xl font-medium font-sans leading-tight mb-10 ">
                            {card.quote}
                        </p>
                        <div className="flex items-center gap-4">
                            <img src={card.avatar} alt={card.author} className="w-14 h-14 rounded-full border-2 border-white shadow-lg object-cover" />
                            <div className="text-left">
                                <p className="font-bold text-lg text-white">{card.author}</p>
                                <p className="text-white/70 text-sm">{card.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Stats Grid Card Layout */}
            {card.type === "stats" && (
                <StatsGrid />
            )}

            {/* 3. Image Banner Card Layout */}
            {card.type === "image" && (
                <div className="w-full h-full">
                    <img
                        src={card.image}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </motion.div>
    );
};