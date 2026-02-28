"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileUser, Mail, Phone, ExternalLink, 
  CheckCircle, Clock, Trash2, Filter, 
  ArrowUpDown, ChevronDown, Copy, Search 
} from "lucide-react";

export default function HRApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedJobId, setSelectedJobId] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [selectedJobId, sortOrder]);

  const fetchJobs = async () => {
    const res = await databases.listDocuments(DATABASE_ID, "jobs");
    setJobs(res.documents);
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let queries = [
        sortOrder === "desc" ? Query.orderDesc("$createdAt") : Query.orderAsc("$createdAt")
      ];

      if (selectedJobId !== "all") {
        queries.push(Query.equal("jobId", selectedJobId));
      }

      const res = await databases.listDocuments(DATABASE_ID, "applications", queries);
      setApplications(res.documents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "done" : "pending";
    try {
      await databases.updateDocument(DATABASE_ID, "applications", id, {
        status: newStatus
      });
      // Optimistic Update
      setApplications(prev => prev.map(app => app.$id === id ? { ...app, status: newStatus } : app));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, "applications", id);
      setApplications(prev => prev.filter(app => app.$id !== id));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen  bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl  mx-auto">
        
        {/* HEADER & FILTERS */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Applicant <span className="text-[#0066FF]">Pipeline</span></h1>
            <p className="text-neutral-500 mt-2 font-medium">Review talent and manage hiring status.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Filter by Job */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 ml-1">Filter by Role</span>
              <div className="relative">
                <select 
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="appearance-none bg-neutral-900 border border-white/10 px-4 py-3 pr-10 rounded-xl text-sm outline-none focus:border-[#0066FF] transition-all cursor-pointer"
                >
                  <option value="all">All Positions</option>
                  {jobs.map(job => (
                    <option key={job.$id} value={job.$id}>{job.title}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Sort by Time */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 ml-1">Sort Time</span>
              <button 
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className="flex items-center gap-2 bg-neutral-900 border border-white/10 px-4 py-3 rounded-xl text-sm hover:border-white/20 transition-all"
              >
                <ArrowUpDown size={16} className="text-[#0066FF]" />
                {sortOrder === "desc" ? "Newest First" : "Oldest First"}
              </button>
            </div>
          </div>
        </header>

        {/* APPLICATIONS LIST */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#0066FF]"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {applications.map((app) => (
                <motion.div
                  key={app.$id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-neutral-900/50 border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between group hover:border-white/10 transition-all"
                >
                  {/* Candidate Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
                        <FileUser size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">{app.fullName}</h3>
                        <p className="text-[#0066FF] text-xs font-bold uppercase tracking-widest">Applied for {jobs.find(j => j.$id === app.jobId)?.title || "Unknown Role"}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                      <button onClick={() => copyToClipboard(app.email)} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group/btn">
                        <Mail size={14} /> {app.email} <Copy size={12} className="opacity-0 group-hover/btn:opacity-100" />
                      </button>
                      <button onClick={() => copyToClipboard(app.phone)} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group/btn">
                        <Phone size={14} /> {app.phone} <Copy size={12} className="opacity-0 group-hover/btn:opacity-100" />
                      </button>
                      <div className="flex items-center gap-2 text-neutral-600">
                        <Clock size={14} /> {new Date(app.$createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {app.coverLetter && (
                      <div className="bg-black/40 p-4 rounded-2xl text-sm text-neutral-400 leading-relaxed max-w-2xl border border-white/5">
                        <p className="font-bold text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Cover Letter</p>
                        {app.coverLetter}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    {/* Resume Link */}
                    <a 
                      href={app.resumeLink} 
                      target="_blank" 
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0066FF] hover:text-white transition-all"
                    >
                      View Resume <ExternalLink size={14} />
                    </a>

                    {/* Status Toggle */}
                    <button 
                      onClick={() => updateStatus(app.$id, app.status)}
                      className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all ${
                        app.status === "done" 
                        ? "bg-green-500/10 border-green-500/20 text-green-500" 
                        : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {app.status === "done" ? <CheckCircle size={16} /> : <Clock size={16} />}
                      {app.status === "done" ? "Done" : "Pending"}
                    </button>

                    {/* Delete */}
                    <button 
                      onClick={() => deleteApplication(app.$id)}
                      className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {applications.length === 0 && (
              <div className="text-center py-32 bg-neutral-900/20 rounded-[3rem] border border-dashed border-white/5">
                <Search className="mx-auto text-neutral-800 mb-4" size={48} />
                <p className="text-neutral-500 font-medium italic">No applications found for these filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}