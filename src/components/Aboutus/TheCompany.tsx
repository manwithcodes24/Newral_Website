"use client";
import React from "react";
import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24 font-sans min-h-screen flex justify-center items-end">
      <div className=" mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* Left Side: Bold Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-6"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[84px] font-medium leading-[1.05] tracking-tight">
            Our Introduction <br />
            We Being Newral <br />
            Revolution in  Industry
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
          <p className="text-[#A1A1A1] text-lg md:text-xl leading-relaxed font-light">
            Newral – Crafting Scalable & Innovative Digital Solutions  At Newral, we are innovators at heart, and through the effective integration of the latest technologies, we shape avant-garde digital products. As experts in the field of digital product development, Newral is a highly respected digital agency in the Indian market and a pioneer in the creation of robust digital platforms. Our team of experts aids various leading American companies like Assume Chat & Fizz Social, across the country, in digital product development. Similarly, other renowned Indian ed-tech companies like Competishun NEET Kaka JEE & Abroad Kaka also receive support from us. Our client base also showcases other companies like OTT Bharat App, Paratalks, Rezume.dev. Our focus is to excel, and this is the reason why we do not just create digital products; instead, we create vigorous digital experiences. Through the creation of digital experiences like custom software development, AI, or security, we are the right choice of company to partner with.

          </p>

          <p className="text-[#A1A1A1] text-lg md:text-xl leading-relaxed font-light">
            We are a team of passionate and skilled professionals who are dedicated to delivering exceptional results. Our team consists of experienced developers, designers, and project managers who work collaboratively to ensure that every project we undertake is a success. We pride ourselves on our ability to understand our clients' needs and deliver solutions that exceed their expectations. At Newral, we are committed to providing our clients with the highest level of service and support, and we strive to build long-lasting relationships with each of our clients.
          </p>
        </motion.div>
      </div>
    </section>
  );
}