"use client";

import { FormEvent, useState } from "react";
import { useLang } from "./LanguageProvider";
import { dict, business, pick } from "@/lib/content";
import { Reveal } from "./Section";
import { Phone, Mail, MapPin, Clock, WhatsApp, Instagram, Facebook, ArrowRight } from "./Icons";

export default function Contact() {
  const { lang } = useLang();
  const c = dict.contact;
  const f = dict.cta;
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Placeholder submit — wire to WhatsApp / API / email service as needed.
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const goal = data.get("goal");
    const msg = encodeURIComponent(
      `مرحباً Fit & Lift 👋\nالاسم: ${name}\nالموبايل: ${phone}\nالهدف: ${goal}`
    );
    setTimeout(() => {
      setStatus("done");
      window.open(`https://wa.me/2${business.phonePrimary}?text=${msg}`, "_blank");
    }, 900);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${business.mapsQuery}`;

  return (
    <section id="contact" className="relative py-24">
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-lime-bright/10 blur-[130px]" />
      <div className="container-x relative grid gap-10 lg:grid-cols-2">
        {/* Left: form */}
        <Reveal kind="flyL" className="rounded-3xl border border-ink-line bg-ink-card/60 p-8 sm:p-10">
          <span className="section-tag">{pick(c.tag, lang)}</span>
          <h2 className="mt-5 font-display text-[clamp(1.7rem,4vw,2.8rem)] font-bold uppercase leading-tight">
            {pick(f.title, lang)}
          </h2>
          <p className="mt-3 text-sm text-white/60">{pick(f.sub, lang)}</p>

          {status === "done" ? (
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-lime-bright/40 bg-lime-bright/10 px-5 py-6 text-lime-bright">
              <span className="text-2xl">✅</span>
              <p className="font-semibold">{pick(f.done, lang)}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <input
                name="name"
                required
                placeholder={pick(f.name, lang)}
                className="w-full rounded-xl border border-ink-line bg-ink/60 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/40 focus:border-lime-bright"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder={pick(f.phone, lang)}
                className="w-full rounded-xl border border-ink-line bg-ink/60 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/40 focus:border-lime-bright"
              />
              <input
                name="goal"
                placeholder={pick(f.goal, lang)}
                className="w-full rounded-xl border border-ink-line bg-ink/60 px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-white/40 focus:border-lime-bright"
              />
              <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
                {status === "sending" ? pick(f.sending, lang) : pick(f.send, lang)}
                {status !== "sending" && <ArrowRight width={18} height={18} className="rtl:rotate-180" />}
              </button>
            </form>
          )}
        </Reveal>

        {/* Right: contact info + map */}
        <Reveal kind="flyR" className="flex flex-col gap-4">
          <div className="rounded-3xl border border-ink-line bg-ink-card/60 p-8">
            <h3 className="mb-6 font-display text-2xl font-bold uppercase">{pick(c.title, lang)}</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-bright/10 text-lime-bright">
                  <MapPin width={20} height={20} />
                </span>
                <span className="leading-relaxed text-white/75">{pick(c.address, lang)}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-bright/10 text-lime-bright">
                  <Phone width={20} height={20} />
                </span>
                <span dir="ltr" className="text-white/75">
                  {business.phonePrimary} &nbsp;•&nbsp; {business.phoneSecondary}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-bright/10 text-lime-bright">
                  <Mail width={20} height={20} />
                </span>
                <span dir="ltr" className="text-white/75">{business.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-bright/10 text-lime-bright">
                  <Clock width={20} height={20} />
                </span>
                <span className="text-white/75">{pick(c.hours, lang)}</span>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`https://wa.me/2${business.phonePrimary}`} target="_blank" className="btn-primary !py-2.5 !px-5">
                <WhatsApp width={18} height={18} /> WhatsApp
              </a>
              <a href={business.instagram} target="_blank" className="btn-ghost !py-2.5 !px-4">
                <Instagram width={18} height={18} />
              </a>
              <a href={business.facebook} target="_blank" className="btn-ghost !py-2.5 !px-4">
                <Facebook width={18} height={18} />
              </a>
            </div>
          </div>

          {/* Map block */}
          <a
            href={mapsUrl}
            target="_blank"
            className="group relative flex-1 overflow-hidden rounded-3xl border border-ink-line bg-gradient-to-br from-lime-deep/30 to-ink-card"
          >
            <div className="absolute inset-0 grid-lines opacity-40" />
            <div className="relative flex h-full min-h-[160px] flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-bright text-ink transition-transform duration-300 group-hover:scale-110">
                <MapPin width={26} height={26} />
              </span>
              <p className="text-sm font-bold uppercase tracking-widest text-lime-bright">
                {pick(c.directions, lang)}
              </p>
              <p className="text-xs text-white/50">Benha • Qalyubia • Egypt</p>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
