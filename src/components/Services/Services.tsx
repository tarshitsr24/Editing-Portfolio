"use client";

import { motion } from "framer-motion";
import { Film, Compass, Zap, Sliders, Music, Layers, ArrowRight } from "lucide-react";
import { Youtube } from "@/components/UI/Icons";

const SERVICES = [
  {
    title: "YouTube Video Editing",
    desc: "Complete post-production optimized for viewer retention. Includes intro hooks, pattern interrupts, and zoom transitions.",
    icon: Youtube,
    color: "text-red-500 bg-red-500/10 border-red-500/20",
    tag: "High Retention",
  },
  {
    title: "Trailer Editing",
    desc: "Cinematic, fast-paced game trailers, book previews, or film teasers designed to build hype and dramatic tension.",
    icon: Film,
    color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
    tag: "Hype Builder",
  },
  {
    title: "Social Media Reels & Shorts",
    desc: "Vibrant vertical videos (TikTok, Shorts, Reels) with text highlights, captions, fast pacing, sound effects, and sticker overlays.",
    icon: Layers,
    color: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    tag: "9:16 Aspect",
  },
  {
    title: "Motion Graphics",
    desc: "Custom lower-thirds, animated icons, callout graphics, and title sweeps tailored to match your brand style guidelines.",
    icon: Zap,
    color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    tag: "2D/3D Tracking",
  },
  {
    title: "Color Correction & Grading",
    desc: "Matching multiple cameras, balancing exposures, and establishing a professional stylized cinema grade.",
    icon: Sliders,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    tag: "LUTs & Grading",
  },
  {
    title: "Sound Design & Mix",
    desc: "Foley sound additions, background noise reduction, music pacing cuts, and full volume level equalization.",
    icon: Music,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    tag: "Immersive Audio",
  },
  {
    title: "Custom Editing Projects",
    desc: "Have a unique creative direction? I offer custom visual crafting for documentaries, events, and corporate announcements.",
    icon: Compass,
    color: "text-brand-red bg-brand-red/10 border-brand-red/20",
    tag: "Tailored Cuts",
  },
];

export default function Services() {
  const handleServiceSelect = (serviceTitle: string) => {
    // Dispatch custom event to sync with React state in ContactForm
    const event = new CustomEvent("select-service", { detail: serviceTitle });
    window.dispatchEvent(event);
    
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-black overflow-hidden border-b border-white/5">
      {/* Background glow removed for cleaner aesthetic */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-widest block mb-3">
            Offerings
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            Professional Editing Services
          </h2>
          <p className="text-white/60 mt-4 text-base max-w-xl font-light">
            Providing high-quality post-production services tailored to boost viewer engagement and fit your creative vision.
          </p>
        </div>

        {/* Services Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => handleServiceSelect(service.title)}
                className="p-6 sm:p-8 rounded-xl glass-panel border border-white/10 hover:border-brand-blue/30 transition-all duration-300 group flex flex-col justify-between hover:bg-white/5 cursor-pointer glass-panel-hover"
              >
                <div>
                  {/* Icon & Tag */}
                  <div className="flex justify-between items-center mb-6">
                    <div className={`p-3 rounded-lg border ${service.color} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-blue transition-colors mb-3 text-left">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed text-left">
                    {service.desc}
                  </p>
                </div>


              </motion.div>
            );
          })}
        </div>

        {/* Unified Bottom CTA */}
        <div className="mt-16 flex justify-center w-full">
          <button
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full font-bold bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-xl cursor-pointer flex items-center gap-2"
          >
            <span>Book a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
