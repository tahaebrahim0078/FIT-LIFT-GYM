"use client";

import { useEffect, useRef } from "react";

/**
 * Premium cinematic canvas backdrop for the Hero.
 * - Slow-rising green "embers" (dust/particles) with soft glow
 * - A volumetric light beam that drifts and breathes
 * - Fully code-driven (no video files), DPR-aware, and cheap:
 *   pauses when the Hero scrolls out of view and honours reduced-motion.
 */
export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    type Ember = {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      a: number; // base alpha
      tw: number; // twinkle phase
      tws: number; // twinkle speed
      hue: number; // 0 = green brand, 1 = white
    };
    let embers: Ember[] = [];

    const BRAND = "47, 183, 48"; // #2FB730

    function rand(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function seed() {
      // density scales with area but stays modest for perf
      const count = Math.min(90, Math.round((w * h) / 22000));
      embers = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 2.4),
        vy: rand(6, 22),
        vx: rand(-6, 6),
        a: rand(0.15, 0.7),
        tw: Math.random() * Math.PI * 2,
        tws: rand(0.6, 1.8),
        hue: Math.random() < 0.78 ? 0 : 1,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    let t = 0;
    let last = performance.now();
    let raf = 0;
    let running = true;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;

      ctx!.clearRect(0, 0, w, h);

      // --- volumetric light beam: a soft diagonal shaft that drifts + breathes
      const beamX = w * (0.5 + Math.sin(t * 0.18) * 0.16);
      const beamAlpha = 0.10 + Math.sin(t * 0.5) * 0.045;
      const g = ctx!.createLinearGradient(beamX - w * 0.25, 0, beamX + w * 0.1, h);
      g.addColorStop(0, `rgba(${BRAND}, ${Math.max(0, beamAlpha)})`);
      g.addColorStop(0.55, `rgba(${BRAND}, ${Math.max(0, beamAlpha * 0.35)})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.save();
      ctx!.globalCompositeOperation = "screen";
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.moveTo(beamX - w * 0.16, 0);
      ctx!.lineTo(beamX + w * 0.08, 0);
      ctx!.lineTo(beamX + w * 0.34, h);
      ctx!.lineTo(beamX - w * 0.06, h);
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();

      // --- rising embers
      ctx!.save();
      ctx!.globalCompositeOperation = "screen";
      for (const e of embers) {
        e.y -= e.vy * dt;
        e.x += e.vx * dt + Math.sin((e.y + t * 20) * 0.01) * 0.15;
        e.tw += e.tws * dt;
        if (e.y < -10) {
          e.y = h + rand(4, 40);
          e.x = Math.random() * w;
        }
        if (e.x < -10) e.x = w + 10;
        if (e.x > w + 10) e.x = -10;

        const twinkle = 0.55 + Math.sin(e.tw) * 0.45;
        const alpha = e.a * twinkle;
        const color = e.hue === 0 ? BRAND : "255, 255, 255";

        const rg = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
        rg.addColorStop(0, `rgba(${color}, ${alpha})`);
        rg.addColorStop(1, `rgba(${color}, 0)`);
        ctx!.fillStyle = rg;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();
    }

    // Reduced motion: draw one static frame, no loop.
    if (reduce) {
      resize();
      // single soft pass
      for (const e of embers) {
        ctx.fillStyle = `rgba(${BRAND}, ${e.a * 0.5})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      const onResizeStatic = () => resize();
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    resize();
    raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Pause when the hero is off-screen to save battery/CPU.
    const io = new IntersectionObserver(
      (entries) => {
        running = entries[0]?.isIntersecting ?? true;
        last = performance.now();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      running = !document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
