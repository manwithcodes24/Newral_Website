"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import BgSvg2 from "./bg-2-svg";
import StatsGrid from "./stats-grid";
import Link from "next/link";

// --- Types ---
type CardType = "testimonial" | "stats" | "image";

interface CardData {
  id: number;
  type: CardType;
  bg: string;
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
  image?: string;
}

const cards: CardData[] = [
  {
    id: 1,
    type: "image",
    bg: "#111",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769791807/9W6d74zIQjmmrhiQrJlFg5EACE4_zq7hzz.avif",
  },
   {
    id: 4,
    type: "image",
    bg: "#111",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772278345/Group_3_puamxf.png",
  },
  {
    id: 2,
    type: "testimonial",
    bg: "#0066FF",
    quote: "Newral is handling complete tech with top most efficiency, they helped us completely transform our platform’s performance and scalability. Their execution was exceptional.",
    author: "Mohit Tyagi",
    role: "Founder, Competishun",
    avatar: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770375801/Ellipse_5_pj9nqq.png",
  },
  {
    id: 3,
    type: "stats",
    bg: "#ffffff",
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
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center justify-center pt-20 px-4">
        <div className="mb-8 flex flex-col gap-2 max-w-5xl text-center">
          <h1 className="md:text-[64px] leading-tight text-4xl font-bold tracking-tight text-white">
            Trusted By Competishun Startup, <br /> Featured On
            <span className="text-[#0A8CB9]"> Shark Tank</span>
            <span className="text-[#FAE071] ml-3">India</span>
          </h1>
        </div>
        <div className="flex flex-col gap-2 max-w-xl text-center">
          <p className="text-white/80 text-[18px] leading-relaxed mb-8">
            At Newral, we specialize in delivering cutting-edge technology solutions that drive growth, security, and scalability.
          </p>
        </div>
        <div className="px-6 py-2 border border-white/20 rounded-2xl hover:text-white hover:bg-black bg-white text-black transition-colors cursor-pointer">
          <Link href={"/case-study/competishun"}>Read Case Study</Link>
        </div>
      </div>

      {/* STICKY CARDS SECTION */}
      {/* Height is calculated by (number of cards * 100vh) */}
      <section ref={containerRef} className="relative h-[400vh]">
        {cards.map((card, index) => {
          // This calculation makes earlier cards shrink more as new ones come in
          const targetScale = 1 - (cards.length - index) * 0.05;
          
          return (
            <Card
              key={card.id}
              card={card}
              index={index}
              progress={scrollYProgress}
              // The range determines when each card starts animating
              range={[index * 0.25, 1]} 
              targetScale={targetScale}
            />
          );
        })}
      </section>

      {/* Spacer for bottom */}
      <div className="h-[20vh]" />
    </div>
  );
}

const Card = ({ 
  card, 
  index, 
  progress, 
  range, 
  targetScale 
}: {
  card: CardData;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  // Use the range to scale the card down as we scroll deeper
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div
        style={{
          scale,
          backgroundColor: card.bg,
          // This gives each card a slightly lower starting point in the stack
          top: `calc(10% + ${index * 25}px)`, 
        }}
        className="relative h-[70vh] w-[92vw] md:w-[85vw] max-w-7xl rounded-[32px] md:rounded-[48px] shadow-2xl border border-white/10 overflow-hidden origin-top"
      >
        {/* Card Content Logic */}
        {card.type === "testimonial" && (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-20 text-center">
            <div className="absolute inset-0 z-0 opacity-50">
              <BgSvg2 />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-white text-xl md:text-3xl lg:text-4xl max-w-4xl font-medium leading-tight mb-10">
                "{card.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={card.avatar} 
                  alt={card.author} 
                  className="w-14 h-14 rounded-full border-2 border-white/20 object-cover" 
                />
                <div className="text-left">
                  <p className="font-bold text-lg text-white">{card.author}</p>
                  <p className="text-white/60 text-sm">{card.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {card.type === "stats" && (
           <div className="w-full h-full overflow-y-auto">
              <StatsGrid />
           </div>
        )}

        {card.type === "image" && (
          <div className="w-full h-full">
            <img
              src={card.image}
              alt="Project Display"
              className="w-full h-full object-contains"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};