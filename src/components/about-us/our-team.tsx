"use client";
import React from "react";
import { motion } from "motion/react";

const teamMembers = [
  {
    name: "Bharat Goel",
    role: "Chief Product Manager",
    quote:
      "Turns complex ideas into clear product direction. Focused on building scalable systems that align with real user needs.",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770395326/Screenshot_2026-02-06_at_21-56-51_Newral_-_Cutting-Edge_Tech_Solutions_for_Scalable_Growth_imix05.png",
  },
  {
    name: "Aditya Rajan Shukla",
    role: "Research & Sales Head",
    quote:
      "Drives strategy through data and market insight. Connects product vision with real growth opportunities.",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770395325/Screenshot_2026-02-06_at_21-57-00_Newral_-_Cutting-Edge_Tech_Solutions_for_Scalable_Growth_vw71tu.png",
  },
  {
    name: "Ram Bhardwaj",
    role: "Tech Lead",
    quote:
      "Builds scalable systems and manages complex architectures with precision, ensuring reliability under real-world load.",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770395324/Screenshot_2026-02-06_at_21-57-09_Newral_-_Cutting-Edge_Tech_Solutions_for_Scalable_Growth_gjralv.png",
  },
  {
    name: "Bhanu Pratap Singh",
    role: "Tech Lead",
    quote:
      "Focused on execution and performance. Works across teams to ship fast, reliable, and scalable systems.",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770395324/Screenshot_2026-02-06_at_21-57-17_Newral_-_Cutting-Edge_Tech_Solutions_for_Scalable_Growth_vejsm1.png",
  },
  {
    name: "Sahil Jeet Singh Kalsi",
    role: "Software Development Engineer",
    quote:
      "Builds clean, efficient, and reliable code with a strong focus on performance and long-term maintainability.",
    image: "https://res.cloudinary.com/dyktjldc4/image/upload/v1770395324/Screenshot_2026-02-06_at_21-57-22_Newral_-_Cutting-Edge_Tech_Solutions_for_Scalable_Growth_pcsutb.png",
  },
];


// Double items for seamless loop
const row1 = [...teamMembers, ...teamMembers];
const row2 = [...teamMembers, ...teamMembers];

const TeamCard = ({ member }: { member: (typeof teamMembers)[0] }) => (
  <div className="flex bg-black overflow-hidden gap-6 w-175 md:w-142 h-60.25 shrink-0">
    {/* Left Side: Pure Image (No overlays or patterns) */}
    <div className="w-1/3 aspect-square  md:aspect-auto md:h-60.25">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full rounded-2xl object-cover"
      />
    </div>

    {/* Right Side: Text Content */}
    <div className="w-1/2 py-4 flex flex-col justify-between h-full gap-8 bg-black">
      <p className="text-white text-base md:text-lg font-medium leading-tight">
        {member.quote}
      </p>

      <div>
        <h4 className="text-white text-lg font-medium tracking-tight">
          {member.name}
        </h4>
        <p className="text-neutral-500 text-xs font-bold uppercase">
          {member.role}
           {/* — <span className="opacity-80 italic">{member.pronouns}</span> */}
        </p>
      </div>
    </div>
  </div>
);

export default function TeamMarquee() {
  return (
    <section className="bg-black py-32 overflow-hidden relative group">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-42 md:px-12">
        <h2 className="text-white text-4xl text-center md:text-6xl font-bold tracking-tighter">
          The People Behind  <br />
        The Systems
        </h2>
      </div>

      <div className="flex flex-col gap-30">
        {/* ROW 1: Moves Left */}
        <div className="flex">
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-40 shrink-0 px-4"
          >
            {row1.map((member, i) => (
              <TeamCard key={`row1-${i}`} member={member} />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Moves Right */}
        <div className="flex">
          <motion.div
            animate={{ x: ["-50%", 0] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-8 shrink-0 px-4"
          >
            {row2.map((member, i) => (
              <TeamCard key={`row2-${i}`} member={member} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}