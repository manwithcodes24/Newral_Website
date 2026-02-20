"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Changed to framer-motion for standard compatibility
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import this hook
import PremiumAceternityButton from "./PremiumAceternityButton";
import NewralLogoSvg from "./landing-page/newral-logo-svg";
import { s } from "framer-motion/client";

const SERVICES = [
  {
    id: "01",
    title: "Branding & Graphic Design",
    slug: "branding",
  },
  {
    id: "02",
    title: "Web Development",
    slug: "web-development",
  },
  {
    id: "03",
    title: "App & Software Development",
    slug: "app-development",
  },
  {
    id: "04",
    title: "UI/UX Design",
    slug: "ui-ux",
  },
  {
    id: "05",
    title: "DevOps & Cloud Solutions",
    slug: "devops",
  },
  {
    id: "06",
    title: "Code Review & Security",
    slug: "code-review",
  },
  {
    id: "07",
    title: "Social Media Management",
    slug: "social-media",
  },
];


const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// --- Sub-components ---

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
  const pathname = usePathname();
  // Check if current path matches the href
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <Link href={href}>
        <motion.div
          className={`relative cursor-pointer px-4 py-2 text-sm transition-colors duration-300 text-white ${isActive ? "font-bold" : "hover: font-medium"}
            }`}
        >
          {/* Active Background Pill */}
          {isActive && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white/5 font-bold rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {item}
        </motion.div>
      </Link>

      {active !== null && (
        <AnimatePresence>
          {active === item && children && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={transition}
              className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2"
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
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex space-x-3 p-2 rounded-lg transition-colors ${isActive ? "bg-white/10" : "hover:bg-white/5"
        }`}
    >
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
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm block py-1 transition-colors ${isActive ? "text-blue-500 font-medium" : "text-neutral-400 hover:text-blue-500"
        }`}
    >
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
        <Link href="/" className="flex items-center shrink-0">
          <NewralLogoSvg />
        </Link>

        {/* 2. Central Navigation Pill */}
        <nav
          onMouseLeave={() => setActive(null)}
          className="hidden md:flex items-center bg-[#1A1A1A]/30 border border-white/5 backdrop-blur-md px-2 py-1.5 rounded-full shadow-lg"
        >
          <MenuItem setActive={setActive} active={active} item="Home" href="/" />

          <MenuItem setActive={setActive} active={active} item="About us" href="/Aboutus" />

          <MenuItem setActive={setActive} active={active} item="Services" href="/Services">
            <div className="flex flex-col space-y-3 text-sm min-w-37.5">
              {SERVICES.map((service) => (
                <HoveredLink key={service.id} href={service.slug ? `/Services/service?service=${service.slug}` : "/Services"}>
                  {service.title}
                </HoveredLink>
              ))}
            </div>
          </MenuItem>

          {/*
          <MenuItem setActive={setActive} active={active} item="Projects" href="/projects">
            <div className="grid grid-cols-2 gap-8 p-2">
              <ProductItem
                title="Saas App"
                description="Modern dashboard for analytics."
                href="/projects/saas"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200"
              />
              <ProductItem
                title="E-commerce"
                description="Custom Shopify theme for brands."
                href="/projects/ecommerce"
                src="https://images.unsplash.com/photo-1523474253046-2cd2c788f3ff?auto=format&fit=crop&q=80&w=200"
              />
            </div>
          </MenuItem>
          */}

          <MenuItem setActive={setActive} active={active} item="Contact" href="/Contact" />
        </nav>

        {/* 3. Action Button */}
        <div className="shrink-0">
          <PremiumAceternityButton
            size="sm"
            label="Book a call"
            href="https://cal.com/newralfounder"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </header>
  );
}
