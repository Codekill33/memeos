import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "MemeOS — Autonomous Meme Coin Launch Agent",
  description: "AI-powered autonomous agent that monitors trends, scores virality, and generates complete meme coin launch packages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
