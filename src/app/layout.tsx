import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syncopate", // Keep the CSS variable name to minimize refactoring needs or change it, but it's easier to keep
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-inter", // Keep the CSS variable name 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tarshit Singh Rana | Professional Video Editor Portfolio",
  description: "Cinematic, high-retention video editor specializing in trailer edits, movie edits, motion graphics, and social media reels. 11K+ YouTube presence.",
  keywords: [
    "Tarshit Singh Rana",
    "Video Editor Portfolio",
    "Cinematic Video Editing",
    "Trailer Editor",
    "Movie Editor",
    "After Effects Editor",
    "Premiere Pro Editor",
    "YouTube Editor 11K",
    "Motion Graphics Designer",
  ],
  authors: [{ name: "Tarshit Singh Rana" }],
  creator: "Tarshit Singh Rana",
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-dark text-brand-white selection:bg-brand-white selection:text-brand-dark">
        {children}
      </body>
    </html>
  );
}
