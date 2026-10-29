"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sectionMotion = {
  hero: { selector: "[data-hero]", from: 0.68, duration: 0.55, stagger: 0.06, interval: 0.06, start: "clamp(top 94%)" },
  work: { selector: "[data-reveal]", from: 0.7, duration: 0.55, stagger: 0.08, interval: 0.08, start: "clamp(top 88%)" },
  services: { selector: "[data-reveal]", from: 0.74, duration: 0.48, stagger: 0.05, interval: 0.06, start: "clamp(top 88%)" },
  process: { selector: "[data-reveal]", from: 0.68, duration: 0.52, stagger: 0.07, interval: 0.08, start: "clamp(top 86%)" },
  company: { selector: "[data-reveal]", from: 0.66, duration: 0.54, stagger: 0.06, interval: 0.08, start: "clamp(top 88%)" },
  questions: { selector: "[data-reveal]", from: 0.72, duration: 0.48, stagger: 0.05, interval: 0.06, start: "clamp(top 88%)" },
  quote: { selector: "[data-reveal]", from: 0.74, duration: 0.5, stagger: 0.05, interval: 0.06, start: "clamp(top 88%)" },
} as const;

type SectionName = keyof typeof sectionMotion;

export function HomeScrollAnimations() {
  useGSAP(() => {
    const main = document.getElementById("contenu");
    if (!main) return;

    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-motion-section]", main);

      sections.forEach((section) => {
        const name = section.dataset.motionSection as SectionName;
        const config = sectionMotion[name];
        if (!config) return;

        const targets = gsap.utils.toArray<HTMLElement>(config.selector, section);
        if (!targets.length) return;

        ScrollTrigger.batch(targets, {
          start: config.start,
          once: true,
          interval: config.interval,
          onEnter: (batch) => gsap.fromTo(batch, { opacity: config.from }, {
            opacity: 1,
            duration: config.duration,
            stagger: config.stagger,
            ease: "power2.out",
            clearProps: "opacity",
          }),
        });
      });

      const observer = new ResizeObserver(() => ScrollTrigger.refresh(true));
      observer.observe(main);
      return () => observer.disconnect();
    });

    return () => motion.revert();
  });

  return null;
}
