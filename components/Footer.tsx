"use client";

import { useLang } from "./LanguageProvider";
import { dict, business, pick } from "@/lib/content";
import { Dumbbell, Instagram, Facebook, WhatsApp } from "./Icons";

const links = ["about", "services", "classes", "pricing", "trainers", "contact"] as const;

export default function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-line bg-ink-soft">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <a href="#home" className="flex items-center gap-2.5">
            <img src="/mainLogo.png" alt="Fit & Lift logo" className="h-10 w-auto" />
            <span className="font-display text-xl font-bold tracking-wide">
              FIT<span className="text-lime-bright">&</span>LIFT
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            {pick(dict.footer.tagline, lang)}
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-white/35">
            {pick(dict.footer.made, lang)}
          </p>
          <div className="mt-5 flex gap-3">
            <a href={business.instagram} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-white/70 transition-colors hover:border-lime-bright hover:text-lime-bright">
              <Instagram width={18} height={18} />
            </a>
            <a href={business.facebook} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-white/70 transition-colors hover:border-lime-bright hover:text-lime-bright">
              <Facebook width={18} height={18} />
            </a>
            <a href={`https://wa.me/2${business.phonePrimary}`} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-line text-white/70 transition-colors hover:border-lime-bright hover:text-lime-bright">
              <WhatsApp width={18} height={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
            {lang === "ar" ? "روابط" : "Explore"}
          </h4>
          <ul className="space-y-2.5">
            {links.map((l) => (
              <li key={l}>
                <a href={`#${l}`} className="text-sm text-white/65 transition-colors hover:text-lime-bright">
                  {pick(dict.nav[l], lang)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
            {lang === "ar" ? "تواصل" : "Contact"}
          </h4>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li dir="ltr" className="rtl:text-right">{business.phonePrimary}</li>
            <li dir="ltr" className="rtl:text-right">{business.email}</li>
            <li>{business.handle}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/40 sm:flex-row">
          <p>© {year} FIT & LIFT GYM — {pick(dict.footer.rights, lang)}</p>
          <p>Benha • Qalyubia • Egypt 🇪🇬</p>
        </div>
      </div>
    </footer>
  );
}
