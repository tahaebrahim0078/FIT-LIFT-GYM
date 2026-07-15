"use client";

import { useLang } from "./LanguageProvider";
import { dict, pick } from "@/lib/content";
import { SectionHead, Reveal } from "./Section";
import { Instagram } from "./Icons";

const gradients = [
  "from-lime-deep/60 to-ink-card",
  "from-[#132318]/80 to-ink-card",
  "from-lime-deep/40 to-ink-card",
];

export default function Trainers() {
  const { lang } = useLang();
  const t = dict.trainers;

  return (
    <section id="trainers" className="relative py-24">
      <div className="container-x">
        <SectionHead tag={pick(t.tag, lang)} title={pick(t.title, lang)} />

        <div className="grid gap-6 md:grid-cols-3">
          {t.people.map((p, i) => {
            const img = "img" in p ? (p.img as string) : undefined;
            const igUrl = "igUrl" in p ? (p.igUrl as string) : undefined;
            return (
            <Reveal
              key={i}
              kind={i % 2 === 0 ? "flyL" : "flyR"}
              className="group relative overflow-hidden rounded-2xl border border-ink-line"
            >
              <div className={`relative aspect-[4/5] bg-gradient-to-b ${gradients[i % 3]}`}>
                {img ? (
                  <img
                    src={img}
                    alt={pick(p.name, lang)}
                    className="absolute inset-0 h-full w-full object-cover object-top grayscale-[15%] transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 grid-lines opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[8rem] font-bold text-white/5 transition-transform duration-500 group-hover:scale-110">
                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                      </span>
                    </div>
                  </>
                )}
                {/* Overlay info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6 pt-16">
                  <p className="text-xs font-bold uppercase tracking-widest text-lime-bright">
                    {pick(p.role, lang)}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">{pick(p.name, lang)}</h3>
                  {igUrl ? (
                    <a
                      href={igUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 mt-3 inline-flex items-center gap-1.5 text-xs text-white/70 transition-colors hover:text-lime-bright"
                    >
                      <Instagram width={14} height={14} />
                      {p.ig}
                    </a>
                  ) : (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/50">
                      <Instagram width={14} height={14} />
                      {p.ig}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
