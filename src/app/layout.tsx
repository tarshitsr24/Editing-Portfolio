import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
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
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-dark text-white selection:bg-brand-blue/30 selection:text-brand-blue">
        {children}
      </body>
    </html>
  );
}
