export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="w-full bg-zinc-950 border-t border-zinc-900/60 py-8 px-6 mt-auto font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
        <div>
          <span>&copy; {currentYear} Omar Pérez. Todos los derechos reservados.</span>
        </div>

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
    </footer>
  );
}
