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
import BookCallButton from '../BookacallButton'


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
                            <p className="text-white text-lg md:text-4xl font-medium leading-relaxed mb-10 max-w-6xl">
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
                key={testimonials[1].id}
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
                    backgroundColor: testimonials[1].bg || '#000',
                }}
            >
                {/* 1. Background Layer: The "Cover" with Blur */}
                {testimonials[1].type === "image" && testimonials[1].bgImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={testimonials[1].bgImage}
                            alt="Background Blur"
                            fill
                            className="object-cover blur-2xl opacity-60 scale-110" // Scale prevents white edges from blur
                            priority
                        />
                        {/* Optional: Overlay to ensure brand color (blue) bleeds through */}
                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
                    </div>
                )}

                {/* 2. Foreground Layer: The "Contain" image (Visible on all, optimized for mobile) */}
                {testimonials[1].type === "image" && testimonials[1].bgImage && (
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <Image
                                src={testimonials[1].bgImage}
                                alt={"Testimonial Image"}
                                fill
                                // object-contain ensures the image is NEVER cut off on mobile
                                // md:object-cover allows it to fill more space on desktop if preferred
                                className="object-contain md:object-contain "
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* 3. Content Overlay (Optional: If you have text/quotes) */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
                    {/* Your text content here */}
                </div>
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
                        Trusted by Compitishun Edtech Startup featured on <br />
                        <span className="text-[#0A8CB9]"> Shark Tank</span>
                        <span className="text-[#FAE071] ml-3">India</span>
                    </h1>
                </div>

                <div className="flex flex-col gap-2 max-w-2xl space-y-2 text-center">
                    <p className="text-white text-lg font-medium leading-relaxed mb-8">
                        At Newral, we specialize in delivering cutting-edge technology solutions that drive growth, security, and scalability. Our expertise spans multiple domains, ensuring that businesses, startups, and enterprises get the best-in-class digital products tailored to their needs.
                    </p>
                </div>

                <div className="">
                    {/* CTA Button */}
                    <BookCallButton />
                </div>
            </div>
            <div className="h-screen px-6 md:px-28 mb-96 [perspective:1000px] relative b flex flex-col  w-full  items-start justify-start">
                <Tabs tabs={tabs} />
            </div>
        </div>
    )
}