import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageProvider } from "@/context/LanguageContext";
import { DesignProvider } from "@/context/DesignContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omarapp.dev"),
  title: "Omar Pérez | Developer",
  description: "Professional portfolio and resume of Omar Pérez, Developer. Specialized in React, Next.js, Node.js, and AI automation.",
  keywords: ["Omar Pérez", "Full-Stack Developer", "Next.js", "React", "Node.js", "Tailwind CSS", "Maracaibo", "Venezuela", "Portafolio", "Web Developer"],
  authors: [{ name: "Omar Pérez" }],
  creator: "Omar Pérez",
  openGraph: {
    title: "Omar Pérez | Developer",
    description: "Professional portfolio and resume of Omar Pérez, Developer. Specialized in Next.js, React, Node.js, and AI automation.",
    url: "https://omarapp.dev",
    siteName: "Omar Pérez Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Pérez | Developer",
    description: "Professional portfolio and resume of Omar Pérez, Developer.",
  },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen selection:bg-blue-500/30 selection:text-blue-300">
        <LanguageProvider>
          <DesignProvider>
            {children}
            <ThemeToggle />
          </DesignProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


