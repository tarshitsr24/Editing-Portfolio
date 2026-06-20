"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sliders, Sparkles, Wand2, Eye, ShieldAlert, Film, Play } from "lucide-react";
interface BeforeAfterSliderProps {
  onOpenVideo: (url: string, title: string) => void;
}

export default function BeforeAfterSlider({ onOpenVideo }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefBefore = useRef<HTMLVideoElement>(null);
  const videoRefAfter = useRef<HTMLVideoElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update video dimensions dynamically for clip calculations
  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Synchronize playback of the two comparison videos
  useEffect(() => {
    const vidBefore = videoRefBefore.current;
    const vidAfter = videoRefAfter.current;
    if (!vidBefore || !vidAfter) return;

    let active = true;

    const syncTime = () => {
      if (!active) return;
      if (vidBefore && vidAfter) {
        // Sync time if drift is > 0.08 seconds
        if (Math.abs(vidBefore.currentTime - vidAfter.currentTime) > 0.08) {
          vidBefore.currentTime = vidAfter.currentTime;
        }
        // Match playback rate
        if (vidBefore.playbackRate !== vidAfter.playbackRate) {
          vidBefore.playbackRate = vidAfter.playbackRate;
        }
      }
      requestAnimationFrame(syncTime);
    };

    const handlePlay = () => {
      vidBefore.play().catch(() => {});
    };

    const handlePause = () => {
      vidBefore.pause();
    };

    const handleSeeked = () => {
      vidBefore.currentTime = vidAfter.currentTime;
    };

    vidAfter.addEventListener("play", handlePlay);
    vidAfter.addEventListener("pause", handlePause);
    vidAfter.addEventListener("seeked", handleSeeked);

    // Initial play sync
    if (!vidAfter.paused) {
      vidBefore.play().catch(() => {});
    }

    requestAnimationFrame(syncTime);

    return () => {
      active = false;
      vidAfter.removeEventListener("play", handlePlay);
      vidAfter.removeEventListener("pause", handlePause);
      vidAfter.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const techBreakdown = [
    {
      title: "Log-to-Rec.709 Color Correction",
      description: "Restoring highlight detail and shadow levels from raw camera log profiles to standard dynamic range.",
      icon: Sliders,
    },
    {
      title: "Cinematic Stylized Color Grading",
      description: "Applying custom teal-and-orange color palettes, film grain emulation, and vignettes to establish mood.",
      icon: Wand2,
    },
    {
      title: "VFX & Compositing Overlays",
      description: "Masking out elements, embedding lens flares, light leaks, dust particles, and motion blur tracking.",
      icon: Sparkles,
    },
  ];

  return (
    <section id="featured" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden border-b border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[45vw] h-[45vw] glow-red rounded-full pointer-events-none -z-10 opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-left mb-16">
          <span className="text-xs font-semibold text-brand-red uppercase tracking-widest block mb-3">
            Case Study
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            Featured Projects & Breakdown
          </h2>
          <p className="text-white/60 mt-4 text-base max-w-xl font-light">
            An in-depth look at the color grading, editing styles, and visual techniques that go into creating cinematic edits.
          </p>
        </div>

        {/* Layout Grid: Left Before/After, Right Editing Techniques */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Before/After Slider Container */}
          <div className="lg:col-span-7 flex flex-col items-start w-full">
            <h3 className="text-lg font-display font-bold tracking-wider text-white uppercase flex items-center gap-2 mb-6 text-left">
              <span className="w-1.5 h-6 bg-brand-blue rounded-full"></span>
              Interactive Color Grading Slider
            </h3>

            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-video rounded-xl overflow-hidden glass-panel border border-white/10 select-none shadow-2xl cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              {/* After: Fully Graded Video (Background) */}
              <div className="absolute inset-0 w-full h-full">
                <video
                  ref={videoRefAfter}
                  src="/Videos/spiderman_edit.mp4"
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* Before: Flat Raw Log Video (Overlay clipping width) */}
              <div 
                className="absolute inset-0 h-full overflow-hidden transition-all duration-75 pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <video
                  ref={videoRefBefore}
                  src="/Videos/spiderman_edit.mp4"
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 object-cover pointer-events-none"
                  style={{
                    width: dimensions.width ? `${dimensions.width}px` : "100%",
                    height: dimensions.height ? `${dimensions.height}px` : "100%",
                    maxWidth: "none",
                    filter: "saturate(0.3) contrast(0.7) brightness(1.15) sepia(0.15)"
                  }}
                />
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-black/75 border border-white/10 text-[10px] font-bold text-white/70 uppercase tracking-widest">
                RAW Log Footage
              </div>
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded bg-brand-blue/90 border border-brand-blue/20 text-[10px] font-bold text-brand-dark uppercase tracking-widest shadow-lg">
                Color Graded
              </div>

              {/* Slider Drag Bar */}
              <div 
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-30 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-brand-dark flex items-center justify-center border border-white shadow-xl hover:scale-105 transition-transform">
                  <Sliders className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-white/40 mt-3 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-brand-blue" />
              Drag the center bar left and right to compare raw profile vs graded output.
            </p>
          </div>

          {/* Right Column: Techniques Checklist */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center h-full self-center">
            <h3 className="text-lg font-display font-bold tracking-wider text-white uppercase flex items-center gap-2 mb-6">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              Post-Production Breakdown
            </h3>

            <div className="flex flex-col gap-5 w-full">
              {techBreakdown.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="p-3 rounded-lg bg-white/5 text-brand-red shrink-0 border border-white/5 h-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/50 mt-1.5 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Large Cinematic YouTube Embed Showcase Card */}
        <div className="w-full relative group">
          <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-red opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300"></div>
          
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
            
            {/* Play/Embed Visual Container */}
            <div className="relative w-full md:w-[320px] aspect-video rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-brand-blue/30 transition-all duration-300 shrink-0">
              <iframe
                src="https://www.youtube.com/embed/KjdMaBXeBzg?autoplay=0&mute=1&modestbranding=1&rel=0"
                title="Cinematic Short Film Editing Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>

            {/* Narrative text info */}
            <div className="flex-1 text-left">
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest px-2.5 py-1 rounded bg-brand-red/10 border border-brand-red/20 w-fit block mb-4">
                Watch Breakdown
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white leading-tight">
                Spider-Man Edit | Metro Boomin, Don Toliver - Around Me (Sincerely Lue Remix)
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light mt-3">
                In this video, I take you behind the scenes inside my Adobe Premiere Pro timeline. Learn how I structure my layers, align sound design cue markers, and pace scenes to maximize viewer retention and emotional resonance.
              </p>
              
              <button
                onClick={() => onOpenVideo("https://www.youtube.com/watch?v=KjdMaBXeBzg", "Spider-Man Edit | Around Me (Sincerely Lue Remix)")}
                className="mt-6 px-6 py-2.5 rounded-lg border border-white/10 hover:border-brand-blue text-white hover:bg-brand-blue/5 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <span>Watch Embed on YouTube</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
