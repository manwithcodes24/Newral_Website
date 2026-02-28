"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

// Original images from your first component
const projectImages = [
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279630/IMG-20251226-WA0020_ohpdnd.jpg", alt: "Work 1" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279646/Screenshot_20251226-215932_tciwzr.png", alt: "Work 2" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279428/IMG-20251226-WA0018_2_tnov4o.jpg", alt: "Work 2" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279568/IMG-20251226-WA0019_2_il5dpd.jpg", alt: "Work 2" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279429/IMG_20260114_224633974_dzbjbp.jpg", alt: "Work 2" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279427/IMG-20251226-WA0020_2_uvmmle.jpg", alt: "Work 2" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279646/Screenshot_20251226-215932_tciwzr.png", alt: "Work 2" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279620/Screenshot_20251226-220002_3_vwgcpc.png", alt: "Work 2" },
  { src: "https://res.cloudinary.com/dyktjldc4/image/upload/v1772279643/Screenshot_20251226-215956_2_bfuf6b.png", alt: "Work 2" },
 
 
];

export default function CurvedImageScroll() {
  return (
    <div className="relative z-10 w-full">
        <Carousel_003 
          images={projectImages} 
          showPagination 
          showNavigation
          loop 
          autoplay
        />
      </div>
  );
}

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 550px; /* Increased height for full-screen feel */
    padding-bottom: 80px !important;
    padding-top: 20px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 650px; /* Base width for slides */
    height: 550px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }

  @media (min-width: 768px) {
    .Carousal_003 .swiper-slide {
      width: 500px; /* Wider slides for desktop */
    }
  }

  .swiper-pagination-bullet {
    background-color: #fff !important; /* White bullets for black bg */
    opacity: 0.5;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1;
    background-color: #0066FF !important; /* Accent color */
  }

  .swiper-button-next, .swiper-button-prev {
    color: #fff !important;
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("relative w-full px-5", className)}
    >
      <style>{css}</style>

      <Swiper
        autoplay={
          autoplay
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        slidesPerView="auto"
        centeredSlides={true}
        loop={false}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={
          showPagination ? { clickable: true } : false
        }
        navigation={
          showNavigation ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          } : false
        }
        className="Carousal_003"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
            {/* Optional Overlay for better look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </SwiperSlide>
        ))}

        {showNavigation && (
          <>
            <div className="swiper-button-next after:hidden !right-10">
              <ChevronRightIcon className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
            <div className="swiper-button-prev after:hidden !left-10">
              <ChevronLeftIcon className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
          </>
        )}
      </Swiper>
    </motion.div>
  );
};