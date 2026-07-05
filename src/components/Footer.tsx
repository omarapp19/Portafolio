"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  LauraHeart,
  CatatumboBridge,
  MusicGuitar,
  CrossedLightsabers,
  MinecraftBlock,
  MasterChiefHelmet,
} from "./ui/SubtleEasterEggs";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/omarapp19",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/omar-perez-a25454176/",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/omarapp/",
    },
    {
      name: "Email",
      href: "mailto:omarapp1921@gmail.com",
    },
  ];

  return (
    <footer className="w-full bg-transparent border-t border-zinc-900/60 py-8 px-6 mt-auto font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
        <div>
          <span>&copy; {currentYear} Omar Pérez. {t.footer.rights[language]}</span>
          <span className="text-[9px] text-zinc-700/60 block mt-1.5 font-mono select-none">
            {t.footer.credits[language]}
          </span>
          <div className="flex items-center gap-2.5 mt-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <LauraHeart />
            <CatatumboBridge />
            <MusicGuitar />
            <CrossedLightsabers />
            <MinecraftBlock />
            <MasterChiefHelmet />
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-end gap-3.5">
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}



