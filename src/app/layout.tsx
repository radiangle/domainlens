import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DomainLens - AI Agent Generator",
  description:
    "Transform any domain description into a working, expert-level AI agent in under 5 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="grid-background" />
        <div className="gradient-glow gradient-glow-orange" />
        <div className="gradient-glow gradient-glow-blue" />
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
