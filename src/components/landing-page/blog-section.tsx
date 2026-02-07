"use client"; // Required for Framer Motion

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogSectionProps {
    posts: any[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
    // Show only the latest 3 blogs on the home page
    const blogs = posts.slice(0, 3);

    return (
        <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-20 font-sans">
            <div className=" mx-auto"> {/* Monitor Consistency Wrapper */}
                
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter"
                    >
                        Blogs
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
                    >
                        Stay updated with the latest trends in SaaS UX, development, and 
                        digital product engineering.
                    </motion.p>
                </div>

                {/* Blog Grid - Optimized for 16" and 21" screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
                    {blogs.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer flex flex-col"
                        >
                            <Link href={`/blogs/${post.slug}`}>
                                {/* Dark Card Thumbnail */}
                                <div className="relative mb-6 bg-zinc-900/50 rounded-[2rem] border border-white/10 overflow-hidden aspect-video">
                                    <img 
                                        src={post.thumbnail} 
                                        alt={post.title} 
                                        loading="lazy" 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    />
                                    {/* Subtle Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Post Details */}
                                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-zinc-500 text-lg leading-relaxed line-clamp-2">
                                    {post.description}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Centered Button */}
                <div className="flex justify-center">
                    <Link href="/blogs">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-10 py-4 bg-blue-600 rounded-full text-white font-semibold text-sm transition-all shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_-5px_rgba(37,99,235,0.8)]"
                        >
                            Read all blogs
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}