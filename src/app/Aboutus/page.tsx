"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { useRef, useEffect, useState } from "react"
import AboutSection from "@/components/about-us/the-company"
import HeroAboutus from "@/components/about-us/hero-section"
import ExpandableCards from "@/components/about-us/expandable-cards"
import FounderSection from "../../components/about-us/founder-section"
import TeamSection from "../../components/about-us/our-team"
import SOREADYWITHSECTION from "../../components/about-us/so-ready-with-collab"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <main className="relative bg-black">
      <CustomCursor />
      <GrainOverlay />
      <section className="relative h-screen bg-black">
        {/* Shader Background Container */}
        <div
          ref={shaderContainerRef}
          className={`absolute border-b-2 border-white/10 inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Shader className="h-full w-full">
            <Swirl
              colorA="#0000FE" // Dark Blue
              colorB="#0A0A0A" // Near Black
              speed={0.8}
              detail={0.8}
              blend={50}
            />
            <ChromaFlow
              baseColor="#0A0A0A" // Near Black
              upColor="#0000FE"   // Dark Blue
              downColor="#0A0A0A" // Near Black
              leftColor="#6666FE" // Light Blue
              rightColor="#CCCCFF" // Very Light Blue/Lavender
              intensity={0.9}
              radius={1.8}
              momentum={25}
              maskType="alpha"
              opacity={0.97}
            />
          </Shader>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <HeroAboutus />
        
      </section>
      <AboutSection />
      <ExpandableCards />
      <FounderSection />
      <TeamSection />
      <SOREADYWITHSECTION />
    </main>
  )
}
