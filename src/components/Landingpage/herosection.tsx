"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BgSvg from "./BgSvg";
import BgSvgMobile from "./BgSvgMobile";

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

    const scale = useTransform(smoothProgress, [0, 0.9], [1, 0.5]);
    const opacity = useTransform(smoothProgress, [0, 0.8, 0.9], [1, 1, 1]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-black">
            {/* STICKY LOCKING CONTAINER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">



                {/* 1. BACKGROUND SVG */}
                <div className="hidden md:flex md:absolute md:my-20 inset-0 z-0 items-center justify-center pointer-events-none">
                    <BgSvg />
                </div>
                <div className="flex md:hidden absolute my-20 inset-0 z-0 items-center justify-center pointer-events-none">
                    <BgSvgMobile />
                </div>
                {/* 2. SMOOTH MARQUEE LAYER */}
                <div className="relative z-10 w-full flex flex-col  pointer-events-none md:-space-y-20 ">
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

                        <video
                            className="w-full h-full object-cover"
                            src={`https://res.cloudinary.com/dyktjldc4/video/upload/v1769788190/newral_promotion_4_zkthbx.mp4`}
                            title="newral.in"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls={false} // ← Set to false to hide controls completely
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
                style={{ "--speed": speed } as React.CSSProperties}
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