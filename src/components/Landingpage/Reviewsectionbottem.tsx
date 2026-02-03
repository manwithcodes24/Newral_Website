"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import GetintouchButton from "../GetintouchButton";
import BgSvg2 from "./bg2-svg";

type Testimonial = {
    id: number;
    bg: string;
    quote: string;
    author: string;
    role: string;
    avatar: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        bg: "#0066FF",
        quote: "Newral created some Landing pages for Competishun. They captured our vision perfectly, delivering a great design with a quick turnaround.",
        author: "Mohit Tyagi",
        role: "Founder, Competishun",
        avatar: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769785964/image_14_oxlnw4.png",
    },
    {
        id: 2,
        bg: "#6366f1",
        quote: "Newral has been a game-changer for us. Their scalable strong monitoring solution with streamlined DevOps pipelines let us confidently focus on growing our business. Highly recommended!",
        author: "Ashton Cofer",
        role: "Co-Founder & CTO of Fizz Social | Forbes 30u30",
        avatar: "https://res.cloudinary.com/dyktjldc4/image/upload/e_background_removal//f_png/v1770136915/8bd40623-3461-488a-a5ef-a305fc912537_njf4jh.png",
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
                <div className="mb-8 flex flex-col gap-2 max-w-5xl space-y-2 text-center">
                    <h1 className="md:text-[64px] leading-tight text-4xl font-medium tracking-tight text-white">
                        Trusted By Competishun, <br /> Edtech Startup Featured On <br />
                        <span className="text-[#0A8CB9]"> Shark Tank</span>
                        <span className="text-[#FAE071] ml-3">India</span>
                    </h1>
                </div>

                <div className="flex flex-col gap-2 max-w-2xl text-center">
                    <p className="text-white text-lg leading-normal font-medium mb-8">
                        At Newral, we specialize in delivering cutting-edge technology solutions that drive growth, security, and scalability.
                    </p>
                </div>

                <div className="mb-12">
                    <GetintouchButton />
                </div>
            </div>

            {/* REMOVED mt-20 and adjusted height */}
            <section ref={containerRef} className="relative h-[400vh]">
                <div className="sticky top-14 h-screen w-full flex items-center justify-center overflow-hidden">
                    {testimonials.map((card, index) => (
                        <Card
                            key={card.id}
                            card={card}
                            index={index}
                            progress={scrollYProgress}
                            total={testimonials.length}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

const Card = ({ card, index, progress, total }: {
    card: Testimonial;
    index: number;
    progress: MotionValue<number>;
    total: number
}) => {
    const CARD_PEEK_OFFSET = 30; 
    const SCALE_FACTOR = 0.05;    

    const y = useTransform(progress, (p) => {
        const cardProgress = p * total; 

        // FIRST CARD SPECIAL LOGIC: 
        // It should be at y: 0 immediately, and only move UP when card 2 arrives.
        if (index === 0) {
            if (cardProgress <= 1) return 0;
            const stackDepth = cardProgress - 1;
            return stackDepth * -CARD_PEEK_OFFSET;
        }

        // OTHER CARDS:
        if (cardProgress < index) {
            return 1000; // Waiting below
        }
        if (cardProgress >= index && cardProgress <= index + 1) {
            const entryProgress = cardProgress - index;
            return (1 - entryProgress) * 1000; // Sliding in
        }
        
        // Stacking phase
        const stackDepth = cardProgress - (index + 1);
        return stackDepth * -CARD_PEEK_OFFSET;
    });

    const scale = useTransform(progress, (p) => {
        const cardProgress = p * total;
        // Logic for scaling down once a card is no longer the top-most
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
            className="absolute h-[80vh] w-[90vw] md:w-[75vw] max-w-6xl rounded-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.4)] border border-white/20 overflow-hidden"
        >
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-20 text-center">
                <div className="absolute inset-0 z-0">
                    <BgSvg2 />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <p className="text-white text-xl md:text-3xl font-medium leading-relaxed mb-10 max-w-3xl">
                        "{card.quote}"
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
        </motion.div>
    );
};