"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "./LanguageProvider";

/**
 * Global scroll engine.
 *  - `.reveal` elements fade/slide/fly into view once (data-reveal="up|left|right|scale|flyL|flyR").
 *  - `[data-parallax]` layers drift vertically as you scroll.
 *  - `[data-scrub-x]` strips slide horizontally, tied 1:1 to scroll progress ("left" | "right").
 *
 * Behaviour is identical in every language — only the text changes. The scroll-
 * driven strips are torn down and rebuilt whenever the language flips, because a
 * language change resizes their content and would otherwise leave the tweens
 * pinned at stale positions (frozen). Reveals are built once and left alone.
 */
export default function ScrollAnimations() {
  const { lang } = useLang();

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Reveals + parallax: built once on mount ----
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.body.classList.add("reveal-ready");

      if (reduce) {
        gsap.set(".reveal", { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 });
        return;
      }

      // Reveal on scroll — including dramatic "out of the box" fly-ins
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const from: gsap.TweenVars = { opacity: 0 };
        if (kind === "up") from.y = 46;
        if (kind === "left") from.x = -60;
        if (kind === "right") from.x = 60;
        if (kind === "scale") {
          from.scale = 0.9;
          from.y = 30;
        }
        if (kind === "flyL") {
          from.x = -160;
          from.rotate = -8;
          from.y = 40;
        }
        if (kind === "flyR") {
          from.x = 160;
          from.rotate = 8;
          from.y = 40;
        }

        gsap.fromTo(el, from, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: kind.startsWith("fly") ? 1.05 : 0.85,
          ease: kind.startsWith("fly") ? "power4.out" : "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      // Vertical parallax layers
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallax || "0.2");
        gsap.to(layer, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: { trigger: layer, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Horizontal scrub strips: rebuilt on every language change ----
  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-scrub-x]").forEach((el) => {
        // Same values/direction in every language — element is far wider than the
        // viewport and kept shifted left, so no empty edge is ever exposed.
        const [from, to] = el.dataset.scrubX === "left" ? [-8, -32] : [-32, -8];
        gsap.fromTo(
          el,
          { xPercent: from },
          {
            xPercent: to,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-band]") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    });

    // Recalculate once the new (translated) layout has settled.
    const raf1 = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf1);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return null;
}
