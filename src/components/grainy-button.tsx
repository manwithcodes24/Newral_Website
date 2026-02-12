import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

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
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 1.2 + 0.5;
    this.opacity = Math.random();
    this.flickerSpeed = Math.random() * 0.02 + 0.01;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    this.opacity += this.flickerSpeed;
    if (this.opacity > 1 || this.opacity < 0.2) this.flickerSpeed *= -1;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function GradientButton({ children, onClick }: GradientButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 80 }, () => new Particle(rect.width, rect.height));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const p of particles) {
        p.update(rect.width, rect.height);
        p.draw(ctx);
      }
      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <button 
      onClick={onClick}
      type="button"
      className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-full bg-gradient-to-b from-[#3EB1FF] to-[#1370F5] text-white text-sm font-normal tracking-tight cursor-pointer shadow-[0_20px_40px_rgba(19,112,245,0.3),inset_0_0_0_1px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(0,40,255,0.4)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_25px_50px_rgba(19,112,245,0.5),inset_0_0_0_1px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full pointer-events-none mix-blend-overlay opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]"
      />
      <span className="relative z-10 drop-shadow-md">{children}</span>
    </button>
  );
}
