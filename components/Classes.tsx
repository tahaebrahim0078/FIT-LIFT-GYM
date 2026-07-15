"use client";

import { useLang } from "./LanguageProvider";
import { dict, pick } from "@/lib/content";
import { SectionHead, Reveal } from "./Section";

export default function Classes() {
  const { lang } = useLang();
  const t = dict.classes;

  // Shared time pill
  const Pill = ({
    value,
    women,
    full,
  }: {
    value: string;
    women?: boolean;
    full?: boolean;
  }) => {
    if (!value) {
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-white/[0.06] px-2 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-lime-bright/70 ${
            full ? "w-full" : ""
          }`}
        >
          {pick(t.closed, lang)}
        </div>
      );
    }
    return (
      <div
        dir="ltr"
        className={`flex items-center justify-center rounded-xl px-3 py-2.5 text-center text-[13px] font-extrabold tracking-tight sm:text-base ${
          full ? "min-w-[118px]" : ""
        } ${
          women
            ? "bg-lime-bright text-ink shadow-[0_6px_20px_-8px_rgba(47,183,48,0.9)]"
            : "bg-white text-ink"
        }`}
      >
        {value}
      </div>
    );
  };

  // One labelled row inside a mobile day card
  const SlotRow = ({
    label,
    value,
    women,
  }: {
    label: string;
    value: string;
    women?: boolean;
  }) => (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60">
        <span className={`h-3 w-3 rounded ${women ? "bg-lime-bright" : "bg-white"}`} />
        {label}
      </span>
      <Pill value={value} women={women} full />
    </div>
  );

  return (
    <section id="classes" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-lime-deep/70 via-ink to-ink" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-lime-DEFAULT/15 blur-[120px]" />

      <div className="container-x relative">
        <SectionHead tag={pick(t.tag, lang)} title={pick(t.title, lang)} center />

        {/* Legend */}
        <div className="reveal mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-widest">
          <span className="flex items-center gap-2 text-white/70">
            <span className="h-3.5 w-3.5 rounded bg-white" /> {pick(t.legendMen, lang)}
          </span>
          <span className="flex items-center gap-2 text-white/70">
            <span className="h-3.5 w-3.5 rounded bg-lime-bright" /> {pick(t.legendWomen, lang)}
          </span>
        </div>

        {/* ===== Desktop / tablet table (md and up) ===== */}
        <Reveal
          kind="scale"
          className="mx-auto hidden max-w-4xl rounded-3xl border border-lime-DEFAULT/25 bg-ink/50 p-6 backdrop-blur-sm md:block"
        >
          <div dir="ltr">
            <div className="mb-3 grid grid-cols-[0.7fr_1fr_1fr_1fr] gap-3">
              <div />
              <HeadCell label={pick(t.shifts[0], lang)} />
              <HeadCell label={pick(t.shifts[1], lang)} accent />
              <HeadCell label={pick(t.shifts[2], lang)} />
            </div>
            <div className="flex flex-col gap-3">
              {t.rows.map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[0.7fr_1fr_1fr_1fr] items-stretch gap-3"
                >
                  <DayCell>{pick(r.day, lang)}</DayCell>
                  <Pill value={r.men1} />
                  <Pill value={r.women} women />
                  <Pill value={r.men2} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ===== Mobile cards (below md) ===== */}
        <div className="mx-auto flex max-w-md flex-col gap-3 md:hidden">
          {t.rows.map((r, i) => (
            <div
              key={i}
              className="reveal rounded-2xl border border-lime-DEFAULT/25 bg-ink/50 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 border-b border-white/10 pb-2 font-display text-lg font-bold uppercase italic tracking-wide text-lime-bright">
                {pick(r.day, lang)}
              </div>
              <div className="space-y-2.5">
                <SlotRow label={pick(t.shifts[0], lang)} value={r.men1} />
                <SlotRow label={pick(t.shifts[1], lang)} value={r.women} women />
                <SlotRow label={pick(t.shifts[2], lang)} value={r.men2} />
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-6 text-center text-xs text-white/45">{pick(t.note, lang)}</p>
      </div>
    </section>
  );
}

function HeadCell({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div
      className={`px-1 text-center font-display text-xs font-bold uppercase leading-tight tracking-wide sm:text-sm ${
        accent ? "text-lime-bright" : "text-white/80"
      }`}
    >
      {label}
    </div>
  );
}

function DayCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-lime-DEFAULT/30 bg-lime-deep/40 px-2 py-3 text-center font-display text-base font-bold uppercase italic tracking-wide text-lime-bright sm:text-lg">
      {children}
    </div>
  );
}
