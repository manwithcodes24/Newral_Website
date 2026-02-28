"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Briefcase, Loader2 } from "lucide-react";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = "jobs";

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal("isActive", true)]
        );
        setJobs(res.documents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Loader2 className="text-[#0066FF] animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#0066FF]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#0066FF]/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#0066FF] font-bold tracking-[0.3em] uppercase text-xs"
          >
            Join the Squad
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mt-4 mb-8 leading-[0.9]"
          >
            Build the future <br /> 
            <span className="text-neutral-500 italic font-medium">with Newral.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl"
          >
            We're looking for outliers, misfits, and geniuses to help us redefine product development.
          </motion.p>
        </div>
      </section>

      {/* Jobs List */}
      <section className="max-w-5xl mx-auto p-6 pb-32">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tight">Open Positions</h2>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-neutral-500 font-mono text-sm">{jobs.length} roles</span>
        </div>

        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.$id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/careers/${job.slug}`}
                className="group relative block p-8 bg-neutral-900/40 border border-white/5 rounded-[2rem] hover:border-[#0066FF]/50 transition-all overflow-hidden"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/0 via-[#0066FF]/5 to-[#0066FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[#0066FF] transition-colors">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-neutral-400 font-medium text-sm uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#0066FF]" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#0066FF]" /> {job.jobType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">View details</span>
                    <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                        <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {jobs.length === 0 && (
            <div className="text-center py-20 bg-neutral-900/20 rounded-[3rem] border border-dashed border-white/10">
              <Briefcase className="mx-auto text-neutral-700 mb-4" size={48} />
              <p className="text-neutral-500 font-medium italic">No openings right now. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}