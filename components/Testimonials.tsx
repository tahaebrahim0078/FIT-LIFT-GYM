"use client";

import { useLang } from "./LanguageProvider";
import { dict, pick } from "@/lib/content";
import { SectionHead, Reveal } from "./Section";
import { Star } from "./Icons";

export default function Testimonials() {
  const { lang } = useLang();
  const t = dict.testimonials;

  return (
    <section className="relative py-24">
      <div className="container-x">
        <SectionHead tag={pick(t.tag, lang)} title={pick(t.title, lang)} center />

        <div className="grid gap-6 md:grid-cols-3">
          {t.items.map((item, i) => (
            <Reveal
              key={i}
              kind="up"
              className="relative flex flex-col rounded-2xl border border-ink-line bg-ink-card/50 p-7"
            >
              <div className="mb-4 flex gap-1 text-lime-bright">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} width={16} height={16} />
                ))}
              </div>
              <p className="flex-1 text-base leading-relaxed text-white/85">
                “{pick(item.quote, lang)}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-ink-line pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-bright/15 font-bold text-lime-bright">
                  {pick(item.name, lang).charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold">{pick(item.name, lang)}</p>
                  <p className="text-xs text-white/50">{pick(item.tag, lang)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
