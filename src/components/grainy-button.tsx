"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Configuration for the "Snow/Sparkle" effect
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  flickerSpeed: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // Slow, drifting movement
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    // Tiny particles like the image
    this.radius = Math.random() * 1.2 + 0.5;
    this.opacity = Math.random();
    this.flickerSpeed = Math.random() * 0.02 + 0.01;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Pulse opacity for the "sparkle" look
    this.opacity += this.flickerSpeed;
    if (this.opacity > 1 || this.opacity < 0.2) this.flickerSpeed *= -1;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Pure white particles to match your image
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

interface ButtonProps {
  text?: string;
  href?: string;
}

const GrainyButton = ({ 
  text = "Book a call", 
  href = "https://cal.com/newralfounder" 
}: ButtonProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // More particles for a denser texture
      particles = Array.from({ length: 80 }, () => new Particle(rect.width, rect.height));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const p of particles) {
        p.update(rect.width, rect.height);
        p.draw(ctx);
      }
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative inline-flex items-center justify-center 
        px-8 py-3 overflow-hidden rounded-full 
        /* Match the specific blue gradient from image */
        bg-linear-to-b from-[#3EB1FF] to-[#1370F5]
        text-white font-normal text-sm tracking-tight
        /* THE MAGIC: Inner rim and blue depth shadow */
        shadow-[
          0_20px_40px_rgba(19,112,245,0.3),
          inset_0_0_0_1px_rgba(255,255,255,0.4),
          inset_0_0_20px_rgba(0,40,255,0.4)
        ]
        transition-shadow duration-300
        hover:shadow-[0_25px_50px_rgba(19,112,245,0.5),inset_0_0_0_1px_rgba(255,255,255,0.6)]
      `}
    >
      {/* Canvas for the white sparkling texture */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-80"
      />
      
      {/* Radial highlight to make the center look 3D */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />

      <span className="relative z-10 drop-shadow-md">
        {text}
      </span>
    </motion.a>
  );
};

export default GrainyButton;