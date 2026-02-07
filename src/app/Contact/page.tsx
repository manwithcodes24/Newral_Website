"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";

const ContactPage = () => {
    // 1. STATE FOR FORM STATUS
    const [status, setStatus] = useState("idle"); // idle, sending, success, error
    const [message, setMessage] = useState("");

    // 2. WEB3FORMS SUBMIT HANDLER
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        const formData = new FormData(e.target as HTMLFormElement);
        // Using the API key from your environment variable
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORM || "");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setMessage("Thank you! We will get back to you soon.");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
                setMessage(data.message || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Network error. Please try again later.");
        }
    };

    return (
        <section className="relative pt-24 min-h-screen bg-black text-white overflow-hidden font-sans">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            {/* Main Container - max-w-7xl ensures consistency on 21" monitors */}
            <div className=" mx-auto px-8 py-20 lg:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 lg:gap-32">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tighter leading-none mb-8"
                            >
                                Let’s Talk
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed"
                            >
                                Not sure where to start? Tell us about your product, your timeline,
                                how you heard about us, and where you’re located.
                            </motion.p>
                        </div>

                        <div className="mt-20 space-y-10">
                            <div>
                                <h4 className="text-gray-300 font-semibold text-lg mb-2">Opening Hours</h4>
                                <p className="text-gray-500">Mon to Sat : 10.00am - 7:00pm</p>
                            </div>
                            <div>
                                <h4 className="text-gray-300 font-semibold text-lg mb-2">Office Address</h4>
                                <p className="text-gray-500 leading-relaxed max-w-xs">
                                    412, 4th Floor, Tower-B, i-thum Building, Sector 62, Noida, India
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Name */}
                                <div className="group relative">
                                    <label className="block text-sm text-gray-400 mb-2">Name*</label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-blue-600 transition-all placeholder:text-gray-700 text-lg"
                                    />
                                </div>
                                {/* Email */}
                                <div className="group relative">
                                    <label className="block text-sm text-gray-400 mb-2">Email*</label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        placeholder="Enter your e-mail"
                                        className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-blue-600 transition-all placeholder:text-gray-700 text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Source */}
                                <div className="group relative">
                                    <label className="block text-sm text-gray-400 mb-2">How did you hear of us?</label>
                                    <input
                                        name="source"
                                        type="text"
                                        placeholder="Google, LinkedIn, etc."
                                        className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-blue-600 transition-all placeholder:text-gray-700 text-lg"
                                    />
                                </div>
                                {/* Stage Selection */}
                                <div className="group relative">
                                    <label className="block text-sm text-gray-400 mb-2">Company Stage</label>
                                    <div className="relative">
                                        <select
                                            name="stage"
                                            className="w-full bg-black border-b border-gray-800 py-3 outline-none focus:border-blue-600 transition-all text-gray-400 appearance-none text-lg"
                                        >
                                            <option value="">Select Stage</option>
                                            <option value="early">Early Stage</option>
                                            <option value="scaleup">Scale-up</option>
                                            <option value="enterprise">Enterprise</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="group relative">
                                <label className="block text-sm text-gray-400 mb-2">Message*</label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    placeholder="Write your message"
                                    className="w-full bg-transparent border-b border-gray-800 py-3 outline-none focus:border-blue-600 transition-all placeholder:text-gray-700 text-lg resize-none"
                                />
                            </div>

                            {/* Footer Area with Submit and Success Message */}
                            <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

                                <AnimatePresence mode="wait">
                                    {status === "success" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center text-green-500 gap-2">
                                            <CheckCircle2 size={20} /> <span>{message}</span>
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center text-red-500 gap-2">
                                            <AlertCircle size={20} /> <span>{message}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    disabled={status === "sending"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className={`
                                        bg-[#0066FF] text-white font-bold py-4 px-16 rounded-full text-lg shadow-lg transition-all
                                        ${status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 shadow-blue-600/20"}
                                    `}
                                >
                                    {status === "sending" ? "Sending..." : "Submit"}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;