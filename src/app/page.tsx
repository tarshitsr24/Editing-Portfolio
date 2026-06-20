"use client";

import { useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import YouTubeStats from "@/components/Achievements/YouTubeStats";
import PortfolioGrid from "@/components/Portfolio/PortfolioGrid";
import BeforeAfterSlider from "@/components/Featured/BeforeAfterSlider";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import SkillsSection from "@/components/Skills/SkillsSection";
import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Footer/Footer";
import VideoModal from "@/components/UI/VideoModal";

export default function Home() {
  // Global video player modal state
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: "",
    title: "",
  });

  const handleOpenVideo = (url: string, title: string) => {
    setVideoModal({
      isOpen: true,
      url,
      title,
    });
  };

  const handleCloseVideo = () => {
    setVideoModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <>
      {/* Floating Navigation Header */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="flex-1 w-full bg-brand-dark">
        {/* Cinematic Landing Hero */}
        <Hero onOpenVideo={handleOpenVideo} />

        {/* Biography & Key skills */}
        <About />

        {/* Youtube stats counter & videos showcase */}
        <YouTubeStats onOpenVideo={handleOpenVideo} />

        {/* Filterable Portfolio Grid */}
        <PortfolioGrid onOpenVideo={handleOpenVideo} />

        {/* Color correction interactive slider comparison */}
        <BeforeAfterSlider onOpenVideo={handleOpenVideo} />

        {/* Professional service packages listing */}
        <Services />

        {/* Software details and technical mastery progress indicators */}
        <SkillsSection />

        {/* Client reviews slider */}
        <Testimonials />

        {/* Lead capture contact form */}
        <ContactForm />
      </main>

      {/* Footer details & quick navigational anchors */}
      <Footer />

      {/* Global Video Modal Viewer */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideo}
        videoUrl={videoModal.url}
        videoTitle={videoModal.title}
      />
    </>
  );
}
