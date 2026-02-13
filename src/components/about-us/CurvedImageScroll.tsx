"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://framerusercontent.com/images/guTvz93mLOPHTkgY4g7j0MR5300.png?width=869&height=869",
  "https://framerusercontent.com/images/pf319p8tj2BSeP9DOOwIafc.png?width=495&height=334",
  "https://framerusercontent.com/images/JEWDhEgIKJXYZgs0LQVW2GWK7xk.png?width=495&height=343",
  "https://framerusercontent.com/images/rQTxeLr25drz04LBbgpxjQiZ1c.png?width=495&height=612",
  "https://framerusercontent.com/images/1x7yQo0jurjhMlYJs4wrRLI6JUo.png?width=1080&height=1225",
  "https://framerusercontent.com/images/VZ2QcCdLl40KYmYeci5fIY7Treo.jpg?scale-down-to=1024&width=3024&height=3064",
];

export default function CurvedImageScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const totalItems = itemsRef.current.length;

    // Horizontal panoramic movement
    gsap.to(itemsRef.current, {
      xPercent: -100 * (totalItems - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Subtle depth polish (same for all)
    gsap.fromTo(
      itemsRef.current,
      {
        scale: 0.98,
        opacity: 0.85,
      },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      <div className="flex h-full items-center perspective-distant">
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            className="min-w-[50vw] h-[60vh] mx-8 rounded-xl overflow-hidden transform-style-preserve-3d"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
