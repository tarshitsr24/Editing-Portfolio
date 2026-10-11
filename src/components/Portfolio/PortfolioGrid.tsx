"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film } from "lucide-react";

interface PortfolioGridProps {
  onOpenVideo: (url: string, title: string) => void;
}

const CATEGORIES = ["All", "Videos", "Saas"];

const PROJECTS = [
  {
    id: "p1",
    title: "Spider-man Cinematic Edit - Trailer",
    category: "Videos",
    description: "High-octane trailer using dynamic speed ramping, custom audio transitions, and intense color grading.",
    duration: "1:12",
    thumbnail: "/images/portfolio_1.png",
    videoUrl: "/Videos/spiderman_edit.mp4",
  },
  {
    id: "p2",
    title: "Spider-Man Edit | Metro Boomin, Don Toliver - Around Me (Sincerely Lue Remix)",
    category: "Videos",
    description: "Dynamic Spider-Man edit set to Metro Boomin and Don Toliver's Around Me (Sincerely Lue Remix), featuring custom audio transitions and color grading.",
    duration: "8:42",
    thumbnail: "/images/portfolio_3.png",
    videoUrl: "https://www.youtube.com/watch?v=KjdMaBXeBzg",
  },
  {
    id: "p3",
    title: "Mercury SaaS Product Video",
    category: "Saas",
    description: "Product promo showcase featuring 3D tracker overlays, dashboard UI slides, and sleek transitions.",
    duration: "0:50",
    thumbnail: "/images/portfolio_4.png",
    videoUrl: "/Videos/Mercury_Saas.mp4",
  },
  {
    id: "p4",
    title: "\"Breaks Peter Parker's heart \" - Spider-Man Edit | New Person Same Old Mistakes",
    category: "Videos",
    description: "A high-retention vertical Spider-Man short edit set to Tame Impala's New Person Same Old Mistakes, focusing on Peter Parker's character arc.",
    duration: "0:50",
    thumbnail: "/images/portfolio_6.png",
    videoUrl: "https://www.youtube.com/shorts/q12IcUjKobw",
  },
];

export default function PortfolioGrid({ onOpenVideo }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      {/* Background radial glows removed to reduce clutter */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
              My Work
            </h2>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5 justify-start">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-brand-blue text-brand-dark shadow-lg shadow-white/10"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/5 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isYT = project.videoUrl.includes("youtube.com") || project.videoUrl.includes("youtu.be");
              const isShort = project.videoUrl.includes("shorts");
              let ytEmbedUrl = "";
              if (isYT) {
                let videoId = "";
                if (project.videoUrl.includes("youtube.com/watch")) {
                  const parts = project.videoUrl.split("v=");
                  videoId = parts[1]?.split("&")[0] || "";
                } else if (project.videoUrl.includes("youtube.com/shorts/")) {
                  videoId = project.videoUrl.split("youtube.com/shorts/")[1]?.split("?")[0] || "";
                } else if (project.videoUrl.includes("youtu.be/")) {
                  videoId = project.videoUrl.split("youtu.be/")[1]?.split("?")[0] || "";
                }
                ytEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&modestbranding=1&rel=0`;
              }

              const aspectClass = isShort ? "aspect-[9/16] sm:aspect-video" : "aspect-video";

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative group rounded-xl overflow-hidden glass-panel border border-white/10 flex flex-col justify-between shadow-xl"
                >
                  {/* Video / Embed Layer */}
                  <div className={`relative ${aspectClass} overflow-hidden bg-black flex items-center justify-center`}>
                    {isYT ? (
                      <iframe
                        src={ytEmbedUrl}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      ></iframe>
                    ) : (
                      <video
                        src={project.videoUrl}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Category tag inside image */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold bg-brand-blue/90 text-brand-dark rounded uppercase tracking-wider font-display z-10">
                      {project.category}
                    </span>
                  </div>

                  {/* Info Area */}
                  <div className="p-6 text-left flex flex-col justify-between flex-1">
                    <div>
                      <h3 
                        onClick={() => onOpenVideo(project.videoUrl, project.title)}
                        className="text-lg font-display font-bold text-white group-hover:text-brand-blue transition-colors cursor-pointer line-clamp-1"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/50 mt-2 font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenVideo(project.videoUrl, project.title)}
                      className="text-xs font-semibold text-brand-red hover:text-white transition-colors duration-200 mt-5 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <span>WATCH FULLSCREEN</span>
                      <Film className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
