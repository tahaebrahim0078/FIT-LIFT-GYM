"use client";

import { useLang } from "./LanguageProvider";

/**
 * A full-bleed band of oversized text that slides horizontally, driven by scroll.
 * Two rows travel in opposite directions. Rows are repeated enough times to stay
 * far wider than the viewport in both languages, so no empty edge is ever exposed.
 */
export default function ScrollBand({
  variant = "dark",
}: {
  variant?: "dark" | "green";
}) {
  const { lang } = useLang();

  const wordsAr = ["قوة", "انضباط", "ريكفري", "تغذية", "كارديو", "حديد", "كروس فيت", "إصرار"];
  const wordsEn = ["STRENGTH", "DISCIPLINE", "RECOVERY", "NUTRITION", "CARDIO", "IRON", "CROSSFIT", "GRIND"];
  const words = lang === "ar" ? wordsAr : wordsEn;

  const isGreen = variant === "green";
  const REPEAT = 4; // guarantees the strip is much wider than any viewport

  const Row = ({ dir, filled }: { dir: "left" | "right"; filled: boolean }) => (
    <div className="flex w-max whitespace-nowrap" data-scrub-x={dir}>
      {Array.from({ length: REPEAT }).map((_, k) => (
        <span key={k} className="flex shrink-0 items-center">
          {words.map((w, i) => (
            <span key={i} className="flex items-center gap-3 px-3 sm:gap-6 sm:px-4">
              <span
                className={`font-display text-[clamp(1.35rem,5.5vw,4.5rem)] font-bold uppercase leading-none ${
                  isGreen
                    ? filled
                      ? "text-ink"
                      : "text-ink/40 [-webkit-text-stroke:1.5px_rgba(10,11,10,0.5)] [color:transparent]"
                    : filled
                    ? "text-lime-bright"
                    : "text-white/10 [-webkit-text-stroke:1.2px_rgba(47,183,48,0.5)] [color:transparent]"
                }`}
              >
                {w}
              </span>
              <span className={`text-lg sm:text-2xl ${isGreen ? "text-ink/70" : "text-lime-bright"}`}>
                ✦
              </span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <section
      data-band
      className={`relative overflow-hidden border-y py-5 sm:py-9 ${
        isGreen ? "border-lime-DEFAULT/40 bg-lime-bright" : "border-ink-line bg-ink-soft"
      }`}
    >
      <div className="flex flex-col gap-1.5 sm:gap-3" dir="ltr">
        <Row dir="left" filled />
        <Row dir="right" filled={false} />
      </div>
    </section>
  );
}
