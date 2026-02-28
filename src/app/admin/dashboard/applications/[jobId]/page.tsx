"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Mail, Phone, 
  CheckCircle, Clock, Trash2, User, FileText 
} from "lucide-react";

export default function JobSpecificApplications() {
  const { jobId } = useParams();
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // 1. Fetch Job Info
        const jobInfo = await databases.getDocument(DATABASE_ID, "jobs", jobId as string);
        setJob(jobInfo);

        // 2. Fetch Applications for THIS jobId only
        const appsRes = await databases.listDocuments(
          DATABASE_ID, 
          "applications", 
          [Query.equal("jobId", jobId as string), Query.orderDesc("$createdAt")]
        );
        setApplications(appsRes.documents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [jobId]);

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "done" : "pending";
    try {
      await databases.updateDocument(DATABASE_ID, "applications", id, { status: newStatus });
      setApplications(prev => prev.map(a => a.$id === id ? { ...a, status: newStatus } : a));
    } catch (e) { alert("Error updating"); }
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Delete application?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, "applications", id);
      setApplications(prev => prev.filter(a => a.$id !== id));
    } catch (e) { alert("Error deleting"); }
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading pipeline...</div>;

  return (
    <div className="min-h-screen  bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header */}
        <button onClick={() => router.push("/admin/dashboard/jobs")} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> All Openings
        </button>

        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter">{job?.title} <span className="text-[#0066FF]">Candidates</span></h1>
          <p className="text-neutral-500 mt-2 font-medium">{applications.length} people applied for this position.</p>
        </header>

        {/* Applications List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {applications.map((app) => (
              <motion.div
                key={app.$id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-[#0066FF]/30 transition-all"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-neutral-400">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{app.fullName}</h3>
                        <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em]">{new Date(app.$createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm font-medium text-neutral-400">
                    <div className="flex items-center gap-2"><Mail size={14} className="text-[#0066FF]" /> {app.email}</div>
                    <div className="flex items-center gap-2"><Phone size={14} className="text-[#0066FF]" /> {app.phone}</div>
                  </div>

                  {app.coverLetter && (
                    <div className="text-sm text-neutral-500 bg-black/30 p-4 rounded-2xl border border-white/5 italic">
                      "{app.coverLetter}"
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <a href={app.resumeLink} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#0066FF] hover:text-white transition-all">
                    Resume <ExternalLink size={14} />
                  </a>

                  <button 
                    onClick={() => updateStatus(app.$id, app.status)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border transition-all ${
                        app.status === "done" ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {app.status === "done" ? <CheckCircle size={16} /> : <Clock size={16} />}
                    {app.status === "done" ? "Shortlisted" : "Pending"}
                  </button>

                  <button onClick={() => deleteApp(app.$id)} className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {applications.length === 0 && (
            <div className="text-center py-24 bg-neutral-900/20 rounded-[3rem] border border-dashed border-white/5">
                <FileText className="mx-auto text-neutral-800 mb-4" size={48} />
                <p className="text-neutral-500 font-medium italic">No one has applied for this role yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ExternalLink = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
)