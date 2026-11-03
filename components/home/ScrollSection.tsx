"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type MotionName = "hero" | "work" | "services" | "process" | "company" | "questions" | "quote";
type TransformVars = { x?: number; y?: number; scale?: number };

type ScrollSectionProps = {
  animation: MotionName;
  children: ReactNode;
  className: string;
  id?: string;
  "aria-labelledby": string;
};

const motion = {
  hero: { start: "top 82%", duration: 0.9, stagger: 0.09, distance: 46 },
  work: { start: "top 86%", duration: 0.85, stagger: 0.085, distance: 38 },
  services: { start: "top 88%", duration: 0.8, stagger: 0.07, distance: 32 },
  process: { start: "top 86%", duration: 0.9, stagger: 0.085, distance: 38 },
  company: { start: "top 86%", duration: 0.95, stagger: 0.09, distance: 40 },
  questions: { start: "top 88%", duration: 0.8, stagger: 0.07, distance: 30 },
  quote: { start: "top 90%", duration: 0.75, stagger: 0.065, distance: 28 },
} satisfies Record<MotionName, { start: string; duration: number; stagger: number; distance: number }>;

function initialTransform(section: MotionName, target: HTMLElement, index: number, distance: number): TransformVars {
  const side = index % 2 === 0 ? -1 : 1;

  if (target.dataset.scrollItem === "image") {
    const scale = section === "work" ? 1.075 : section === "hero" ? 1.06 : 1.045;
    return { y: distance * 0.65, scale };
  }

  if (target.matches("h1 > span, h2, h3")) {
    if (section === "hero" || section === "services" || section === "quote") return { y: distance };
    return { x: section === "company" ? distance : -distance };
  }

  if (target.matches("summary")) return { x: -distance * 0.55 };
  if (target.dataset.scrollItem === "answer") return { y: distance * 0.45 };
  if (target.closest("figcaption")) return { x: side * distance * 0.35, y: 8 };

  if (target.matches("input, select, textarea, button, .form-select-arrow")) {
    return section === "quote" ? { y: distance * 0.55 } : { y: distance * 0.5 };
  }

  if (section === "hero" || section === "services" || section === "quote") return { y: distance * 0.72 };
  return { x: section === "company" ? distance * 0.72 : -distance * 0.72 };
}

export function ScrollSection({
  animation,
  children,
  className,
  id,
  "aria-labelledby": labelledBy,
}: ScrollSectionProps) {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = section.current;
    if (!element) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const profile = motion[animation];
      const targets = gsap.utils.toArray<HTMLElement>("[data-scroll-item]", element);

      if (targets.length) {
        ScrollTrigger.batch(targets, {
          start: profile.start,
          once: true,
          onEnter: (batch) => {
            const timeline = gsap.timeline();

            batch.forEach((target, index) => {
              const item = target as HTMLElement;
              timeline.fromTo(item, initialTransform(animation, item, index, profile.distance), {
                x: 0,
                y: 0,
                scale: 1,
                duration: profile.duration,
                ease: "power3.out",
                clearProps: "transform",
              }, index * profile.stagger);
            });
          },
        });
      }

      let refreshTimer: number | undefined;
      const observer = new ResizeObserver(() => {
        if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(true), 120);
      });
      observer.observe(element);

      return () => {
        observer.disconnect();
        if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
      };
    });

    return () => media.revert();
  }, { scope: section });

  return (
    <section
      ref={section}
      className={className}
      id={id}
      data-motion-section={animation}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}
