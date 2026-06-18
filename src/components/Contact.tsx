"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre completo es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa una dirección de correo electrónico válida.";
    }
    if (!formData.message.trim()) newErrors.message = "El mensaje no puede estar vacío.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden py-24 px-6 bg-transparent border-t border-zinc-900/50 font-sans">
      {/* Ambient glass glowing decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.012] rounded-full blur-3xl pointer-events-none" />

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
            Contacto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-455 text-sm leading-relaxed max-w-[60ch]"
          >
            Escríbeme para colaborar o consultar disponibilidad.
          </motion.p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-zinc-400">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className={`w-full py-2 bg-transparent border-b text-sm text-zinc-100 placeholder-zinc-700 transition-colors focus:outline-none rounded-none ${
                    errors.name
                      ? "border-rose-500/80 focus:border-rose-500"
                      : "border-zinc-800 focus:border-accent"
                  }`}
                  placeholder="Ej. Juan Pérez"
                />
                {errors.name && (
                  <span className="text-xs text-rose-500 mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-zinc-400">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className={`w-full py-2 bg-transparent border-b text-sm text-zinc-100 placeholder-zinc-700 transition-colors focus:outline-none rounded-none ${
                    errors.email
                      ? "border-rose-500/80 focus:border-rose-500"
                      : "border-zinc-800 focus:border-accent"
                  }`}
                  placeholder="Ej. juan@correo.com"
                />
                {errors.email && (
                  <span className="text-xs text-rose-500 mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-medium text-zinc-400">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className={`w-full py-2 bg-transparent border-b text-sm text-zinc-100 placeholder-zinc-700 transition-colors focus:outline-none rounded-none resize-none ${
                    errors.message
                      ? "border-rose-500/80 focus:border-rose-500"
                      : "border-zinc-800 focus:border-accent"
                  }`}
                  placeholder="Cuéntame sobre tu proyecto..."
                />
                {errors.message && (
                  <span className="text-xs text-rose-500 mt-1">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Success & Error Messages */}
              {status === "success" && (
                <div className="p-4 bg-zinc-900/40 border border-zinc-900 text-xs text-accent rounded-md">
                  <span>¡Mensaje enviado con éxito! Te responderé muy pronto.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-zinc-900/40 border border-zinc-900 text-xs text-rose-400 rounded-md">
                  <span>Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="tap-feedback w-full sm:w-auto inline-flex items-center justify-center px-5 py-2 text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info & Socials */}
          <div className="lg:col-span-5 glass-card p-8 rounded-2xl flex flex-col justify-between gap-12">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Contacto Directo
              </h3>

              <div className="grid grid-cols-1 gap-5 pt-2">
                <div className="border-l border-white/[0.04] pl-4 py-1">
                  <span className="block text-[9px] font-mono text-zinc-550 uppercase tracking-widest">Email</span>
                  <a
                    href="mailto:omarapp1921@gmail.com"
                    className="text-xs text-zinc-300 hover:text-accent transition-colors"
                  >
                    omarapp1921@gmail.com
                  </a>
                </div>

                <div className="border-l border-white/[0.04] pl-4 py-1">
                  <span className="block text-[9px] font-mono text-zinc-550 uppercase tracking-widest">Teléfono</span>
                  <a
                    href="tel:+584246434673"
                    className="text-xs text-zinc-300 hover:text-accent transition-colors"
                  >
                    +58 424 6434673
                  </a>
                </div>

                <div className="border-l border-white/[0.04] pl-4 py-1">
                  <span className="block text-[9px] font-mono text-zinc-550 uppercase tracking-widest">Ubicación</span>
                  <p className="text-xs text-zinc-300">Maracaibo, Venezuela</p>
                </div>
              </div>
            </div>

            {/* Social Panel */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Redes Sociales
              </h3>
              <div className="flex flex-row gap-5">
                <a
                  href="https://github.com/omarapp19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-300 hover:text-accent transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/omar-perez-a25454176/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-300 hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/omarapp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-300 hover:text-accent transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
