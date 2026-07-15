"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageProvider";
import { dict, pick } from "@/lib/content";

export default function Stats() {
  const { lang } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.floor(obj.v).toLocaleString("en-US");
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative border-y border-ink-line bg-ink-soft">
      <div className="container-x grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
        {dict.stats.map((s, i) => (
          <div
            key={i}
            className={`px-4 text-center ${
              i !== dict.stats.length - 1 ? "md:border-e md:border-ink-line" : ""
            }`}
          >
            <div className="flex items-center justify-center font-display text-5xl font-bold text-lime-bright md:text-6xl">
              <span className="stat-num" data-value={s.value}>
                0
              </span>
              <span>{s.suffix}</span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/55">
              {pick(s.label, lang)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
