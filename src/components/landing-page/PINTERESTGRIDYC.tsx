"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ReactLenis from "lenis/react";

// --- Achievement Data ---
const ACHIEVEMENT_CARDS = [
    {
        id: 1,
       title: "Wingathon Winners",
subtitle: "Top Builders at Vibecon",
description: "Won 1st place among India’s top builders by shipping high-performance solutions under extreme time pressure.",
        img: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938422/jsmp26sdzlzudwexnc1x.png",
    },
    {
        id: 2,
       title: "Top 300 Developers in India",
subtitle: "Recognized by YC & Emergent",
description: "Selected among India’s top 300 builders for our ability to design, build, and scale real-world products.",
        img: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938383/m744uuccyqbqqfc4h6gk.jpg",
    }
];

// --- Pinterest Grid Data ---
const MEMORY_IMAGES = [
    { id: 5, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938398/mrocetrshhrysndvdf8i.jpg" },
    { id: 1, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938406/vrhvs5dajxbj5xvgfyxf.jpg" },
    { id: 2, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938419/etuku87hnn2loacgvsoe.jpg" },
    { id: 3, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776939194/eq8w9qediasrxssnfuwr.png" },
    { id: 4, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938402/jgcgsilpi06sd9r10pu0.jpg" },
    { id: 6, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938415/drfk7de7qyk54uqlbpbr.jpg" },
    { id: 7, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938395/zdic24zuiyjhzgntrfke.jpg" },
    { id: 8, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938404/h9itlu6215gdn98tvg64.jpg" },
    { id: 9, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776938389/hmfmd1zyb9thmtyvzd7u.jpg" },
    { id: 11, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776939622/fpvpsftzfp0tkdty0pyi.jpg" },
    { id: 12, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776939533/gzqjrzgeagotgbwypz5i.jpg" },
    { id: 13, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776939598/gfo0tiegfqsgfsouoxgn.jpg" },
    { id: 16, src: "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1776939624/ipeyruuklz6k7hsjnmbk.jpg" },
    { id : 17 , src : "https://res.cloudinary.com/dmpsz3ohd/image/upload/v1777045330/fhos5henjfra7cjlx32g.jpg"}
];

export default function PINTERESTGRID() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    return (
        <ReactLenis root>
            <section className="relative bg-[#FDFCF8] overflow-hidden">

                {/* Image Modal */}
                <AnimatePresence>
                    {selectedImg && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImg(null)}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 cursor-zoom-out"
                        >
                            <motion.img
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                src={selectedImg}
                                alt="Expanded view"
                                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                            />
                            <button
                                className="absolute top-8 right-8 text-white text-4xl font-light hover:rotate-90 transition-transform"
                                onClick={() => setSelectedImg(null)}
                            >
                                &times;
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>


              

                {/* 3. PINTEREST MEMORIES GRID */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-gray-100">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">Inside the Build Journey</h2>
                        <p className="text-[#FF6600] font-bold tracking-widest uppercase text-sm">Behind the scenes of how we think, build, and compete.</p>
                    </div>

                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {MEMORY_IMAGES.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedImg(img.src)}
                                className="relative break-inside-avoid rounded-3xl overflow-hidden shadow-xl border-4 border-white group bg-white cursor-zoom-in"
                            >
                                <img
                                    src={img.src}
                                    alt="Event Moment"
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA BOTTOM */}
                <div className="pb-40 text-center relative z-10">
                    <button className="px-12 py-5 bg-black text-white font-bold rounded-full hover:bg-[#FF6600] transition-all hover:scale-105 shadow-2xl">
                        <a href="https://cal.com/newralfounder">

                            Work With a Team That Ships & Wins
                        </a>
                    </button>
                </div>
            </section>
        </ReactLenis>
    );
}

// --- Stacking Card Component ---
const StickyCard = ({ card, onImageClick }: { card: any, onImageClick: (src: string) => void }) => {
    const container = useRef(null);
    const [maxScrollY, setMaxScrollY] = useState(Infinity);
    const filter = useMotionValue(0);
    const negateFilter = useTransform(filter, (value) => -value);

    const { scrollY } = useScroll({ target: container });

    const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 1000], [1, 0.8]);
    const opacity = useTransform(scrollY, [maxScrollY, maxScrollY + 1000], [1, 0.3]);

    const isInView = useInView(container, {
        margin: `0px 0px -80% 0px`,
        once: true,
    });

    useEffect(() => {
        if (isInView) setMaxScrollY(scrollY.get());
    }, [isInView]);

    scrollY.on("change", (val) => {
        if (val > maxScrollY) {
            filter.set((val - maxScrollY) / 80);
        }
    });

    return (
        <motion.div
            ref={container}
            style={{ scale, opacity, rotate: filter, top: '12vh' }}
            className="sticky h-[60vh] md:h-[70vh] w-full max-w-6xl rounded-[40px] md:rounded-[56px] bg-white border border-black/5 shadow-2xl overflow-hidden origin-top flex flex-col md:flex-row"
        >
            <div className="w-full md:w-1/2 h-full p-8 md:p-16 flex flex-col justify-center space-y-6">
                <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs md:text-sm">{card.subtitle}</span>
                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-[1.1]">{card.title}</h2>
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed">{card.description}</p>
            </div>
            <div
                className="w-full md:w-1/2 h-full overflow-hidden bg-[#000] cursor-zoom-in"
                onClick={() => onImageClick(card.img)}
            >
                <motion.img
                    style={{ rotate: negateFilter }}
                    src={card.img}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                />
            </div>
        </motion.div>
    );
};