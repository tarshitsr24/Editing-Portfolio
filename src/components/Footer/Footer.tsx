"use client";

import { Video, Mail, ArrowUp } from "lucide-react";
import { Youtube, WhatsApp } from "@/components/UI/Icons";
import Image from "next/image";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070709] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a
            href="#home"
            className="flex items-center gap-2.5 font-display font-black text-xl tracking-tighter text-white hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-md shrink-0">
              <Image
                src="/images/logo.png"
                alt="Tarshit Editz Logo"
                fill
                className="object-cover"
                sizes="28px"
              />
            </div>
            <span>
              TSR<span className="text-brand-red">.</span>
            </span>
          </a>
          <p className="text-xs text-white/40 mt-3 font-medium">
            Tarshit Singh Rana Portfolio © {currentYear}. All Rights Reserved.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-white/50 uppercase tracking-widest">
          <a href="#about" className="hover:text-brand-blue transition-colors">About</a>
          <a href="#portfolio" className="hover:text-brand-blue transition-colors">My Work</a>
          <a href="#youtube" className="hover:text-brand-blue transition-colors">YouTube</a>
          <a href="#featured" className="hover:text-brand-blue transition-colors">Featured</a>
          <a href="#services" className="hover:text-brand-blue transition-colors">Services</a>
          <a href="#contact" className="hover:text-brand-blue transition-colors">Contact</a>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@tarshiteditz/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-500 border border-white/5 transition-colors"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://wa.me/919462574901"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-emerald-500/10 text-white/60 hover:text-emerald-500 border border-white/5 transition-colors"
              aria-label="WhatsApp Chat"
            >
              <WhatsApp className="w-4 h-4" />
            </a>
            <a
              href="mailto:tarshitrana@gmail.com"
              className="p-2.5 rounded-full bg-white/5 hover:bg-brand-blue/10 text-white/60 hover:text-brand-blue border border-white/5 transition-colors"
              aria-label="Email Direct"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={handleScrollTop}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors cursor-pointer"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
