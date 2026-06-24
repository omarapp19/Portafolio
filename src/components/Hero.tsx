"use client";

import { PromptingIsAllYouNeed } from "./ui/animated-hero-section";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { language, t } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative w-full h-[100dvh] overflow-hidden bg-transparent"
    >
      {/* Semantic Heading for SEO & Screen Readers */}
      <h1 className="sr-only font-sans">
        Omar Pérez | {t.hero.developer[language]}
      </h1>

      {/* Interactive Pong game as the main landing hero */}
      <PromptingIsAllYouNeed
        firstLine="OMAR PEREZ"
        secondLine={t.hero.developer[language]} />

      {/* Floating Scroll Indicator Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 pointer-events-none">
        <span className="text-[10px] font-bold tracking-widest text-zinc-550 font-mono uppercase animate-pulse">
          {t.hero.scroll[language]}
        </span>
        <div className="w-6 h-10 rounded-full border border-zinc-800 bg-background/60 backdrop-blur-sm flex justify-center p-1">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}


