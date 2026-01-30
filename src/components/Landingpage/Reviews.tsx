"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideMoveLeft, LucideMoveRight, MoveLeft, MoveLeftIcon } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Mohit Tyagi",
        role: "Founder, Competishun",
        feedback: "Newral created some landing pages for Competishun. They captured our vision perfectly, delivering a great design with a quick turnaround. Highly recommend their web development expertise.",
        avatarurl: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769785964/image_14_oxlnw4.png",
        companylogo: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769785961/Frame_1171276569_xkt1ci.png",
    },
];

const ReviewSection = () => {
    const [index, setIndex] = useState(0);

    const nextReview = () => {
        setIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const current = reviews[index];

    return (
        <section className="relative min-h-screen bg-black text-white flex flex-col justify-center overflow-hidden font-sans py-20">

            {/* MAIN CONTENT GRID */}
            <div className=" md:mx-28  px-6 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center z-10">

                {/* LEFT SECTION */}
                <div className="flex flex-col space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`logo-${current.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <img src={current.companylogo} alt="logo" className="h-10 w-auto object-contain" />
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`feedback-${current.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="text-2xl md:text-4xl  leading-tight"
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
                                <h4 className="text-xl font-bold">{current.name}</h4>
                                <p className="text-gray-400 font-medium">{current.role}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* NAVIGATION ARROWS */}
                        <div className="flex  pt-4">
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
                <div className="relative z-10 flex justify-end items-end">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`avatar-${current.id}`}
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            className="mb-12  rounded-3xl overflow-hidden  shadow-2xl"
                        >
                            <img
                                src={current.avatarurl}
                                alt={current.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* BOTTOM TILTED BLUE LINE MARQUEE */}
            <div className="absolute bottom-20 left-[-10%] w-[120%] h-16 bg-[#0066FF] -rotate-[10deg] md:-rotate-[5deg] lg:-rotate-[5deg] flex items-center shadow-[0_0_50px_rgba(0,102,255,0.5)] z-12">
                <div className="flex whitespace-nowrap overflow-hidden py-4">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="flex items-center gap-20 pr-20"
                    >
                        {[...Array(6)].map((_, i) => (
                            <span key={i} className="text-white text-3xl md:text-2xl  uppercase italic tracking-tighter">
                                {current.feedback} • {current.name} - {current.role.split(',')[1] || current.name}
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