"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideMoveLeft,
  LucideMoveRight,
  MoveLeft,
  MoveLeftIcon,
} from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 2,
    name: "Ashton Cofer",
    role: "Co-Founder & CTO of Fizz Social | Forbes 30u30",
    feedback:
      "Newral has been a valuable partner in our growth journey. Their scalable monitoring solutions and efficient DevOps workflows brought stability and clarity to our operations. We highly recommend their services.",
    avatarurl:
      "https://res.cloudinary.com/djwzwq4cu/image/upload/v1772276964/Frame_1171276687_kwlek1.png",
    companylogo:
      "https://res.cloudinary.com/dyktjldc4/image/upload/v1771585846/image_31_mugdyt.svg",
  },

  {
    id: 1,
    name: "Mohit Tyagi",
    role: "Founder, Competishun",
    feedback:
      "Newral is handling complete tech with top most efficiency, they helped us completely transform our platform’s performance and scalability. From major cost optimization to faster video delivery and a smoother user experience, their execution was exceptional. The platform is now more stable, efficient, and growth-ready.",
    avatarurl:
      "https://res.cloudinary.com/djwzwq4cu/image/upload/v1770439870/Frame_1171276684_y1tlqe.png",
    companylogo:
      "https://res.cloudinary.com/dyktjldc4/image/upload/v1769785961/Frame_1171276569_xkt1ci.png",
  },

  {
    id: 3,
    name: "Sameer Bansal ",
    role: "Founder, Bansal Classes",
    feedback:
      "Newral helped us upgrade our technology at Bansal Classes with ease. Their strong software development support improved our operational efficiency and enhanced the overall student experience.",
    avatarurl:
      "https://res.cloudinary.com/djwzwq4cu/image/upload/v1770439869/Frame_1171276686_ev67pb.png",
    companylogo:
      "https://res.cloudinary.com/djwzwq4cu/image/upload/v1770440498/Untitled_pemkwn.png",
  },
];

const ReviewSection = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextReview = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[index];
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextReview();
    }, 2000);
    return () => clearInterval(timer);
  }, [index, isPaused]);
  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen bg-black text-white flex flex-col justify-center overflow-hidden font-sans pb-20"
    >
      {/* MAIN CONTENT GRID */}
      <div className=" md:mx-28  px-6 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]  items-center z-10">
        {/* LEFT SECTION */}
        <div className="flex flex-col space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`logo-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={current.companylogo}
                alt="logo"
                className="h-14 w-auto rounded-md object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`feedback-${current.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-2xl md:text-3xl font-medium mb-20"
            >
              {current.feedback}
            </motion.p>
          </AnimatePresence>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${current.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h4 className="text-2xl font-bold">{current.name}</h4>
                <p className="text-gray-400 text-xl font-medium">
                  {current.role}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* NAVIGATION ARROWS */}
            <div className="flex  pt-20">
              <button
                onClick={prevReview}
                className="w-12 h-12 rounded-full  flex items-center justify-center hover:bg-white hover:text-black transition-all group"
              >
                <LucideMoveLeft />
              </button>
              <button
                onClick={nextReview}
                className="w-12 h-12 rounded-full  flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <LucideMoveRight />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (AVATAR) */}
        <div className="relative  z-10 flex justify-end items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={`avatar-${current.id}`}
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              className=" overflow-hidden  shadow-2xl"
            >
              <Image
                height={5000}
                width={5000}
                src={current.avatarurl}
                alt={current.name}
                className="w-full h-full  object-cover md:pt-30"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM TILTED BLUE LINE MARQUEE */}
      <div className="absolute bottom-32 left-[-10%] w-[120%] h-14 bg-[#0066FF]  flex items-center shadow-[0_0_50px_rgba(0,102,255,0.5)] z-12">
        <div className="flex whitespace-nowrap overflow-hidden py-4">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex items-center gap-20 pr-20"
          >
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="text-white text-3xl md:text-2xl tracking-tighter"
              >
                {current.feedback}
                <span className="inline-flex items-center gap-20 px-3">
                  <span className="text-white/80">
                    - {current.name} {current.role.split(",")[1] || " "}
                  </span>
                  <span className="text-[2em] leading-none">•</span>
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SECOND TILTED LINE FOR EFFECT (-20 degrees as requested) */}
      <div className="absolute bottom-[-5%] right-[-10%] w-[120%] h-32 bg-[#8A38F5]/20 -rotate-[20deg] pointer-events-none -z-10" />
    </section>
  );
};

export default ReviewSection;
