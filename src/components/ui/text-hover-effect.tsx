"use client";
import React, { useRef, useState } from "react";

export const TextHoverEffect = ({
  text,
  duration = 0.2,
}: {
  text: string;
  duration?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      className=" w-full h-full select-none group"
      onMouseMove={handleMouseMove}
      style={{ '--mouse-x': `${mousePosition.x}%`, '--mouse-y': `${mousePosition.y}%` } as React.CSSProperties}
    >
      {/* Background text */}
      <h2 className="absolute inset-0 flex items-center justify-center text-8xl font-bold italic font-[helvetica] text-white opacity-40 pointer-events-none">
        {text}
      </h2>

      {/* Animated outline text */}
      <div className="absolute inset-0 flex items-center justify-center animate-draw-outline pointer-events-none">
        <h2 className="text-8xl font-bold italic font-[helvetica] text-transparent [stroke-dasharray:1000] [stroke-dashoffset:1000] animate-[strokeDraw_4s_ease-in-out_forwards]"
            style={{ WebkitTextStroke: "0.3px rgba(255, 255, 255, 0.4)" }}>
          {text}
        </h2>
      </div>

      {/* Masked text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out group-hover:opacity-100"
          style={{
            maskImage: `radial-gradient(circle 100px at var(--mouse-x) var(--mouse-y), white, transparent)`,
            WebkitMaskImage: `radial-gradient(circle 100px at var(--mouse-x) var(--mouse-y), white, transparent)`,
            transitionDuration: `${duration}s`,
          }}
        >
          <h2 className="text-8xl font-bold italic font-[helvetica] text-white opacity-100">
            {text}
          </h2>
        </div>
      </div>
    </div>
  );
};