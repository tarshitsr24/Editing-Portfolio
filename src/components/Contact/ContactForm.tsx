"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { Instagram, Fiverr, WhatsApp } from "@/components/UI/Icons";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Short Form Content",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync service selection when clicking "Book Service" in the Services section
  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        let mappedType = "Other";
        const service = customEvent.detail;
        if (service === "Social Media Reels & Shorts") {
          mappedType = "Short Form Content";
        } else if (service === "YouTube Video Editing" || service === "Trailer Editing") {
          mappedType = "Edits (movie, sports edits, etc)";
        } else {
          mappedType = "Others";
        }

        setFormData((prev) => ({
          ...prev,
          projectType: mappedType,
        }));
      }
    };

    window.addEventListener("select-service", handleSelectService);
    return () => {
      window.removeEventListener("select-service", handleSelectService);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xgobgbjl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          projectType: "Short Form Content",
          message: "",
        });
        // Clear success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Oops! There was a problem submitting your form. Please try again or email directly.");
      }
    } catch (error) {
      console.error("Formspree submit error:", error);
      alert("Oops! There was a problem submitting your form. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    { name: "Email", handle: "tarshitrana@gmail.com", icon: Mail, url: "mailto:tarshitrana@gmail.com", color: "hover:text-brand-blue hover:border-brand-blue/30" },
    { name: "WhatsApp", handle: "+91 94625 74901", icon: WhatsApp, url: "https://wa.me/919462574901", color: "hover:text-emerald-500 hover:border-emerald-500/30" },
    { name: "Instagram", handle: "@tarshiteditz", icon: Instagram, url: "https://www.instagram.com/tarshiteditz/", color: "hover:text-pink-500 hover:border-pink-500/30" },
    { name: "Fiverr", handle: "Order on Fiverr", icon: Fiverr, url: "https://www.fiverr.com/pe/dD3q3b2", color: "hover:text-[#1dbf73] hover:border-[#1dbf73]/30" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      {/* Background Glows removed for cleaner look */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Layout Grid: Left Info, Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: CTA Title and Socials */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center h-full">
            <span className="text-xs font-semibold text-brand-red uppercase tracking-widest block mb-3">
              Collaboration
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white mb-6">
              Let's create something <span className="text-gradient-red-blue">amazing</span> together.
            </h2>
            <p className="text-base text-white/60 leading-relaxed font-light mb-12">
              Ready to take your content to the next level? Fill out the form or reach out directly on socials to discuss project timelines, rates, and concepts.
            </p>

            {/* Direct Social Cards */}
            <div className="flex flex-col gap-3.5 w-full">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group hover:bg-white/7 ${social.color}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon className="w-5 h-5 shrink-0" />
                      <div className="text-left">
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">
                          {social.name}
                        </span>
                        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                          {social.handle}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-wider">
                      Connect
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-7 w-full">
            <div className="relative group">
              <div className="relative p-6 sm:p-10 rounded-2xl bg-[#0A0A0C] border border-white/10 shadow-xl">

                <h3 className="text-xl font-display font-bold text-white mb-8 text-left flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-blue" />
                  Project Inquiry Form
                </h3>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 flex flex-col items-center justify-center text-center"
                    >
                      <div className="p-4 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-5 shadow-lg animate-bounce">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <h4 className="text-2xl font-display font-bold text-white">Inquiry Received!</h4>
                      <p className="text-sm text-white/60 max-w-sm mt-3 font-light leading-relaxed">
                        Thank you for reaching out, Tarshit will review your request and get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      {/* Name & Email Group */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col text-left">
                          <label htmlFor="name" className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                          />
                        </div>

                        <div className="flex flex-col text-left">
                          <label htmlFor="email" className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="johndoe@example.com"
                            className="px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Project Type Select */}
                      <div className="flex flex-col text-left">
                        <label htmlFor="projectType" className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2.5">
                          Project Type
                        </label>
                        <div className="relative">
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all appearance-none cursor-pointer"
                          >
                            <option value="Short Form Content" className="bg-[#121216]">Short Form Content</option>
                            <option value="Edits (movie, sports edits ,etc)" className="bg-[#121216]">Edits (movie, sports edits ,etc)</option>
                            <option value="Saas" className="bg-[#121216]">Saas</option>
                            <option value="Other" className="bg-[#121216]">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="flex flex-col text-left">
                        <label htmlFor="message" className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2.5">
                          Message / Brief description
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Describe your editing project scope, timeline, and expectations..."
                          className="px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-4 rounded-lg bg-white text-black font-bold text-sm uppercase tracking-wider transition-all hover:bg-white/90 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                            <span>TRANSFERENCE...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND INQUIRY</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
