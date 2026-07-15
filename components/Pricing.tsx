"use client";

import { useLang } from "./LanguageProvider";
import { dict, pick, waUrl, offerMessage } from "@/lib/content";
import { SectionHead, Reveal } from "./Section";
import { Check } from "./Icons";

export default function Pricing() {
  const { lang } = useLang();
  const t = dict.pricing;

  return (
    <section id="pricing" className="relative border-y border-ink-line bg-ink-soft py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-bright/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHead tag={pick(t.tag, lang)} title={pick(t.title, lang)} center />

        {/* ===== Membership by duration ===== */}
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {t.plans.map((plan, i) => {
            const offer = `${pick(plan.name, lang)} — ${pick(plan.unit, lang)} (${plan.price} ${pick(t.egp, lang)})`;
            const href = waUrl(offerMessage(lang, offer));
            return (
            <Reveal
              key={i}
              kind="up"
              className={`relative flex flex-col rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                plan.highlighted
                  ? "border-lime-bright bg-gradient-to-b from-lime-deep/40 to-ink-card shadow-[0_0_60px_-15px_rgba(47,183,48,0.45)] lg:scale-[1.04]"
                  : "border-ink-line bg-ink-card/50"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-lime-bright px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink">
                  {pick(t.popular, lang)}
                </span>
              )}

              <h3 className="text-lg font-bold uppercase tracking-wide text-white/80">
                {pick(plan.name, lang)}
              </h3>
              <p className="mt-1 text-xs text-white/45">{pick(plan.unit, lang)}</p>

              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-6xl font-bold text-lime-bright">
                  {plan.price}
                </span>
                <span className="mb-2 text-sm text-white/50">{pick(t.egp, lang)}</span>
              </div>

              {pick(plan.badge, lang) && (
                <span className="mt-3 inline-block w-fit rounded-full bg-lime-bright/10 px-3 py-1 text-xs font-bold text-lime-bright">
                  {pick(plan.badge, lang)}
                </span>
              )}

              <ul className="mt-6 flex-1 space-y-3.5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check width={17} height={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-lime-bright" />
                    {pick(f, lang)}
                  </li>
                ))}
              </ul>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 w-full rounded-full py-3.5 text-center text-sm font-bold uppercase tracking-wide transition-all ${
                  plan.highlighted
                    ? "bg-lime-bright text-ink hover:shadow-[0_0_30px_-5px_rgba(47,183,48,0.7)]"
                    : "border border-ink-line text-white hover:border-lime-bright hover:text-lime-bright"
                }`}
              >
                {pick(t.choose, lang)}
              </a>
            </Reveal>
            );
          })}
        </div>

        {/* ===== Private coach packages ===== */}
        <div className="mt-20">
          <div className="reveal mb-10 text-center">
            <span className="section-tag">{pick(t.coachTag, lang)}</span>
            <h3 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-bold uppercase leading-tight">
              {pick(t.coachTitle, lang)}
            </h3>
          </div>

          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {t.coachPlans.map((plan, i) => {
              const offer =
                lang === "ar"
                  ? `البرايفت كوتش: ${plan.sessions} حصة + ${plan.inbody} InBody (${plan.price} ${pick(t.egp, lang)})`
                  : `Private Coach: ${plan.sessions} sessions + ${plan.inbody} InBody (${plan.price} ${pick(t.egp, lang)})`;
              const href = waUrl(offerMessage(lang, offer));
              return (
              <Reveal
                key={i}
                kind={i === 0 ? "flyL" : i === 2 ? "flyR" : "up"}
                className={`relative flex flex-col overflow-hidden rounded-3xl border p-8 text-center transition-transform duration-300 hover:-translate-y-1.5 ${
                  plan.highlighted
                    ? "border-lime-bright bg-gradient-to-b from-lime-deep/50 to-ink-card shadow-[0_0_60px_-15px_rgba(47,183,48,0.45)]"
                    : "border-ink-line bg-ink-card/50"
                }`}
              >
                <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-lime-bright/10 blur-3xl" />

                {/* sessions count */}
                <div className="relative">
                  <span className="font-display text-7xl font-bold text-lime-bright">
                    {plan.sessions}
                  </span>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-white/70">
                    {pick(t.sessionWord, lang)}
                  </p>
                </div>

                {/* inbody */}
                <div className="relative mt-6 flex items-center justify-center gap-2 rounded-xl border border-ink-line bg-ink/50 py-3 text-sm font-semibold text-white/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-bright/15 text-lime-bright">
                    <Check width={14} height={14} strokeWidth={3} />
                  </span>
                  {plan.inbody} × {pick(t.inbodyWord, lang)}
                </div>

                <div className="relative mt-6 flex items-end justify-center gap-2">
                  <span className="font-display text-5xl font-bold">{plan.price}</span>
                  <span className="mb-1.5 text-sm text-white/50">{pick(t.egp, lang)}</span>
                </div>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative mt-7 w-full rounded-full py-3.5 text-center text-sm font-bold uppercase tracking-wide transition-all ${
                    plan.highlighted
                      ? "bg-lime-bright text-ink hover:shadow-[0_0_30px_-5px_rgba(47,183,48,0.7)]"
                      : "border border-ink-line text-white hover:border-lime-bright hover:text-lime-bright"
                  }`}
                >
                  {pick(t.choose, lang)}
                </a>
              </Reveal>
              );
            })}
          </div>

          <p className="reveal mt-8 text-center text-xs text-white/40">{pick(t.coachNote, lang)}</p>
        </div>

        <p className="reveal mt-6 text-center text-xs text-white/40">{pick(t.note, lang)}</p>
      </div>
    </section>
  );
}
