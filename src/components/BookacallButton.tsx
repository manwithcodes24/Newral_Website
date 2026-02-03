"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BookCallButton = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Resize canvas to match button size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        // Slow "ocean" swimming movement
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges like an infinite ocean
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
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
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all rounded-full group  bg-gradient-to-b from-[#0066FF] to-[#0DA2FF]"
      style={{
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 12px rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      {/* The Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full drop-shadow-white shadow-lg  h-full pointer-events-none"
      />

      {/* Glossy Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 pointer-events-none" />

      {/* Button Text */}
      <span className="relative text-white text-md font-sans tracking-tight  drop-shadow-md">
        Book a call
      </span>

      {/* Inner Glow Border */}
      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
    </motion.a>
  );
};

export default BookCallButton;