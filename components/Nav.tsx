"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/knowledge";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#roles", label: "Roles" },
  { href: "#outside", label: "Outside work" },
  { href: "#chat", label: "Ask AI" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "bg-base/90 backdrop-blur border-line" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-col mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="#hero" className="focus-ring flex items-center gap-2 font-mono text-sm text-ink">
          <span className="inline-block w-2 h-2 rounded-full bg-signal" aria-hidden="true" />
          {profile.name.split(" ")[0].toLowerCase()}
        </a>
        <ul className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="focus-ring text-sm text-muted hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          className="focus-ring text-sm border border-line px-3 py-1.5 text-ink hover:border-trace hover:text-trace transition-colors"
          download
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
