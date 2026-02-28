"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { motion } from "framer-motion";
import { ArrowLeft, Save, MapPin, DollarSign, Type, FileText } from "lucide-react";
import Link from "next/link";

export default function CreateJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
    const COLLECTION_ID = "jobs";

    const [formData, setFormData] = useState({
        title: "", slug: "", description: "", location: "", jobType: "", salary: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.description) return alert("Fill mandatory fields");
        try {
            setLoading(true);
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                ...formData, isActive: true,
            });
            router.push("/admin/dashboard");
        } catch (error) {
            console.error(error);
            alert("Failed to create job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 md:px-0">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/dashboard" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Overview
                </Link>

                <h1 className="text-5xl font-bold tracking-tighter mb-12">Create <span className="text-[#0066FF]">Job Posting</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <FormInput label="Job Title" name="title" icon={Type} placeholder="e.g. Senior Product Designer" value={formData.title} onChange={handleChange} />
                    <FormInput label="Slug" name="slug" icon={Type} placeholder="e.g. senior-product-designer" value={formData.slug} onChange={handleChange} />
                    <FormInput label="Location" name="location" icon={MapPin} placeholder="Remote / Jaipur / Hybrid" value={formData.location} onChange={handleChange} />
                    <FormInput label="Job Type" name="jobType" icon={Type} placeholder="Full-time / Internship" value={formData.jobType} onChange={handleChange} />
                    <FormInput label="Salary Range" name="salary" icon={DollarSign} placeholder="e.g. $80k - $120k" value={formData.salary} onChange={handleChange} />
                </div>

                <div className="space-y-3 mb-10">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 px-2">
                        <FileText size={14} /> Job Description
                    </label>
                    <textarea
                        name="description"
                        className="w-full bg-neutral-900/50 border border-white/10 p-6 h-64 rounded-[2rem] outline-none focus:border-[#0066FF] transition-all"
                        placeholder="Write a compelling job description..."
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-white text-black py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#0066FF] hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                >
                    {loading ? "Publishing to Board..." : <><Save size={20} /> Publish Job Posting</>}
                </button>
            </div>
        </div>
    );
}

function FormInput({ label, name, icon: Icon, placeholder, value, onChange }: any) {
    return (
        <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 px-2">
                <Icon size={14} /> {label}
            </label>
            <input
                name={name}
                className="w-full bg-neutral-900/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#0066FF] transition-all"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}