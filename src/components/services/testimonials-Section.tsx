"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        text: "Newral played a pivotal role in upgrading our tech infrastructure at Bansal Classes. Their expertise in software development helped handle our operations, which improved the experience for our students.",
        name: "Sameer Bansal",
        role: "Founder, Bansal Classes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sameer",
    },
    {
        id: 2,
        text: "Newral played a pivotal role in upgrading our tech infrastructure at Bansal Classes. Their expertise in software development helped handle our operations, which improved the experience for our students.",
        name: "Sameer Bansal",
        role: "Founder, Bansal Classes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
        id: 3,
        text: "Newral played a pivotal role in upgrading our tech infrastructure at Bansal Classes. Their expertise in software development helped handle our operations, which improved the experience for our students.",
        name: "Sameer Bansal",
        role: "Founder, Bansal Classes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    {
        id: 4,
        text: "Newral played a pivotal role in upgrading our tech infrastructure at Bansal Classes. Their expertise in software development helped handle our operations, which improved the experience for our students.",
        name: "Sameer Bansal",
        role: "Founder, Bansal Classes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
];

export default function TestimonialSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            // Scroll by one full card width roughly
            const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-black py-24 px-6 ">
            <div className="mx-auto ">
                {/* Header Section */}
                <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-center">
                    <div className="max-w-2xl text-left w-full">
                        <h2 className="mb-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                            What teams say about working with us
                        </h2>
                        <p className="text-lg leading-relaxed text-white/50">
                            Newral is a technology agency that partners with ambitious startups to design and engineer scalable digital products.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-90"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    // FIXED: Changed 'scroll-hide' to 'no-scrollbar' to match the CSS below
                    className="no-scrollbar mt-16 flex gap-6 overflow-x-auto scroll-smooth pb-10"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            // FIXED: Better width handling for responsiveness
                            className="w-[85%] shrink-0 scroll-snap-align-start md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                        >
                            <div className="group relative flex h-[400px] flex-col justify-between rounded-[2rem] border border-white/5 bg-[#0A0A0A] p-8 transition-all hover:border-blue-500/50">
                                <p className="text-xl leading-relaxed text-white/80">
                                    {item.text}
                                </p>

                                <div className="mt-12 flex items-center gap-4">
                                    <div className="h-12 w-12 overflow-hidden rounded-full bg-neutral-800">
                                        <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{item.name}</h4>
                                        <p className="text-sm text-white/40">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FIXED CSS: Match class name and added standard CSS hide */}
            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
      `}</style>
        </section>
    );
}