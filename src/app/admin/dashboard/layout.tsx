"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { account } from "@/lib/appwrite";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  PlusCircle, 
  LogOut, 
  Loader2,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Active Jobs", href: "/admin/dashboard/jobs", icon: Briefcase },
    { name: "Post a Job", href: "/admin/dashboard/jobs/new", icon: PlusCircle },
    { name: "Applications", href: "/admin/dashboard/applications", icon: Users },
  ];

  // While checking auth, show a clean full-screen loader
  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#0066FF]" size={40} />
        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Verifying Admin Session</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-sans">
      
      {/* 1. SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-neutral-900 border-r border-white/5 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-72" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-6 mb-8 overflow-hidden">
            <div className="h-10 w-10 bg-[#0066FF] rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Briefcase className="text-white" size={20} />
            </div>
            {isSidebarOpen && (
              <span className="text-xl font-bold tracking-tighter whitespace-nowrap">NEWRAL <span className="text-[#0066FF]">HR</span></span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all cursor-pointer group ${
                    isActive ? "bg-[#0066FF] text-white" : "text-neutral-500 hover:bg-white/5 hover:text-white"
                  }`}>
                    <item.icon size={22} className={isActive ? "text-white" : "group-hover:text-[#0066FF] transition-colors"} />
                    {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
                    {isActive && isSidebarOpen && <ChevronRight className="ml-auto opacity-50" size={16} />}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Logout at bottom */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all mt-auto"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-72" : "md:ml-20"}`}>
        {/* Top Navbar for Mobile/Toggles */}
        <header className="h-20 border-b border-white/5 flex items-center px-8 bg-black/50 backdrop-blur-md sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg text-neutral-400 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="ml-auto flex items-center gap-4">
             <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Logged in as</p>
                <p className="text-sm font-bold">Newral Admin</p>
             </div>
             <div className="h-10 w-10 bg-neutral-800 rounded-full border border-white/10" />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="relative">
            {children}
        </div>
      </main>
    </div>
  );
}