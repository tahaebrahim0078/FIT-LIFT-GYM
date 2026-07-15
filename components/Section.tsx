"use client";

import { ReactNode } from "react";

export function SectionHead({
  tag,
  title,
  center,
}: {
  tag: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`reveal mb-14 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="section-tag">{tag}</span>
      <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold uppercase leading-[1.05]">
        {title}
      </h2>
    </div>
  );
}

export function Reveal({
  children,
  kind = "up",
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  kind?: "up" | "left" | "right" | "scale" | "flyL" | "flyR";
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag className={`reveal ${className}`} data-reveal={kind}>
      {children}
    </Tag>
  );
}
