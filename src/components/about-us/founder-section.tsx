"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function FounderSection() {
    return (
        <section className="py-20 px-2 md:px-4 bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/5"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[570px]">


                    {/* Left Side: Image with Gradient Mask */}
                    <div
                    className="
                        relative w-full overflow-hidden
                        h-[260px]
                        sm:h-[320px]
                        md:h-[420px]
                        lg:h-full
                    "
                    >
                    <img
                        src="https://res.cloudinary.com/dyktjldc4/image/upload/v1770379590/image_7_uzb9nx.png"
                        alt="Yash Rajan Shukla"
                        className="
                        w-full h-full
                        object-cover
                        object-center
                        lg:object-top
                        "
                    />

                    {/* Desktop gradient (side fade) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A] hidden lg:block" />

                    {/* Mobile gradient (bottom fade) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent lg:hidden" />
                    </div>




                    {/* Right Side: Content */}
                    <div className="relative px-6 py-6 md:px-8 md:py-6 lg:px-10 lg:py-10 flex flex-col lg:h-full">

                        {/* Subtle background watermark (The "N" feel) */}
                        <div className="absolute bottom-0 right-0 pointer-events-none select-none">
                            <svg width="588" height="375" viewBox="0 0 588 375" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.09939 394.126L137.338 22.1595C141.715 8.04079 152.115 -0.958421 162.876 0.0814863L266.915 10.2406L369.749 189.905C373.242 195.064 378.061 198.144 383.321 198.664L400.507 200.264C408.979 201.064 417.372 194.904 422.03 184.505L508.842 33.8385L598.988 42.6377C615.01 44.1975 624.446 66.7955 617.901 87.8736L482.662 459.84C478.285 473.959 467.885 482.958 457.124 481.918L353.085 471.759L246.677 258.458C243.103 251.259 237.281 246.859 230.816 246.419L215.397 245.34C207.005 244.78 198.814 250.899 194.236 261.178L111.158 448.121L21.0119 439.322C4.99047 437.762 -4.44571 415.164 2.09939 394.086V394.126Z" fill="white" fillOpacity="0.05" />
                            </svg>
                        </div>

                        <motion.div
                            className="flex flex-col h-full"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <p
                            className="
                                font-medium
                                text-base
                                leading-relaxed
                                sm:text-lg
                                sm:leading-relaxed
                                lg:text-2xl
                                lg:leading-tight
                                lg:overflow-y-auto
                                lg:flex-1
                                pr-2
                                text-neutral-300
                            "
                            >

                              As the visionary founder of Newral, Yash Rajan Shukla has a profound passion for technology and innovation. He has vast experience and expertise in cybersecurity, full-stack development, strategic problem-solving, and has been able to create impactful technology.
<br />Yash’s hands-on leadership style and client-centric philosophy are at the heart of Newral’s success story. His dedication to excellence is evident in the quality of every solution that we deliver, which is designed with the intent of empowering businesses and enterprises at large. He is a mentor and technology strategist who encourages the team to push boundaries, envision possibilities, and create products that change industries.

                            </p>

                            <div className="mt-auto">
                                <h4 className="text-white text-lg font-medium">
                                    Yash Rajan Shukla
                                </h4>
                                <p className="text-neutral-300 text-sm mt-1">
                                    Founder, Newral
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}