"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BgSvg from "./bgsvg";

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const scale = useTransform(smoothProgress, [0, 0.9], [1, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.8, 0.9], [1, 1, 0]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-black">
            {/* STICKY LOCKING CONTAINER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 1. BACKGROUND SVG */}
                <div className="absolute my-28 inset-0 z-0  flex items-center justify-center pointer-events-none">
                    <BgSvg />
                </div>

                {/* 2. SMOOTH MARQUEE LAYER */}
                <div className="relative z-10 w-full flex flex-col  pointer-events-none -space-y-20 ">
                    <MarqueeText
                        text="INNOVATION EXCELLENCE CREATIVITY FUTURE"
                        color="text-white"
                        speed="40s"
                    />
                    <MarqueeText
                        text="DIGITAL SOLUTIONS MODERN DESIGN TECHNOLOGY"
                        color="text-blue-600"
                        speed="35s"
                        reverse
                    />
                </div>

                {/* 3. SCALING VIDEO LAYER */}
                <div className="absolute rounded-2xl inset-0 z-20 flex items-center justify-center">
                    <motion.div
                        style={{ scale, opacity }}
                        className="relative aspect-video  w-full h-screen rounded-2xl shadow-2xl overflow-hidden bg-gray-900"
                    >
                        {!isPlaying && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                <button
                                    onClick={handlePlay}
                                    className="group flex flex-col items-center gap-4 transition-all hover:scale-105"
                                >
                                    <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-white bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                                        <svg className="w-8 h-8 ml-1 fill-current" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-bold tracking-widest uppercase text-xs">Play Showreel</span>
                                </button>
                            </div>
                        )}
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/J7ttWcfZppU?autoplay=${isPlaying ? 1 : 0}&controls=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </motion.div>
                </div>
            </div>

            {/* OPTIMIZED CSS FOR SMOOTHNESS */}
            <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee {
          animation: marquee var(--speed) linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse var(--speed) linear infinite;
          will-change: transform;
        }
      `}</style>
        </div>
    );
};

interface MarqueeProps {
    text: string;
    color: string;
    speed: string;
    reverse?: boolean;
}

const MarqueeText = ({ text, color, speed, reverse }: MarqueeProps) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap">
            <div
                className={`flex whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
                style={{ "--speed": speed } as any}
            >
                {/* We use two spans. When the first finishes, the second is in its exact starting place, creating a loop */}
                <span className={`text-[10vw] font-bold uppercase tracking-tighter pr-12 ${color}`}>
                    {text}
                </span>
                <span className={`text-[10vw] font-bold uppercase tracking-tighter pr-12 ${color}`}>
                    {text}
                </span>
            </div>
        </div>
    );
};

export default HeroSection;