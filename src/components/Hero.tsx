"use client";

import { PromptingIsAllYouNeed } from "./ui/animated-hero-section";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full h-[100dvh] overflow-hidden bg-transparent"
    >
      {/* Interactive Pong game as the main landing hero */}
      <PromptingIsAllYouNeed
        firstLine="OMAR PEREZ"
        secondLine="SENIOR DEVELOPER" />

      {/* Floating Scroll Indicator Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 pointer-events-none">
        <span className="text-[10px] font-bold tracking-widest text-zinc-500 font-mono uppercase animate-pulse">
          Desplazar para explorar
        </span>
        <div className="w-6 h-10 rounded-full border border-zinc-800 bg-background/60 backdrop-blur-sm flex justify-center p-1">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
