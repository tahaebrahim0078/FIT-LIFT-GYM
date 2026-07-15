"use client";

import { useLang } from "./LanguageProvider";
import { dict, pick } from "@/lib/content";
import { SectionHead, Reveal } from "./Section";
import { Check, Star } from "./Icons";

export default function About() {
  const { lang } = useLang();
  const t = dict.about;

  return (
    <section id="about" className="relative py-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Visual */}
        <Reveal kind="flyL" className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-ink-line bg-ink-card">
            <img
              src="/section2.png"
              alt="تمرين في جيم فيت آند ليفت"
              className="h-full w-full object-cover"
            />
            {/* green tint + bottom fade so it blends with the dark theme */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-lime-deep/10 mix-blend-overlay" />
            <span className="absolute left-6 top-6 rounded-full border border-lime-bright/30 bg-ink/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-lime-bright backdrop-blur-sm">
              Est. Benha
            </span>
          </div>

          {/* Floating trust badge */}
          <div className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-2xl border border-lime-bright/30 bg-ink-card px-5 py-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] rtl:right-auto rtl:left-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-bright text-ink">
              <Star width={22} height={22} />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">{pick(t.badge, lang)}</p>
              <p className="text-xs text-white/50">Egypt 🇪🇬</p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="section-tag">{pick(t.tag, lang)}</span>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold uppercase leading-[1.05]">
              {pick(t.title, lang)}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70">{pick(t.body, lang)}</p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.points.map((p, i) => (
              <Reveal key={i} className="flex items-center gap-3 rounded-xl border border-ink-line bg-ink-card/50 px-4 py-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-bright/15 text-lime-bright">
                  <Check width={16} height={16} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-semibold text-white/85">{pick(p, lang)}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
