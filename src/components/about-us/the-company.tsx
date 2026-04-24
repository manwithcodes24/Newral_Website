"use client";
import React from "react";
import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section className="bg-black text-white py-24 px-8   font-sans min-h-screen flex justify-center items-end">
      <div className=" mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* Left Side: Bold Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-6"
        >
          <h2 className="text-4xl md:text-3xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
           Engineering Products <br /> That Perform Under Pressure
          </h2>
        </motion.div>

        {/* Right Side: Description Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-5 lg:col-start-8 flex flex-col space-y-10"
        >
          <p className="text-lg md:text-xl leading-relaxed text-white/80 font-normal">
          Newral was built with one goal — to help startups build faster, scale smarter, and avoid the engineering mistakes that slow growth.

We design, build, and optimize high-performance systems that handle real users, real scale, and real-world complexity. From custom software to cloud infrastructure and product design, every solution we create is focused on performance, reliability, and long-term scalability.

We’ve worked with fast-growing startups across India and global markets, helping them reduce costs, improve performance, and build systems that are ready for real-world demand — not just launch.
           </p>

          {/* <p className="text-[#A1A1A1] text-lg md:text-xl leading-relaxed font-light">
            We are a team of passionate and skilled professionals who are dedicated to delivering exceptional results. Our team consists of experienced developers, designers, and project managers who work collaboratively to ensure that every project we undertake is a success. We pride ourselves on our ability to understand our clients needs and deliver solutions that exceed their expectations. At Newral, we are committed to providing our clients with the highest level of service and support, and we strive to build long-lasting relationships with each of our clients.
          </p> */}
        </motion.div>
      </div>
    </section>
  );
}