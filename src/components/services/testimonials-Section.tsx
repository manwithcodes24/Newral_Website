"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Mohit Tyagi",
        role: "Founder, Competishun",
        feedback: "Newral created some landing pages for Competishun. They captured our vision perfectly, delivering a great design with a quick turnaround. Highly recommend their web development expertise.",
        avatarurl: "https://res.cloudinary.com/djwzwq4cu/image/upload/v1770439870/Frame_1171276684_y1tlqe.png",
        companylogo: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769785961/Frame_1171276569_xkt1ci.png",
    },
    {
        id: 2,
        name: "Ashton Cofer",
        role: "Co-Founder & CTO of Fizz Social | Forbes 30u30",
        feedback: "Newral has been a game-changer for us. Their scalable strong monitoring solution with streamlined DevOps pipelines let us confidently focus on growing our business. Highly recommended!",
        avatarurl: "https://res.cloudinary.com/djwzwq4cu/image/upload/v1770439870/Frame_1171276685_sjfhlx.png",
        companylogo: "https://media.licdn.com/dms/image/v2/C560BAQF6Xwh04dkNYg/company-logo_200_200/company-logo_200_200/0/1630655773340?e=1771459200&v=beta&t=e-vhB43_av62vilrP_nOQdrilcYuDyUnUerpUEfIsTs"

    },
    {
        id: 3,
        name: "Sameer Bansal ",
        role: "Founder, Bansal Classes",
        feedback: "Newral played a pivotal role in upgrading our tech infrastructure at Bansal Classes. Their expertise in software development helped handling our operations which was great experience for our students",
        avatarurl: "https://res.cloudinary.com/djwzwq4cu/image/upload/v1770439869/Frame_1171276686_ev67pb.png",
        companylogo: "https://res.cloudinary.com/djwzwq4cu/image/upload/v1770440498/Untitled_pemkwn.png"
    }
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
                            <div className="group relative items-center  text-center flex h-auto flex-col justify-between rounded-[2rem] border border-white/5 bg-[#0A0A0A] p-8 transition-all hover:border-blue-500/50">
                                <p className="text-xl leading-relaxed text-white/80">
                                    {item.feedback}
                                </p>

                                <div className="mt-12 flex items-center gap-4">
                                    <div className="h-12 w-12 overflow-hidden rounded-full bg-neutral-800">
                                        <img src={item.avatarurl} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
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