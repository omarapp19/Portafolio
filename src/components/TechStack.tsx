"use client";

import { motion } from "motion/react";
import { Atom, Browser, Palette, Code, Terminal, Cpu, Database, Cloud, Globe, GitBranch, Gear, Robot, Brain, ArrowsClockwise, Link, Sparkle } from "@phosphor-icons/react";

interface TechItem {
  name: string;
  level: string;
  icon: React.ReactNode;
}

interface Category {
  title: string;
  items: TechItem[];
}

export default function TechStack() {
  const categories: Category[] = [
    {
      title: "Desarrollo Frontend",
      items: [
        { name: "React", level: "Sólido", icon: <Atom size={18} /> },
        { name: "Next.js", level: "Avanzado", icon: <Browser size={18} /> },
        { name: "JavaScript", level: "Avanzado", icon: <Code size={18} /> },
        { name: "Angular", level: "Sólido", icon: <Code size={18} /> },
        { name: "Tailwind CSS", level: "Sólido", icon: <Palette size={18} /> },
        { name: "TypeScript", level: "Avanzado", icon: <Code size={18} /> },
      ],
    },
    {
      title: "Backend & BD",
      items: [
        { name: "Node.js", level: "Sólido", icon: <Terminal size={18} /> },
        { name: "Express.js", level: "Sólido", icon: <Cpu size={18} /> },
        { name: "Java", level: "Sólido", icon: <Cpu size={18} /> },
        { name: "Python", level: "Sólido", icon: <Code size={18} /> },
        { name: "MySQL", level: "Sólido", icon: <Database size={18} /> },
      ],
    },
    {
      title: "Infraestructura & CI/CD",
      items: [
        { name: "Cloudflare R2", level: "Sólido", icon: <Cloud size={18} /> },
        { name: "Vercel", level: "Avanzado", icon: <Globe size={18} /> },
        { name: "Firebase", level: "Avanzado", icon: <Database size={18} /> },
        { name: "Git / GitHub", level: "Avanzado", icon: <GitBranch size={18} /> },
        { name: "CI/CD Pipelines", level: "Sólido", icon: <ArrowsClockwise size={18} /> },
      ],
    },
    {
      title: "Automatización & IA",
      items: [
        { name: "n8n", level: "Sólido", icon: <Gear size={18} /> },
        { name: "ThinköAI", level: "Avanzado", icon: <Brain size={18} /> },
        { name: "Claude (Anthropic)", level: "Avanzado", icon: <Sparkle size={18} /> },
        { name: "Integraciones API", level: "Sólido", icon: <Link size={18} /> },
        { name: "Agentes de IA", level: "Sólido", icon: <Robot size={18} /> },
      ],
    },
  ];

  return (
    <section id="tech-stack" className="relative overflow-hidden py-24 px-6 bg-transparent border-t border-zinc-900/50 font-sans">
      {/* Ambient glass glowing decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/[0.012] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3"
          >
            Habilidades Técnicas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-455 text-sm leading-relaxed max-w-[60ch]"
          >
            Tecnologías y herramientas que domino para construir soluciones estables y eficientes.
          </motion.p>
        </div>

        {/* Visual Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card p-6 rounded-2xl flex flex-col gap-5 hover:scale-[1.005]"
            >
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 border-b border-white/[0.03] pb-2">
                {category.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.02] bg-zinc-950/20 hover:border-accent/20 transition-all duration-300"
                  >
                    <div className="text-accent shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-zinc-200">{item.name}</span>
                      <span className="text-[9px] text-zinc-550 font-mono tracking-wider uppercase">
                        {item.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
