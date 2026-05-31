"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-[#030303]/90 backdrop-blur-sm border-[#F5F5F7]/10 py-4" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-12 flex items-center justify-between">
        <a
          href="#hero"
          className="font-mono text-sm text-[#F5F5F7] tracking-wider"
        >
          AK_
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-colors duration-300",
                  activeSection === item.href.slice(1)
                    ? "text-[#F59E0B]"
                    : "text-[#F5F5F7]/50 hover:text-[#F5F5F7]"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:block font-mono text-xs uppercase tracking-widest text-[#030303] bg-[#F59E0B] px-4 py-2 hover:bg-[#F5F5F7] transition-colors duration-300"
        >
          Connect
        </a>

        <button
          className="md:hidden p-2 text-[#F5F5F7]/70 hover:text-[#F5F5F7]"
          aria-label="Menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
