"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Film, Sparkles, Layers, Sliders, Music } from "lucide-react";

const SKILLS = [
  { name: "Adobe Premiere Pro", desc: "Expert cut pacing, transitions & multicam workflows", icon: Film, color: "bg-black border border-white/20 text-white" },
  { name: "After Effects", desc: "Advanced compositing, visual effects & VFX tracking", icon: Cpu, color: "bg-black border border-white/20 text-white" },
  { name: "Motion Graphics", desc: "Premium cinematic title designs & dynamic lower thirds", icon: Sparkles, color: "bg-black border border-white/20 text-white" },
  { name: "Sound Design", desc: "Immersive audio atmospheres, mix mastering & foley", icon: Music, color: "bg-black border border-white/20 text-white" },
  { name: "Color Grading", desc: "Cinematic color matching, correction & visual mood LUTs", icon: Sliders, color: "bg-black border border-white/20 text-white" },
  { name: "Social Media Editing", desc: "High-retention captioning, hooks & fast pacing layouts", icon: Layers, color: "bg-black border border-white/20 text-white" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
      {/* Glow graphics removed for cleaner aesthetic */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[400px] aspect-4/5 group">
              {/* Outer Glowing Border */}
              <div className="absolute -inset-2 rounded-2xl bg-white opacity-5 blur-md group-hover:opacity-10 transition-opacity duration-500"></div>

              {/* Portrait Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center">
                <Image
                  src="/images/portrait.png"
                  alt="Tarshit Singh Rana Portrait"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700 filter brightness-95 contrast-105"
                  sizes="(max-w-768px) 100vw, 400px"
                />
                
                {/* Visual Accent Elements */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 z-20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-display font-bold text-white">Tarshit Singh Rana</span>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  </div>
                  <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">
                    Video Editor
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Biography & Skills Grid */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Section Header */}
              <span className="text-xs font-semibold text-white/50 uppercase tracking-widest block mb-3">
                Biographical
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-6">
                About Tarshit Singh Rana
              </h2>
              
              {/* Biography Text */}
              <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
                Hi, I'm Tarshit Singh Rana, a passionate video editor focused on creating engaging, cinematic, and high-retention content. I specialize in trailer edits, movie edits, social media content, and storytelling that captures attention from the first second.
              </p>
            </motion.div>

            {/* Skills Title */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg font-display font-bold tracking-wider text-white uppercase mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-white rounded-full"></span>
              Core Creative Arsenal
            </motion.h3>

            {/* Core Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {SKILLS.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-transparent border border-white/10 hover:border-white/30 transition-all duration-300 group hover:bg-white/5"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-lg ${skill.color} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-white/50 mt-1 font-light leading-snug">
                          {skill.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
