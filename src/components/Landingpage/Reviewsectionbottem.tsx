'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import BgSvg2 from './bg2-svg'

const testimonials = [
    {
        id: 1,
        type: "text",
        bg: "#0066FF",
        quote: "Newral created some Landing pages for Competishun. They captured our vision perfectly, delivering a great design with a quick turnaround. Highly recommend their web development expertise",
        author: "Mohit Tyagi",
        role: "Founder, Competishun",
        avatar: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769785964/image_14_oxlnw4.png",
    },
    {
        id: 2,
        type: "image",
        bgImage: "https://res.cloudinary.com/dyktjldc4/image/upload/v1769791807/9W6d74zIQjmmrhiQrJlFg5EACE4_zq7hzz.avif",
    },

]

import { Tabs } from "../ui/tabs";


const tabs = [
    {
        title: "Product",
        value: "product",
        content: (
            <motion.div
                key={testimonials[0].id}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.3 }
                }}
                className="absolute h-screen inset-0 rounded-[40px] overflow-hidden shadow-2xl"
                style={{
                    backgroundColor: testimonials[0].bg || '#000',
                }}
            >
                {testimonials[0].type === "text" && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-20 text-center">
                        <div className="absolute inset-0 z-0 flex items-center justify-center ">
                            <BgSvg2 />
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <p className="text-white text-2xl md:text-4xl font-medium leading-relaxed mb-10 max-w-6xl">
                                {testimonials[0].quote}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        src={testimonials[0].avatar}
                                        alt={testimonials[0].author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-lg">{testimonials[0].author}</p>
                                    <p className="text-blue-200 text-sm">{testimonials[0].role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

              
            </motion.div>
        ),
    },
    {
        title: "Services",
        value: "services",
        content: (
            <motion.div
                key={testimonials[0].id}
        
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.3 }
                }}
                className="absolute h-screen  inset-0 rounded-[40px] overflow-hidden shadow-2xl"
                style={{
                    backgroundColor: testimonials[0].bg || '#000',
                }}
            >
             
                {testimonials[1].type === "image" && testimonials[1].bgImage && (
                    <div className="relative w-full h-full flex flex-col justify-end p-8 md:p-20">
                        <Image
                            src={testimonials[1 ].bgImage}
                            alt="Background"
                            fill
                            className="object-cover z-0"
                            priority
                        />
                        {/* Gradient Overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                        <div className="relative z-20 max-w-3xl">
                            <p className="text-white text-2xl md:text-4xl font-bold leading-tight mb-8">
                                {testimonials[1].quote}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        src={testimonials[1 ].avatar}
                                        alt={testimonials[1].author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-lg">{testimonials[1].author}</p>
                                    <p className="text-white/80 text-sm">{testimonials[1].role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        ),
    },
   
];

export default function ReviewSection2() {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(0) // -1 for left, 1 for right
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const next = testimonials[(index + 1) % testimonials.length]
    const prev = testimonials[(index - 1 + testimonials.length) % testimonials.length]

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            zIndex: 10,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            zIndex: 20,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            zIndex: 10,
        }),
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center text-white font-sans overflow-hidden">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center pt-20 pb-16 px-4">
                <div className="mb-8 flex flex-col gap-2 max-w-5xl space-y-2 text-center">
                    <h1 className="md:text-7xl text-4xl font-medium tracking-tight leading-tight">
                        Trusted by startups featured on
                        <span className="text-[#0A8CB9]"> Shark Tank</span>
                        <span className="text-[#FAE071] ml-3">India</span>
                    </h1>
                </div>

                <div className="flex flex-col gap-2 max-w-2xl space-y-2 text-center">
                    <p className="text-white text-lg font-medium leading-relaxed mb-8">
                        Newral is a technology agency that partners with ambitious startups to design and engineer scalable digital products. We work closely with founding teams to translate ideas into reliable, production-ready software.Our experience includes building solutions for
                    </p>
                </div>

                <div className="">
                    <button className="px-10 py-4 rounded-full bg-blue-600 font-medium hover:bg-blue-500 transition-all">
                        Book a call
                    </button>
                </div>
            </div>
            <div className="h-screen px-28 mb-96 [perspective:1000px] relative b flex flex-col  w-full  items-start justify-start">
                <Tabs tabs={tabs} />
            </div>
        </div>
    )
}