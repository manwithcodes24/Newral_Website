"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  ArrowRight, 
  Plus, 
  MapPin, 
  Loader2, 
  Trash2 // Added Trash icon
} from "lucide-react";

export default function AdminJobsList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;

  const fetchData = async () => {
    try {
      const jobsRes = await databases.listDocuments(DATABASE_ID, "jobs");
      setJobs(jobsRes.documents);

      const appsRes = await databases.listDocuments(DATABASE_ID, "applications");
      const tally: { [key: string]: number } = {};
      appsRes.documents.forEach((app: any) => {
        tally[app.jobId] = (tally[app.jobId] || 0) + 1;
      });
      setCounts(tally);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- DELETE FUNCTION ---
  const handleDeleteJob = async (e: React.MouseEvent, jobId: string) => {
    e.preventDefault(); // Prevents the Link from triggering
    e.stopPropagation(); // Prevents the click from bubbling up

    const confirmDelete = confirm(
      "Are you sure you want to delete this job posting? This will not delete the applications already received, but the job will disappear from the careers page."
    );

    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(DATABASE_ID, "jobs", jobId);
      // Optimistic Update: Remove from UI immediately
      setJobs((prev) => prev.filter((job) => job.$id !== jobId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the job. Please try again.");
    }
  };

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-[#0066FF]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="  mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Manage <span className="text-[#0066FF]">Openings</span>
            </h1>
            <p className="text-neutral-500 mt-2 font-medium">Select a job to view specific applications.</p>
          </div>
          <Link href="/admin/dashboard/jobs/new">
            <button className="bg-[#0066FF] px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-[#0052cc] transition-all">
              <Plus size={20} /> Create New Role
            </button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {jobs.map((job) => (
              <motion.div
                key={job.$id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <Link href={`/admin/dashboard/applications/${job.$id}`}>
                  <motion.div 
                    whileHover={{ y: -5, borderColor: "rgba(0,102,255,0.4)" }}
                    className="bg-neutral-900/50 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between h-full transition-all group cursor-pointer relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-[#0066FF]/10 p-3 rounded-2xl text-[#0066FF]">
                          <Briefcase size={24} />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                            <Users size={16} className="text-[#0066FF]" />
                            <span className="font-bold">{counts[job.$id] || 0} Applicants</span>
                          </div>
                          
                          {/* DELETE BUTTON */}
                          <button
                            onClick={(e) => handleDeleteJob(e, job.$id)}
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            title="Delete Posting"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-[#0066FF] transition-colors">
                        {job.title}
                      </h2>
                      <div className="flex items-center gap-2 text-neutral-500 text-sm mb-8 font-medium">
                        <MapPin size={14} /> {job.location} • {job.jobType}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                        Review Applications
                      </span>
                      <ArrowRight size={20} className="text-neutral-700 group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-neutral-500">No active job postings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}