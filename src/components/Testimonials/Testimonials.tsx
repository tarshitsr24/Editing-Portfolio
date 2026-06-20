"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: "r1",
    name: "@callumx629",
    role: "Fiverr Client • United Kingdom",
    quote: "exceptional, this edit is amazing I'd defo pay for another edit again",
    rating: 5,
    initials: "C",
    duration: "2 days",
    color: "from-yellow-700 to-amber-900", // Fiverr brown circle avatar color
  },
  {
    id: "r2",
    name: "@voungish",
    role: "Repeat Fiverr Client • United States",
    quote: "such a good and talented and nice editor",
    rating: 5,
    initials: "V",
    duration: "2 days",
    color: "from-blue-700 to-indigo-900", // Fiverr blue circle avatar color
  },
  {
    id: "r3",
    name: "@dababy55",
    role: "Fiverr Client • United States",
    quote: "Very good job did exactly what I asked and delivered it extremely fast.",
    rating: 5,
    initials: "D",
    duration: "1 day",
    color: "from-pink-700 to-rose-900", // Fiverr pink/maroon circle avatar color
  },
  {
    id: "r4",
    name: "@voungish",
    role: "Repeat Fiverr Client • United States",
    quote: "great work honestly",
    rating: 5,
    initials: "V",
    duration: "1 day",
    color: "from-blue-700 to-indigo-900",
  },
  {
    id: "r5",
    name: "@voungish",
    role: "Repeat Fiverr Client • United States",
    quote: "amazing work looking forward to working again",
    rating: 5,
    initials: "V",
    duration: "1 day",
    color: "from-blue-700 to-indigo-900",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-brand-dark overflow-hidden border-b border-white/5">
      {/* Background glow graphics */}
      <div className="absolute top-1/2 left-10 w-[35vw] h-[35vw] glow-red rounded-full pointer-events-none -z-10 opacity-15"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <span className="text-xs font-semibold text-brand-red uppercase tracking-widest block mb-3">
          Feedback
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-16">
          Client Reviews
        </h2>

        {/* Carousel Container */}
        <div className="relative min-h-[320px] flex flex-col items-center justify-center">
          
          {/* Large Quote Indicator */}
          <Quote className="absolute top-0 left-4 w-20 h-20 text-white/5 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={REVIEWS[activeIndex].id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-2xl glass-panel border border-white/10 shadow-2xl relative w-full text-center flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(REVIEWS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl font-light text-white/90 leading-relaxed italic mb-8 max-w-2xl">
                "{REVIEWS[activeIndex].quote}"
              </blockquote>

              {/* Fiverr Order Details Badge */}
              <div className="flex gap-4 text-[9px] uppercase tracking-wider font-bold text-white/40 mb-8 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <span>Verified Fiverr Order</span>
                <span className="text-white/20">•</span>
                <span className="text-brand-blue">{REVIEWS[activeIndex].duration} Delivery</span>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-4 text-left">
                {/* Avatar Initials */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${REVIEWS[activeIndex].color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {REVIEWS[activeIndex].initials}
                </div>
                <div>
                  <cite className="not-italic font-display font-bold text-white text-base block">
                    {REVIEWS[activeIndex].name}
                  </cite>
                  <span className="text-xs text-brand-blue font-semibold uppercase tracking-wider block mt-0.5">
                    {REVIEWS[activeIndex].role}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-6 bg-brand-blue" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
