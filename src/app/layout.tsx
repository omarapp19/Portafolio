import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omar Pérez | Senior Full-Stack Developer",
  description: "Portafolio profesional y currículum de Omar Pérez, Senior Full-Stack Developer. Especializado en React, Next.js, Node.js, Firebase y automatización de IA.",
  keywords: ["Omar Pérez", "Senior Full-Stack Developer", "Next.js", "React", "Node.js", "Tailwind CSS", "Maracaibo", "Venezuela", "Portafolio", "Web Developer"],
  authors: [{ name: "Omar Pérez" }],
  creator: "Omar Pérez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-zinc-950 text-zinc-100 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
