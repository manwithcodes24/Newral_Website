"use client";
import React from "react";
import { motion } from "framer-motion";

const BLOG_POSTS = [
    {
        id: 1,
        thumbnailTitle: "How to Design A Web3 Website?",
        thumbnailSub: "A Stepwise Guide",
        title: "30+ Experts Share SaaS UX Trends Shaping the Industry in 2026",
        description: "Want to know what's new in the world of SaaS design? Read on as we share 30+ Saa...",
    },
    {
        id: 2,
        thumbnailTitle: "How to Design A Web3 Website?",
        thumbnailSub: "A Stepwise Guide",
        title: "30+ Experts Share SaaS UX Trends Shaping the Industry in 2026",
        description: "Want to know what's new in the world of SaaS design? Read on as we share 30+ Saa...",
    },
    {
        id: 3,
        thumbnailTitle: "How to Design A Web3 Website?",
        thumbnailSub: "A Stepwise Guide",
        title: "30+ Experts Share SaaS UX Trends Shaping the Industry in 2026",
        description: "Want to know what's new in the world of SaaS design? Read on as we share 30+ Saa...",
    },
    {
        id: 4,
        thumbnailTitle: "How to Design A Web3 Website?",
        thumbnailSub: "A Stepwise Guide",
        title: "30+ Experts Share SaaS UX Trends Shaping the Industry in 2026",
        description: "Want to know what's new in the world of SaaS design? Read on as we share 30+ Saa...",
    },
];

export default function BlogSection() {
    return (
        <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-20 font-sans">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl font-medium mb-6 tracking-tight"
                >
                    Blogs
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
                >
                    Newral is a technology agency that partners with ambitious startups to design and
                    engineer scalable digital products. We work closely with founding teams to translate
                </motion.p>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {BLOG_POSTS.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                        {/* Dark Card Thumbnail */}
                        <div className="relative aspect-[4/3] bg-zinc-900/50 rounded-[2rem] p-8 mb-6 border border-zinc-800/50 overflow-hidden flex flex-col justify-center">
                            <div className="relative z-10">
                                <h4 className="text-4xl font-medium text-zinc-200 leading-tight mb-1">
                                    {post.thumbnailTitle}
                                </h4>
                                <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                                    {post.thumbnailSub}
                                </p>
                            </div>

                            {/* The Logo Circle Element */}
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center shadow-2xl">
                                <svg
                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    className="text-white group-hover:scale-110 transition-transform duration-300"
                                >
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Post Details */}
                        <h3 className="text-3xl font-semibold text-white leading-snug mb-3 group-hover:text-blue-400 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-zinc-500 text-lg leading-relaxed line-clamp-2">
                            {post.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Centered Button */}
            <div className="flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-10 py-4 bg-blue-600 rounded-full text-white font-semibold text-sm transition-all shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_-5px_rgba(37,99,235,0.8)]"
                >
                    Read blogs
                </motion.button>
            </div>
        </section>
    );
}