"use client";

import { motion } from "framer-motion";
import { Users, Eye, Video, ArrowUpRight } from "lucide-react";
import { Youtube } from "@/components/UI/Icons";
import Image from "next/image";
import { useEffect, useState } from "react";

interface YouTubeStatsProps {
  onOpenVideo: (url: string, title: string) => void;
}

export default function YouTubeStats({ onOpenVideo }: YouTubeStatsProps) {
  const [subCount, setSubCount] = useState(0);

  // Animated sub counter on mount
  useEffect(() => {
    let start = 0;
    const end = 11000;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / 100));
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setSubCount(end);
        clearInterval(timer);
      } else {
        setSubCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handlePlayVideo = (url: string, title: string) => {
    onOpenVideo(url, title);
  };

  const channelVideos = [
    {
      id: "yt1",
      title: "Spider-Man Edit | Metro Boomin, Don Toliver - Around Me (Sincerely Lue Remix)",
      duration: "8:42",
      url: "https://www.youtube.com/watch?v=KjdMaBXeBzg",
    },
    {
      id: "yt2",
      title: "\"Breaks Peter Parker's heart \" - Spider-Man Edit | New Person Same Old Mistakes",
      duration: "0:50",
      url: "https://www.youtube.com/shorts/q12IcUjKobw",
    },
  ];

  return (
    <section id="youtube" className="relative py-24 md:py-32 bg-black overflow-hidden border-t border-b border-white/5">
      {/* Background glow graphics */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] glow-red rounded-full pointer-events-none -z-10 opacity-30 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Layout Grid: Left for Channel Card & Description, Right for YouTube Videos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: YouTube Achievements & Stats */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold text-brand-red uppercase tracking-widest block mb-3">
                YouTube Community
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-6">
                YouTube Achievements
              </h2>
              
              <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
                My YouTube channel has grown into a community of over 11,000 subscribers through consistent, high-quality editing and engaging content. My work has reached millions of viewers across various platforms.
              </p>
            </motion.div>

            {/* Giant Subscriber Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full relative group mb-8"
            >
              {/* Glow border */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-red-600 to-brand-red opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <div className="relative p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 bg-gradient-to-br from-red-950/20 to-black/80 flex flex-col sm:flex-row items-center sm:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 shadow-lg shrink-0">
                    <Image
                      src="/images/logo.png"
                      alt="Tarshit Editz Logo"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                      {subCount.toLocaleString()}+ SUBSCRIBERS
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-brand-red uppercase tracking-wider mt-0.5">
                      & GROWING EVERY DAY
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/@tarshiteditz/shorts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/20 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              
              {/* Subs Stats */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-left">
                <Users className="w-5 h-5 text-brand-blue mb-3" />
                <h4 className="text-2xl font-display font-black text-white">11K+</h4>
                <p className="text-xs text-white/50 mt-1 uppercase font-semibold tracking-wider">Subscribers</p>
              </div>

              {/* Views Stats */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-left">
                <Eye className="w-5 h-5 text-brand-red mb-3" />
                <h4 className="text-2xl font-display font-black text-white">Millions</h4>
                <p className="text-xs text-white/50 mt-1 uppercase font-semibold tracking-wider">Total Views</p>
              </div>

              {/* Videos Stats */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-left col-span-2 sm:col-span-1">
                <Video className="w-5 h-5 text-emerald-400 mb-3" />
                <h4 className="text-2xl font-display font-black text-white">Hundreds</h4>
                <p className="text-xs text-white/50 mt-1 uppercase font-semibold tracking-wider">Videos Published</p>
              </div>

            </div>
          </div>

          {/* Right Column: YouTube Community Videos (2 thumbnails) */}
          <div className="lg:col-span-6 w-full flex flex-col gap-6">
            <h3 className="text-lg font-display font-bold tracking-wider text-white uppercase flex items-center gap-2 text-left mb-2">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              Channel Showcase
            </h3>

            {channelVideos.map((video, index) => {
              const isYT = video.url.includes("youtube.com") || video.url.includes("youtu.be");
              let embedUrl = "";
              if (isYT) {
                let videoId = "";
                if (video.url.includes("youtube.com/watch")) {
                  const parts = video.url.split("v=");
                  videoId = parts[1]?.split("&")[0] || "";
                } else if (video.url.includes("youtube.com/shorts/")) {
                  videoId = video.url.split("youtube.com/shorts/")[1]?.split("?")[0] || "";
                }
                embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&modestbranding=1&rel=0`;
              }

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative group rounded-xl overflow-hidden glass-panel border border-white/10 flex flex-col sm:flex-row hover:border-brand-red/30 transition-all duration-300 shadow-xl"
                >
                  {/* Video Player Embed */}
                  <div className="relative w-full sm:w-[240px] aspect-video shrink-0 overflow-hidden">
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    ></iframe>
                  </div>

                  {/* Video Description */}
                  <div className="p-5 flex flex-col justify-between items-start text-left flex-1">
                    <div>
                      <h4 
                        onClick={() => handlePlayVideo(video.url, video.title)}
                        className="font-display font-bold text-white text-base hover:text-brand-red transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {video.title}
                      </h4>
                      <p className="text-xs text-white/50 mt-2 font-medium">
                        YouTube Channel
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handlePlayVideo(video.url, video.title)}
                      className="text-xs font-semibold text-brand-red hover:text-white transition-colors duration-200 mt-4 flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                    >
                      <span>Watch Fullscreen</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
