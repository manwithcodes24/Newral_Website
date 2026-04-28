"use client";
import { div } from "framer-motion/client";
import { useState } from "react";

const SlimRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder-white/20";

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("🎉 Submitted successfully! We'll contact you within 24 hours.");

        // reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          city: "",
        });
      } else {
        alert("Something went wrong 😅");
      }
    } catch (err) {
      alert("Server error 😅");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
<div className="bg-zinc-950 border border-white/10 p-8 md:p-12  rounded-[2rem] max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-2">
          Claim Your Spot 🚀
        </h3>
        <p className="text-white/40 text-sm uppercase tracking-widest font-mono">
          We'll call you within 24 hours
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name + Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className={inputClass}
            required
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className={inputClass}
            required
          />
        </div>

        {/* Phone + City */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Phone Number"
            className={inputClass}
            required
          />

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            type="text"
            placeholder="City"
            className={inputClass}
            required
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Request a Callback →"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default SlimRegistrationForm;