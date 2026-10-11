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
      {/* Background glow removed for cleaner look */}

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

            {/* Unified Stat Grid */}
            <div className="w-full relative group mb-8">
              <div className="absolute -inset-1.5 rounded-2xl bg-white opacity-5 blur-md group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative p-8 rounded-2xl bg-[#0A0A0C] border border-white/10 flex flex-col gap-8 shadow-xl">
                
                {/* Header Profile / CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20">
                      <Image
                        src="/images/logo.png"
                        alt="Tarshit Editz Logo"
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-display font-bold text-white">Tarshit Editz</h3>
                      <p className="text-xs text-white/50">Official YouTube Channel</p>
                    </div>
                  </div>
                  <a
                    href="https://www.youtube.com/@tarshiteditz/shorts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-white text-black hover:bg-white/90 font-bold rounded-full text-xs tracking-wider uppercase transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10 text-center">
                  <div className="pt-4 sm:pt-0 flex flex-col items-center">
                    <h4 className="text-3xl font-display font-black text-white">{subCount.toLocaleString()}+</h4>
                    <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">Subscribers</p>
                  </div>
                  <div className="pt-4 sm:pt-0 flex flex-col items-center">
                    <h4 className="text-3xl font-display font-black text-white">Millions</h4>
                    <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">Total Views</p>
                  </div>
                  <div className="pt-4 sm:pt-0 flex flex-col items-center">
                    <h4 className="text-3xl font-display font-black text-white">100+</h4>
                    <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">Videos</p>
                  </div>
                </div>

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
