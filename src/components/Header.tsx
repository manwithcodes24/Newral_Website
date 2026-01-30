'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const navItems = ['Home', 'About us', 'Services', 'Projects', 'Contact']

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <nav className="fixed top-0 w-full z-50 rounded-b-xl backdrop-blur-md ">
      <style>{`

        .logo-text {
          animation: slide-in 0.6s ease-out;
          background: linear-gradient(135deg, #0066FF 0%, #0066FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .nav-item {
          position: relative;
          transition: all 0.3s ease;
        }

    
        .cta-button {
          position: relative;
          animation: glow-pulse 2s ease-in-out infinite;
          background: linear-gradient(30deg, #0066FF 30%, #77C0FF 100%);
          transition: all 0.3s ease;
          overflow: hidden;
        }

      `}</style>

      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
             src="https://res.cloudinary.com/dyktjldc4/image/upload/v1765014955/fymyyilfyvvf3f1qekuf.png"
             className='h-10 w-auto'
             alt="newral" 
             width={100} 
             height={100} />
          </Link>

          {/* Nav Items */}
          <div className="nav-container hidden p-1 md:flex items-center gap-1 bg-[#1A1A1A] backdrop-blur-sm rounded-full ">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="nav-item px-6 py-4 hover:bg-[#121111] rounded-full text-sm font-sans text-foreground transition-all duration-300"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button className="cta-button  px-6 py-2.5 rounded-full text-sm font-semibold text-white border border-accent/50 hover:border-accent/80 transition-all duration-300">
            Book a call
          </button>
        </div>
      </div>
    </nav>
  )
}
