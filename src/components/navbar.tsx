"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import GrainyButton from "./grainy-button";
import PremiumAceternityButton from "./PremiumAceternityButton";


const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// --- Sub-components (Aceternity Style) ---

const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <Link href={href}>
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-neutral-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors"
        >
          {item}
        </motion.p>
      </Link>
      {active !== null && (
        <AnimatePresence>
          {active === item && children && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={transition}
              className="absolute top-[calc(100%_+_1.5rem)] left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-[#121212] backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-[0px_10px_50px_rgba(0,0,0,0.5)]">
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
}

const ProductItem = ({ title, description, href, src }: ProductItemProps) => {
  return (
    <Link href={href} className="flex space-x-3 hover:bg-white/5 p-2 rounded-lg transition-colors">
      <Image
        src={src}
        width={120}
        height={70}
        alt={title}
        className="shrink-0 rounded-md object-cover shadow-lg"
      />
      <div>
        <h4 className="text-sm font-bold mb-1 text-white">{title}</h4>
        <p className="text-neutral-400 text-xs max-w-[10rem] leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

interface HoveredLinkProps {
  children: React.ReactNode;
  href: string;
}

const HoveredLink = ({ children, href }: HoveredLinkProps) => {
  return (
    <Link href={href} className="text-neutral-400 hover:text-blue-500 text-sm block py-1 transition-colors">
      {children}
    </Link>
  );
};

// --- Main Navbar ---

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-center py-6 px-4 md:px-10">
      <div className="flex items-center justify-between w-full ">

        {/* 1. Logo Left */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dyktjldc4/image/upload/v1765014955/fymyyilfyvvf3f1qekuf.png"
            alt="newral"
            width={100}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* 2. Central Navigation Pill */}
        <nav
          onMouseLeave={() => setActive(null)}
          className="hidden md:flex items-center bg-[#1A1A1A]/80 border border-white/5 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg"
        >
          <MenuItem setActive={setActive} active={active} item="Home" href="/" />

          <MenuItem setActive={setActive} active={active} item="About us" href="/Aboutus" />

          <MenuItem setActive={setActive} active={active} item="Services" href="/Services">
            <div className="flex flex-col space-y-3 text-sm min-w-[150px]">
              <HoveredLink href="/web">Web Design</HoveredLink>
              <HoveredLink href="/ai">AI Solutions</HoveredLink>
              <HoveredLink href="/marketing">Marketing</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Projects" href="#projects">
            <div className="grid grid-cols-2 gap-8 p-2">
              <ProductItem
                title="Saas App"
                description="Modern dashboard for analytics."
                href="#"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200"
              />
              <ProductItem
                title="E-commerce"
                description="Custom Shopify theme for brands."
                href="#"
                src="https://images.unsplash.com/photo-1523474253046-2cd2c788f3ff?auto=format&fit=crop&q=80&w=200"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Contact" href="#contact" />
        </nav>

        <PremiumAceternityButton />
      </div>
    </header>
  );
}