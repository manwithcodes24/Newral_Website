"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Linkedin, Globe } from "lucide-react";
import Image from "next/image";
import FooterSVG from "./landing-page/footer-svg";
import Link from "next/link";

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!footerRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            let isAnimating = false;

            ScrollTrigger.create({
                trigger: footerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                onUpdate: (self) => {
                    if (self.direction !== 1) return; // only when scrolling down
                    const velocity = self.getVelocity();
                    if (velocity < 300) return; // ignore slow scrolls
                    if (isAnimating) return;

                    isAnimating = true;
                    gsap.killTweensOf(footerRef.current);
                    gsap.fromTo(
                        footerRef.current,
                        { y: 24 },
                        {
                            y: 0,
                            duration: 1.1,
                            ease: "elastic.out(1, 0.45)",
                            clearProps: "transform",
                            onComplete: () => {
                                isAnimating = false;
                            },
                        },
                    );
                },
            });
        }, footerRef);

        return () => {
            ctx.revert();
        };
    }, []);



    return (
        <div ref={footerRef} className="relative font-sans w-full bg-blue-600 overflow-hidden">
            {/* Footer content */}
            <div className="relative z-10 px-8 lg:px-20 py-16">
                <div className=" mx-auto">
                    {/* Top row - Logo, Navigation, CTA */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
                        {/* Left - Logo and Contact */}
                        <div className="col-span-1">
                            <div className="mb-8">
                                <Image
                                    src="https://res.cloudinary.com/dyktjldc4/image/upload/v1769796748/5479111_fu2nt7.png"
                                    alt="Newral Logo Watermark"
                                    width={400}
                                    height={400}
                                    className='h-auto w-32'
                                />
                            </div>
                            <p className="text-white text-sm leading-relaxed mb-8">
                                412, 4th Floor, Tower-B, i-thum Building, Sector 62 (Near Electronic City Metro Station), Noida, Uttar Pradesh, India
                            </p>
                            <div>
                                <p className="text-white text-sm mb-2">Contact us</p>
                                <p className="text-white text-lg font-medium">+91-9116768791</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="col-span-1">
                            <h3 className="text-white text-3xl font-medium mb-6">Navigation</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-white hover:text-blue-100 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Aboutus" className="text-white hover:text-blue-100 transition-colors">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Services" className="text-white hover:text-blue-100 transition-colors">
                                        Services
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="/Contact" className="text-white hover:text-blue-100 transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                                  <li>
                                    <Link href="/careers" className="text-white hover:text-blue-100 transition-colors">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blogs" className="text-white hover:text-blue-100 transition-colors">
                                        Blogs
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Products */}
                        <div className="col-span-1">
                            <h3 className="text-white text-3xl font-medium mb-6">Products</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="https://synappses.in/" className="text-white hover:text-blue-100 transition-colors">
                                        LMS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://synappses.in/" className="text-white hover:text-blue-100 transition-colors">
                                        OMS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://synappses.in/" className="text-white hover:text-blue-100 transition-colors">
                                        HRMS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://synappses.in/" className="text-white hover:text-blue-100 transition-colors">
                                        Lead Management
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://synappses.in/" className="text-white hover:text-blue-100 transition-colors">
                                        University Management
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Services and CTA */}
                        <div className="col-span-1">
                            <div className="mb-12">
                                <h3 className="text-white text-3xl font-medium mb-6">Services</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/Services/service?service=web-development" className="text-white hover:text-blue-100 transition-colors">
                                            Web Development
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/Services/service?service=app-development" className="text-white hover:text-blue-100 transition-colors">
                                            App Devlopment
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/Services/service?service=branding" className="text-white hover:text-blue-100 transition-colors">
                                            Branding & Graphic 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link  href="/Services/service?service=devops" className="text-white hover:text-blue-100 transition-colors">
                                            Devops nd Cloud Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link  href="/Services/service?service=ui-ux" className="text-white hover:text-blue-100 transition-colors">
                                           Ui - UX
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA Section */}

                        </div>
                        <div>
                            <p className="text-white text-md mb-2">- Lets get in touch</p>
                            <a
                                href="mailto:tech@newral.in"
                                className="text-white font-sans text-4xl font-bold hover:text-blue-100 transition-colors break-words"
                            >
                                tech@newral.in
                            </a>
                            {/* Bottom row - Social links */}
                            <div className="flex justify-between items-center mt-12 ">
                                <div className="text-white text-sm">Follow us</div>
                                <div className="flex gap-4">
                                    <a href="https://instagram.com/newralofficial" className="text-white hover:text-blue-100 transition-colors">
                                        <Instagram size={24} />
                                    </a>
                                    <a href="https://www.linkedin.com/company/newralinc" className="text-white hover:text-blue-100 transition-colors">
                                        <Linkedin size={24} />
                                    </a>
                                    <a href="https://newral.in" className="text-white hover:text-blue-100 transition-colors">
                                        <Globe size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="">
               <FooterSVG />
            </div>
            
        </div>
    )
}
