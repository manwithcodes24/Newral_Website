"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query, ID } from "appwrite";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Send, Link as LinkIcon, CheckCircle2, 
  User, Mail, Phone, FileText 
} from "lucide-react";

export default function JobDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState(false);

  // Matching your Appwrite Column Names exactly
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
          "jobs",
          [Query.equal("slug", slug as string)]
        );
        if (res.documents.length > 0) setJob(res.documents[0]);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setApplying(true);

      // Create document in "applications" collection
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        "applications",
        ID.unique(),
        {
          jobId: job.$id,          // Required
          fullName: formData.fullName, // Required
          email: formData.email,       // Required
          phone: formData.phone,       // Required
          resumeLink: formData.resumeLink, // Required
          coverLetter: formData.coverLetter || null, // Optional
          status: "pending", // Required Enum (Ensure "applied" is an option in your Appwrite Enum)
        }
      );
      
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please check if all required fields are valid.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return null;
  if (!job) return <div className="h-screen bg-black flex items-center justify-center text-white font-sans">Job not found.</div>;

  return (
    <div className="min-h-screen bg-black pt-36 text-white py-20 px-6 font-sans selection:bg-[#0066FF]">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Careers
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: JOB DESCRIPTION */}
          <div className="lg:col-span-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 leading-none">
                {job.title}
              </h1>
              <div className="flex gap-4 text-[#0066FF] font-bold text-xs uppercase tracking-[0.3em] mb-12">
                <span>{job.location}</span>
                <span className="opacity-20">•</span>
                <span>{job.jobType}</span>
              </div>
              
              <div className="space-y-8 text-neutral-400 leading-relaxed text-lg">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-white text-xl font-bold mb-4 uppercase tracking-widest text-sm">Role Overview</h3>
                  <div className="whitespace-pre-wrap">{job.description}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: APPLICATION FORM */}
          <div className="lg:col-span-6">
            <div className="sticky top-10">
              <div className="p-8 md:p-12 bg-neutral-900/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] shadow-2xl">
                {success ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <div className="bg-green-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">Application Sent</h3>
                    <p className="text-neutral-500 font-medium leading-relaxed">
                        Your profile is now in our system. We'll reach out if your skills match our vision.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold mb-2 tracking-tight">Apply for this position</h3>
                    <p className="text-neutral-500 text-sm mb-10">All fields marked with an icon are required.</p>
                    
                    <form onSubmit={handleApply} className="space-y-5">
                      {/* Full Name */}
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          required 
                          placeholder="Full Name" 
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-black border border-white/10 outline-none focus:border-[#0066FF] transition-all text-white"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Email */}
                        <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                          <input 
                            required type="email" placeholder="Email Address" 
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-black border border-white/10 outline-none focus:border-[#0066FF] transition-all text-white"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                          <input 
                            required type="tel" placeholder="Phone Number" 
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-black border border-white/10 outline-none focus:border-[#0066FF] transition-all text-white"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Resume Link */}
                      <div className="relative">
                        <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          required type="url" placeholder="Resume Link (Google Drive / Portfolio)" 
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-black border border-white/10 outline-none focus:border-[#0066FF] transition-all text-white"
                          value={formData.resumeLink}
                          onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
                        />
                      </div>

                      {/* Cover Letter (Optional) */}
                      <div className="relative">
                        <FileText className="absolute left-5 top-6 text-neutral-600" size={18} />
                        <textarea 
                          placeholder="Cover Letter / Why should we hire you? (Optional)" 
                          className="w-full pl-14 pr-6 py-4 h-32 rounded-2xl bg-black border border-white/10 outline-none focus:border-[#0066FF] transition-all text-white resize-none"
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                        />
                      </div>

                      <button 
                        disabled={applying}
                        className="w-full bg-[#0066FF] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0052cc] transition-all disabled:opacity-50 shadow-xl shadow-blue-500/10 mt-6 group"
                      >
                        {applying ? "Processing..." : <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Submit Application</>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}