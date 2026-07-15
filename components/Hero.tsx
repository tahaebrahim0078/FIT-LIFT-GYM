"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLang } from "./LanguageProvider";
import { dict, pick } from "@/lib/content";
import { ArrowRight, Star } from "./Icons";

export default function Hero() {
  const { lang } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-logo",
        { scale: 1.18, opacity: 0 },
        { scale: 1, opacity: 0.25, duration: 1.3, ease: "power2.out" }
      )
        .fromTo(".hero-kicker", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.9")
        .fromTo(
          ".hero-line",
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          "-=0.5"
        )
        .fromTo(".hero-tag", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.35")
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.35"
        );

      // mark ready so the CSS failsafe never fights GSAP
      document.body.classList.add("anim-ready");
    }, root);
    return () => ctx.revert();
  }, [lang]);

  const t = dict.hero;

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-24 pt-28 text-center"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-lines opacity-50" />

      {/* Cinematic logo behind the text */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        data-parallax="0.12"
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[70vw] max-h-[560px] w-[70vw] max-w-[560px] rounded-full bg-lime-bright/20 blur-[120px] animate-pulseGlow" />
          <img
            src="/logo.png"
            alt=""
            aria-hidden
            className="hero-logo hero-anim-logo relative w-[min(86vw,560px)] drop-shadow-[0_0_60px_rgba(47,183,48,0.45)]"
          />
        </div>
      </div>

      {/* Darkening gradient so foreground text always reads */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink" />

      {/* Foreground copy */}
      <div className="container-x relative z-10 flex flex-col items-center">
        <div className="hero-kicker hero-anim section-tag mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-lime-bright animate-pulse" />
          {pick(t.kicker, lang)}
        </div>

        <h1 className="font-display text-[clamp(2.7rem,11vw,8rem)] font-bold uppercase leading-[0.9]">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line hero-anim block">{pick(t.titleTop, lang)}</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-line hero-anim block text-lime-bright">{pick(t.titleHi, lang)}</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-line hero-anim block">
              {pick(t.titleBottom, lang)}{" "}
              {pick(t.titleAccent, lang) && (
                <span className="text-stroke">{pick(t.titleAccent, lang)}</span>
              )}
            </span>
          </span>
        </h1>

        <p className="hero-tag hero-anim mt-6 flex items-center gap-2 text-base font-semibold text-lime-bright sm:text-lg">
          <Star width={18} height={18} />
          {pick(t.tagline, lang)}
        </p>

        <p className="hero-sub hero-anim mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          {pick(t.sub, lang)}
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a href="#contact" className="hero-cta hero-anim btn-primary w-full sm:w-auto">
            {pick(t.ctaPrimary, lang)}
            <ArrowRight width={18} height={18} className="rtl:rotate-180" />
          </a>
          <a href="#pricing" className="hero-cta hero-anim btn-ghost w-full sm:w-auto">
            {pick(t.ctaSecondary, lang)}
          </a>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-0 left-0 w-full border-y border-ink-line bg-lime-bright py-2.5 sm:py-3">
        <div dir="ltr" className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-5 font-display text-xs font-bold uppercase tracking-widest text-ink sm:mx-6 sm:text-sm"
                >
                  {pick(dict.ticker, lang)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
