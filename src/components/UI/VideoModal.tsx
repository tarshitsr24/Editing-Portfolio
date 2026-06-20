"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, videoTitle }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (videoRef.current) {
      if (isOpen) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay might fail due to browser policies, fallback to muted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(err => console.log("Play failed: ", err));
          }
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isOpen, videoUrl]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Play failed: ", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newPercent = parseFloat(e.target.value);
      const duration = videoRef.current.duration || 0;
      videoRef.current.currentTime = (newPercent / 100) * duration;
      setProgress(newPercent);
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log("Play failed: ", err));
      setIsPlaying(true);
    }
  };
  // Determine if it is a direct MP4 or a YouTube URL
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  // Extract video ID for embed
  let youtubeEmbedUrl = "";
  if (isYouTube) {
    let videoId = "";
    if (videoUrl.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(new URL(videoUrl).search);
      videoId = urlParams.get("v") || "";
    } else if (videoUrl.includes("youtube.com/shorts/")) {
      videoId = videoUrl.split("youtube.com/shorts/")[1]?.split("?")[0] || "";
    } else if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    }
    youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&modestbranding=1&rel=0`;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 z-50 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 duration-200 cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isYouTube ? (
              <iframe
                src={youtubeEmbedUrl}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            ) : (
              <div className="relative w-full h-full group">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                  playsInline
                  autoPlay
                />
                
                {/* Custom Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-display font-medium text-lg text-white/95 drop-shadow-md">
                      {videoTitle}
                    </span>
                    <span className="px-2.5 py-1 text-xs font-semibold bg-brand-red text-white uppercase tracking-wider rounded">
                      Editing Preview
                    </span>
                  </div>

                  {/* Play Center Indicator if paused */}
                  {!isPlaying && (
                    <button 
                      onClick={togglePlay}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/30 hover:scale-110 transition-all duration-200 cursor-pointer"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5" />
                    </button>
                  )}

                  {/* Bottom Controls */}
                  <div className="flex flex-col gap-4">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 w-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-red"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-brand-blue transition-colors cursor-pointer"
                        >
                          {isPlaying ? (
                            <span className="text-sm font-semibold flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-brand-red rounded-full animate-pulse"></span> PAUSE</span>
                          ) : (
                            <span className="text-sm font-semibold flex items-center gap-1.5">PLAY</span>
                          )}
                        </button>
                        <button
                          onClick={handleRestart}
                          className="text-white/80 hover:text-white transition-colors cursor-pointer"
                          title="Restart"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-brand-blue transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
