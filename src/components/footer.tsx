import { Instagram, Linkedin, Globe } from 'lucide-react'
import Image from 'next/image'
import { TextHoverEffect } from './ui/text-hover-effect'
import Newralfottersvg from './Landingpage/FotterSVG'

export default function Footer() {
    return (
        <div className="relative font-sans w-full bg-blue-600  overflow-hidden">
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
                                <p className="text-white text-lg font-medium">+91700422422</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="col-span-1">
                            <h3 className="text-white text-3xl font-medium mb-6">Navigation</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        Clients
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        Blogs
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Products */}
                        <div className="col-span-1">
                            <h3 className="text-white text-3xl font-medium mb-6">Products</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        LMS
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        OMS
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        HRMS
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        Lead Management
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        University Management
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Services and CTA */}
                        <div className="col-span-1">
                            <div className="mb-12">
                                <h3 className="text-white text-3xl font-medium mb-6">Services</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                            Web Development
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                            Products
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                            Projects
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                            Clients
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA Section */}

                        </div>
                        <div>
                            <p className="text-white text-md mb-2">- Let's get in touch</p>
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
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        <Instagram size={24} />
                                    </a>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        <Linkedin size={24} />
                                    </a>
                                    <a href="#" className="text-white hover:text-blue-100 transition-colors">
                                        <Globe size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="">
               <Newralfottersvg />
            </div>
            
        </div>
    )
}
