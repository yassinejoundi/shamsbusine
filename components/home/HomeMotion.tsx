"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current).forEach((element, index) => {
        gsap.from(element, {
          opacity: 0.35,
          immediateRender: false,
          duration: element.classList.contains("hero-figure") ? 0.75 : 0.5,
          delay: index < 5 ? index * 0.06 : 0,
          ease: "power1.out",
          clearProps: "opacity",
          scrollTrigger: { trigger: element, start: "top 96%", once: true },
        });
      });

      // Disclosures and font loading change the positions of later sections.
      const observer = new ResizeObserver(() => ScrollTrigger.refresh(true));
      if (scope.current) observer.observe(scope.current);
      return () => observer.disconnect();
    });
    return () => media.revert();
  }, { scope });

  return <div ref={scope}>{children}</div>;
}
