"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Film, Sparkles, ChevronDown, RotateCcw, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  onOpenVideo: (url: string, title: string) => void;
}

export default function Hero({ onOpenVideo }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration) {
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newProgress = parseFloat(e.target.value);
    const duration = videoRef.current.duration;
    if (duration) {
      videoRef.current.currentTime = (newProgress / 100) * duration;
      setProgress(newProgress);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleWatchShowreel = () => {
    // Cinematic mock video URL
    onOpenVideo(
      "/Videos/spiderman_edit.mp4",
      "Tarshit Singh Rana - Spider-man Cinematic Edit"
    );
  };

  const handleScrollToPortfolio = () => {
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-brand-dark"
    >
      {/* Removed cluttering background glow graphics and tracks to eliminate visual clutter */}
      <div className="absolute inset-0 w-full h-full opacity-5 pointer-events-none -z-20 overflow-hidden">
        {/* Subtle horizontal track hints */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/5"></div>
        <div className="absolute top-2/4 left-0 w-full h-[1px] bg-white/5"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white/5"></div>

        {/* Video V2 track clips */}
        <div className="absolute top-[calc(25%-16px)] left-[10%] w-[15%] h-8 bg-brand-blue/30 rounded border border-brand-blue/50 flex items-center px-2">
          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-2"></div>
          <span className="text-[8px] text-white/50 truncate">Adjustment Layer</span>
        </div>
        <div className="absolute top-[calc(25%-16px)] left-[35%] w-[8%] h-8 bg-brand-blue/30 rounded border border-brand-blue/50 flex items-center px-2">
          <span className="text-[8px] text-white/50 truncate">Title Glow.prproj</span>
        </div>
        <div className="absolute top-[calc(25%-16px)] left-[65%] w-[12%] h-8 bg-brand-blue/30 rounded border border-brand-blue/50 flex items-center px-2">
          <span className="text-[8px] text-white/50 truncate">Light Leak Transition</span>
        </div>

        {/* Video V1 track clips */}
        <div className="absolute top-[calc(50%-16px)] left-[5%] w-[25%] h-8 bg-brand-blue/20 rounded border border-brand-blue/30 flex items-center px-2">
          <span className="text-[8px] text-white/40 truncate">Cinematic_Shot_01.mp4</span>
        </div>
        <div className="absolute top-[calc(50%-16px)] left-[32%] w-[18%] h-8 bg-brand-blue/20 rounded border border-brand-blue/30 flex items-center px-2">
          <span className="text-[8px] text-white/40 truncate">Trailer_BuildUp_Raw.mp4</span>
        </div>
        <div className="absolute top-[calc(50%-16px)] left-[52%] w-[22%] h-8 bg-brand-blue/20 rounded border border-brand-blue/30 flex items-center px-2">
          <span className="text-[8px] text-white/40 truncate">Graded_EndScene_Final.mp4</span>
        </div>
        <div className="absolute top-[calc(50%-16px)] left-[76%] w-[20%] h-8 bg-brand-blue/20 rounded border border-brand-blue/30 flex items-center px-2">
          <span className="text-[8px] text-white/40 truncate">Vlog_Broll_SlowMo.mp4</span>
        </div>

        {/* Audio A1 Track Clips with Waveforms */}
        <div className="absolute top-[calc(75%-16px)] left-[5%] w-[45%] h-8 bg-brand-red/20 rounded border border-brand-red/30 flex items-center justify-between px-2 overflow-hidden">
          <span className="text-[8px] text-white/40 truncate z-10">Cinematic_Overture_Mix.wav</span>
          <svg className="absolute inset-x-0 bottom-0 h-4 w-full text-brand-red/30 fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M 0 10 Q 5 2 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10 L 100 20 L 0 20 Z" />
          </svg>
        </div>
        <div className="absolute top-[calc(75%-16px)] left-[52%] w-[40%] h-8 bg-brand-red/20 rounded border border-brand-red/30 flex items-center justify-between px-2 overflow-hidden">
          <span className="text-[8px] text-white/40 truncate z-10">SFX_Rumble_Woosh.wav</span>
          <svg className="absolute inset-x-0 bottom-0 h-4 w-full text-brand-red/30 fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M 0 10 Q 3 0 6 10 T 12 10 T 18 10 T 24 10 T 30 10 T 36 10 T 42 10 T 48 10 T 54 10 T 60 10 T 66 10 T 72 10 T 78 10 T 84 10 T 90 10 T 96 10 T 100 10 L 100 20 L 0 20 Z" />
          </svg>
        </div>

        {/* Moving Playhead */}
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute inset-y-0 left-0 w-[2px] bg-brand-red shadow-[0_0_10px_#ff1e56] z-10"
        >
          <div className="absolute top-0 -left-1.5 w-4.5 h-3 bg-brand-red rounded-sm border-x border-brand-red/50 flex items-center justify-center">
            <div className="w-[1px] h-[6px] bg-white"></div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center relative z-10">
        {/* Kicker Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <span className="w-2 h-2 bg-brand-blue rounded-full animate-ping"></span>
          <span>CRAFTING VISUAL STORIES. EXPERT VIDEO EDITOR.</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white max-w-4xl leading-[1.05] mb-6 uppercase"
        >
          Bringing Stories to Life
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-10"
        >
          Video Editor specializing in cinematic edits, trailers, social media content, and storytelling-driven videos.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center max-w-sm sm:max-w-none"
        >
          <button
            onClick={handleScrollToPortfolio}
            className="px-8 py-4 rounded-full font-bold bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-xl cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={handleScrollToContact}
            className="px-8 py-4 rounded-full font-bold bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Prominent Video Showreel Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl relative group"
        >
          {/* Glowing frame borders */}
          <div className="absolute -inset-1 rounded-2xl bg-white opacity-5 blur-md group-hover:opacity-10 transition-opacity duration-500"></div>

          {/* Showreel Card Container */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 aspect-video shadow-2xl w-full"
          >
            <video
              ref={videoRef}
              src="/Videos/spiderman_edit.mp4"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              playsInline
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
            />

            {/* Custom Overlay Controls */}
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  togglePlay();
                }
              }}
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/40 transition-all duration-300 flex flex-col justify-between p-4 sm:p-6 cursor-pointer ${
                isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              
              {/* Top Bar */}
              <div className="flex items-center justify-between w-full">
                <span className="font-display font-bold text-sm sm:text-base text-white/95 drop-shadow-md flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-brand-blue" />
                  Tarshit Editz Showreel
                </span>
                <span className="px-2.5 py-1 text-[10px] font-semibold bg-brand-red text-white uppercase tracking-wider rounded">
                  Showcase
                </span>
              </div>

              {/* Play Center Indicator if paused */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!isPlaying && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="p-4 sm:p-5 rounded-full bg-brand-red hover:bg-brand-red/90 text-white shadow-lg shadow-white/10 hover:scale-110 transition-all duration-200 cursor-pointer pointer-events-auto"
                    aria-label="Play video"
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                  </button>
                )}
              </div>

              {/* Bottom Controls */}
              <div className="flex flex-col gap-3 w-full mt-auto pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                {/* Progress Bar */}
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-blue hover:accent-brand-red transition-colors"
                    style={{
                      background: `linear-gradient(to right, #00f0ff 0%, #00f0ff ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="text-white hover:text-brand-blue transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      {isPlaying ? (
                        <>
                          <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
                          Pause
                        </>
                      ) : (
                        "Play"
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestart();
                      }}
                      className="text-white/80 hover:text-white transition-colors cursor-pointer"
                      title="Restart"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="text-white hover:text-brand-blue transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 text-white/30 animate-bounce duration-1000">
          <span className="text-xs uppercase tracking-widest font-semibold">Explore Portfolio</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
