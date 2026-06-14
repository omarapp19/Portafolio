"use client";

import { motion } from "motion/react";
import { Atom, Browser, Palette, Code, Terminal, Cpu, Database, Cloud, Globe, GitBranch, Gear, Robot, Brain, ArrowsClockwise, Link } from "@phosphor-icons/react";

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
        { name: "Tailwind CSS", level: "Sólido", icon: <Palette size={18} /> },
        { name: "TypeScript", level: "Avanzado", icon: <Code size={18} /> },
      ],
    },
    {
      title: "Backend & BD",
      items: [
        { name: "Node.js", level: "Sólido", icon: <Terminal size={18} /> },
        { name: "Express.js", level: "Sólido", icon: <Cpu size={18} /> },
        { name: "Firebase", level: "Avanzado", icon: <Database size={18} /> },
        { name: "Cloud Firestore", level: "Avanzado", icon: <Database size={18} /> },
      ],
    },
    {
      title: "Infraestructura & CI/CD",
      items: [
        { name: "Cloudflare R2", level: "Sólido", icon: <Cloud size={18} /> },
        { name: "Vercel", level: "Avanzado", icon: <Globe size={18} /> },
        { name: "Git / GitHub", level: "Avanzado", icon: <GitBranch size={18} /> },
        { name: "CI/CD Pipelines", level: "Sólido", icon: <ArrowsClockwise size={18} /> },
      ],
    },
    {
      title: "Automatización & IA",
      items: [
        { name: "n8n", level: "Sólido", icon: <Gear size={18} /> },
        { name: "ThinköAI", level: "Avanzado", icon: <Brain size={18} /> },
        { name: "Integraciones API", level: "Sólido", icon: <Link size={18} /> },
        { name: "Agentes de IA", level: "Sólido", icon: <Robot size={18} /> },
      ],
    },
  ];

  return (
    <section id="tech-stack" className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              className="flex flex-col gap-4"
            >
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                {category.title}
              </h3>
              <div className="flex flex-col gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-lg border border-zinc-900 bg-zinc-950/40 hover:border-zinc-800 transition-colors duration-300"
                  >
                    <div className="text-emerald-450 shrink-0">
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
