"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict, pick, waUrl, offerMessage } from "@/lib/content";
import { Globe, Menu, X, Dumbbell } from "./Icons";

const sections = ["about", "services", "classes", "pricing", "trainers", "contact"] as const;

export default function Navbar() {
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const joinHref = waUrl(
    offerMessage(lang, lang === "ar" ? "الاشتراك في الجيم" : "a gym membership")
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[70px] items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <img src="/mainLogo.png" alt="Fit & Lift logo" className="h-10 w-auto" />
          <span className="font-display text-xl font-bold tracking-wide">
            FIT<span className="text-lime-bright">&</span>LIFT
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className="text-sm font-semibold text-white/70 transition-colors hover:text-lime-bright"
              >
                {pick(dict.nav[s], lang)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="flex items-center gap-1.5 rounded-full border border-ink-line px-3 py-2 text-xs font-bold text-white/80 transition-colors hover:border-lime-bright hover:text-lime-bright"
          >
            <Globe width={16} height={16} />
            {lang === "ar" ? "EN" : "ع"}
          </button>

          <a
            href={joinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden btn-primary !px-5 !py-2.5 sm:inline-flex"
          >
            {pick(dict.nav.join, lang)}
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-line text-white lg:hidden"
          >
            {open ? <X width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink-line bg-ink/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-x flex flex-col py-4">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-semibold text-white/80"
              >
                {pick(dict.nav[s], lang)}
              </a>
            </li>
          ))}
          <a
            href={joinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-3"
            onClick={() => setOpen(false)}
          >
            {pick(dict.nav.join, lang)}
          </a>
        </ul>
      </div>
    </header>
  );
}
