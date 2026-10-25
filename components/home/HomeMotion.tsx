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
      gsap.from("[data-hero]", {
        opacity: 0.65,
        duration: 0.65,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "opacity",
      });

      gsap.utils.toArray<HTMLElement>("section", scope.current).forEach((section) => {
        const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]", section);
        elements.forEach((element, index) => {
          const isPhoto = element.matches("figure, .photo") || element.classList.contains("questions-image");
          gsap.from(element, {
            opacity: isPhoto ? 0.45 : 0.7,
            immediateRender: false,
            duration: isPhoto ? 0.75 : 0.45,
            delay: (index % 3) * 0.06,
            ease: "power2.out",
            clearProps: "opacity",
            scrollTrigger: { trigger: element, start: "top 95%", once: true },
          });
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
