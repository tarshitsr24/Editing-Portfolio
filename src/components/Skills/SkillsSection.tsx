"use client";

import { motion } from "framer-motion";
import { Sliders, CheckCircle2 } from "lucide-react";

const SKILL_ITEMS = [
  { name: "Premiere Pro", color: "from-blue-500/10 to-indigo-500/5 border-blue-500/20 text-blue-400 hover:border-blue-500/40" },
  { name: "After Effects", color: "from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400 hover:border-purple-500/40" },
  { name: "CapCut", color: "from-cyan-500/10 to-teal-500/5 border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40" },
  { name: "Sound Design", color: "from-red-500/10 to-orange-500/5 border-red-500/20 text-brand-red hover:border-brand-red/40" },
  { name: "Storytelling", color: "from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40" },
  { name: "Motion Graphics", color: "from-pink-500/10 to-rose-500/5 border-pink-500/20 text-pink-400 hover:border-pink-500/40" },
];

const METRICS = [
  "High Retention Editing structure",
  "Advanced Lumetri Color grading workflows",
  "Professional Multi-track Audio sync & mastering",
  "Dynamic custom typography overlay setups",
];

export default function SkillsSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative list of metrics/checks */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-widest block mb-3">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-6">
              Expertise & Precision
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
              Visual editing is more than just making cuts; it is about pacing, framing, sound coordination, and building emotional narrative arcs that captivate your audience from start to finish.
            </p>

            <ul className="flex flex-col gap-4">
              {METRICS.map((metric) => (
                <li key={metric} className="flex items-center gap-3 text-white/85 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Mastery Cards */}
          <div className="lg:col-span-7 w-full flex flex-col gap-6 text-left">
            <h3 className="text-lg font-display font-bold tracking-wider text-white uppercase flex items-center gap-2 mb-2">
              <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
              Mastery
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {SKILL_ITEMS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`p-5 rounded-xl bg-gradient-to-br ${skill.color} border text-center font-display font-black text-sm tracking-wide transition-all duration-350 cursor-default shadow-md hover:scale-102`}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
