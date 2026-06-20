"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Video, Send } from "lucide-react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "My Work", href: "#portfolio" },
  { label: "YouTube", href: "#youtube" },
  { label: "Featured", href: "#featured" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = NAV_ITEMS.map((item) => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            id: item.href.substring(1),
            // Check if section is mostly in the viewport
            visible: rect.top <= 200 && rect.bottom >= 200,
          };
        }
        return { id: "", visible: false };
      });

      const current = sections.find((s) => s.visible);
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-brand-dark/85 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 font-display font-black text-2xl tracking-tighter text-white hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-lg shrink-0">
              <Image
                src="/images/logo.png"
                alt="Tarshit Editz Logo"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span>
              TSR<span className="text-brand-red">.</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Hire Me Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="group relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden flex items-center gap-2 border border-brand-blue/50 text-white bg-transparent hover:border-brand-blue shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-102 cursor-pointer"
            >
              <span>Let's Edit</span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex lg:hidden p-2.5 text-white/80 hover:text-white bg-white/5 border border-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer (placed inside header to allow absolute top-full positioning) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full z-30 p-6 bg-brand-dark/95 backdrop-blur-xl border-b border-white/5 lg:hidden flex flex-col gap-6"
            >
              <nav className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`text-lg font-medium py-1.5 transition-colors border-l-2 pl-3 ${
                        isActive
                          ? "text-brand-blue border-brand-blue"
                          : "text-white/60 border-transparent hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-blue font-bold text-center text-white hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-brand-red/10"
              >
                Get In Touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
