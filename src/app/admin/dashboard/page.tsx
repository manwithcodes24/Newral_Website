"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { databases, account } from "@/lib/appwrite";
import { Query } from "appwrite";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Users, FileText, Activity, List, 
  LogOut, Loader2, ChevronRight, UserCheck 
} from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ jobs: 0, applicants: 0 });
    const [recentApps, setRecentApps] = useState<any[]>([]);

    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;

    useEffect(() => {
        const initDashboard = async () => {
            const user = await getCurrentUser();
            if (!user) {
                router.push("/admin/login");
                return;
            }
            await fetchLiveStats();
            setLoading(false);
        };
        initDashboard();
    }, []);

    const fetchLiveStats = async () => {
        try {
            // 1. Get Job Count
            const jobsRes = await databases.listDocuments(DATABASE_ID, "jobs", [
                Query.equal("isActive", true)
            ]);
            
            // 2. Get Application Count & Recent Activity
            const appsRes = await databases.listDocuments(DATABASE_ID, "applications", [
                Query.orderDesc("$createdAt"),
                Query.limit(5)
            ]);

            setStats({
                jobs: jobsRes.total,
                applicants: appsRes.total
            });
            setRecentApps(appsRes.documents);
        } catch (error) {
            console.error("Dashboard Fetch Error:", error);
        }
    };

    const handleLogout = async () => {
        await account.deleteSession("current");
        router.push("/admin/login");
    };

    if (loading) return (
        <div className="h-screen bg-black flex items-center justify-center">
            <Loader2 className="animate-spin text-[#0066FF]" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#0066FF]">
            {/* Main Content */}
            <div className="max-w-7xl pt-36 mx-auto px-6 py-20">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-6xl font-bold tracking-tighter"
                        >
                            Console <span className="text-[#0066FF]">Overview</span>
                        </motion.h1>
                        <p className="text-neutral-500 mt-3 font-medium text-lg">Real-time metrics for Newral hiring pipeline.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/admin/dashboard/jobs/new">
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#0066FF] px-8 py-4 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20 cursor-pointer text-sm"
                            >
                                <Plus size={18} /> New Posting
                            </motion.div>
                        </Link>
                        
                        <Link href="/admin/dashboard/jobs/">
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-2 font-bold cursor-pointer text-sm hover:bg-white/10 transition-colors"
                            >
                                <List size={18} /> All Jobs
                            </motion.div>
                        </Link>

                        <button 
                            onClick={handleLogout}
                            className="p-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard 
                        icon={FileText} 
                        title="Active Postings" 
                        value={stats.jobs} 
                        description="Live on careers page"
                    />
                    <StatCard 
                        icon={Users} 
                        title="Total Applicants" 
                        value={stats.applicants} 
                        description="Candidates in pipeline"
                    />
                    <StatCard 
                        icon={Activity} 
                        title="System Health" 
                        value="99.9%" 
                        description="Database & Storage Sync"
                        isGreen
                    />
                </div>

                {/* Recent Activity Section */}
                <div className="bg-neutral-900/40 border border-white/5 rounded-[3rem] overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-xl font-bold tracking-tight">Recent Applications</h3>
                        <Link href="/admin/dashboard/jobs" className="text-xs font-bold text-[#0066FF] uppercase tracking-widest hover:underline">
                            View all by job
                        </Link>
                    </div>

                    <div className="p-2">
                        {recentApps.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {recentApps.map((app, i) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={app.$id}
                                        className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors rounded-2xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-[#0066FF]">
                                                <UserCheck size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{app.fullName}</p>
                                                <p className="text-xs text-neutral-500 font-medium">{app.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1">Applied On</p>
                                            <p className="text-sm font-medium">{new Date(app.$createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <ChevronRight size={20} className="text-neutral-700" />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center text-neutral-600 font-bold uppercase tracking-widest text-sm">
                                No recent activity found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, title, value, description, isGreen }: any) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col gap-6"
        >
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${isGreen ? 'bg-green-500/10 text-green-500' : 'bg-[#0066FF]/10 text-[#0066FF]'}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">{title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-4xl font-bold tracking-tighter">{value}</p>
                </div>
                <p className="text-xs text-neutral-600 mt-2 font-medium">{description}</p>
            </div>
        </motion.div>
    );
}