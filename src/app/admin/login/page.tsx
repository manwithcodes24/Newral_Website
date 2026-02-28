"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, Briefcase } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true); // New state to prevent flickering
    const router = useRouter();

    // --- CHECK FOR LIVE SESSION ON MOUNT ---
    useEffect(() => {
        const checkSession = async () => {
            try {
                // If this succeeds, a session is live
                await account.get();
                router.push("/admin/dashboard");
            } catch (error) {
                // No session found, stay on login page
                setCheckingSession(false);
            }
        };

        checkSession();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await account.createEmailPasswordSession(email, password);
            router.push("/admin/dashboard");
        } catch (error) {
            alert("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    // Show a full-screen loader while checking for an existing session
    if (checkingSession) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-[#0066FF]" size={40} />
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center bg-black font-sans px-4">
            <div className="absolute inset-0 bg-[#0066FF]/5 blur-[120px] rounded-full" />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="flex flex-col items-center mb-10">
                        <div className="bg-[#0066FF] p-3 rounded-2xl mb-4">
                            <Briefcase className="text-white" size={28} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter text-white text-center">Admin Access</h1>
                        <p className="text-neutral-500 text-sm mt-2 font-medium">Newral Jobs Internal Dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="Admin Email"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-[#0066FF] transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="Secret Password"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black border border-white/10 text-white outline-none focus:border-[#0066FF] transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0066FF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0052cc] transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In to Dashboard"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}