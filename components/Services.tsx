"use client";

import { useLang } from "./LanguageProvider";
import { dict, pick, waUrl, offerMessage } from "@/lib/content";
import { SectionHead, Reveal } from "./Section";
import { iconMap, ArrowRight } from "./Icons";

export default function Services() {
  const { lang } = useLang();
  const t = dict.services;

  return (
    <section id="services" className="relative py-24">
      <div className="container-x">
        <SectionHead tag={pick(t.tag, lang)} title={pick(t.title, lang)} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const img = "img" in item ? (item.img as string) : undefined;
            const href = waUrl(offerMessage(lang, pick(item.title, lang)));
            return (
              <Reveal
                key={i}
                kind="scale"
                className="group relative overflow-hidden rounded-2xl border border-ink-line bg-ink-card/50 p-7 transition-all duration-300 hover:border-lime-bright/50 hover:bg-ink-card"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lime-bright/0 blur-3xl transition-all duration-500 group-hover:bg-lime-bright/15" />
                <span className="sheen" aria-hidden />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-lime-bright/10 text-white transition-all duration-300 group-hover:bg-lime-bright group-hover:text-ink">
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      aria-hidden
                      className="h-7 w-7 object-contain transition-all duration-300 [filter:brightness(0)_invert(1)] group-hover:[filter:brightness(0)]"
                    />
                  ) : (
                    <Icon width={26} height={26} />
                  )}
                </span>
                <h3 className="relative mt-6 text-xl font-bold">{pick(item.title, lang)}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-white/60">
                  {pick(item.desc, lang)}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-lime-bright opacity-80 transition-all duration-300 group-hover:opacity-100">
                  {lang === "ar" ? "اطلب على واتساب" : "Ask on WhatsApp"}
                  <ArrowRight width={14} height={14} className="rtl:rotate-180" />
                </span>

                {/* Whole card opens WhatsApp with this service's name */}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={pick(item.title, lang)}
                  className="absolute inset-0 z-20"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
