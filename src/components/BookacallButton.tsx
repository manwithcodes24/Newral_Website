"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BookACallButton = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Use devicePixelRatio for sharper, tiny particles
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        const rect = canvas!.getBoundingClientRect();
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        
        // DUST SIZE: Extremely small (0.1 to 0.4)
        this.size = Math.random() * 0.3 + 0.1; 
        
        // DRIFT SPEED: Slower, floaty movement
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.1;
        
        // Subtle opacity
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        const rect = canvas!.getBoundingClientRect();
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > rect.width) this.x = 0;
        else if (this.x < 0) this.x = rect.width;
        if (this.y > rect.height) this.y = 0;
        else if (this.y < 0) this.y = rect.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      // INCREASED COUNT: More particles since they are tiny
      const particleCount = 150; 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <motion.a
      href="https://cal.com/newralfounder"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative z-50 inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all rounded-full group bg-gradient-to-b from-[#0066FF] to-[#0052CC]"
      style={{
        boxShadow: `
          0 0 20px rgba(0, 102, 255, 0.4), 
          inset 0 0 15px rgba(255, 255, 255, 0.4),
          inset 0 0 4px rgba(255, 255, 255, 0.6)
        `,
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 pointer-events-none" />

      {/* Button Text */}
      <span className="relative text-white text-sm font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
        Book a call
      </span>
    </motion.a>
  );
};

export default BookACallButton;