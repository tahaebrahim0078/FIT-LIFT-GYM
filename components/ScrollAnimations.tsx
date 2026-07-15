"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global scroll engine.
 *  - `.reveal` elements fade/slide/fly into view once (data-reveal="up|left|right|scale|flyL|flyR").
 *  - `[data-parallax]` layers drift vertically as you scroll.
 *  - `[data-scrub-x]` strips slide horizontally, tied 1:1 to scroll progress ("left" | "right").
 */
export default function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      document.body.classList.add("reveal-ready");

      if (reduce) {
        gsap.set(".reveal", { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 });
        return;
      }

      // 1) Reveal on scroll — including dramatic "out of the box" fly-ins
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
        // fly in from fully outside the viewport with a tilt
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

        gsap.fromTo(
          el,
          from,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: kind.startsWith("fly") ? 1.05 : 0.85,
            ease: kind.startsWith("fly") ? "power4.out" : "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2) Vertical parallax layers
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallax || "0.2");
        gsap.to(layer, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: layer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 3) Horizontal scrub strips — huge text sliding through as you scroll
      gsap.utils.toArray<HTMLElement>("[data-scrub-x]").forEach((el) => {
        // Element is far wider than the viewport and always kept shifted left,
        // so the window over it never exposes an empty edge.
        const [from, to] =
          el.dataset.scrubX === "left" ? [-8, -32] : [-32, -8];
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

    // Positions settle after fonts/images load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return null;
}
