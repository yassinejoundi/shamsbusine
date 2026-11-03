"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!targets.length || reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const pending = new Set<HTMLElement>();
    const reveal = (target: HTMLElement) => {
      pending.delete(target);
      target.dataset.revealState = "visible";
      observer.unobserve(target);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
    const observe = (target: HTMLElement) => {
      if (target.dataset.revealState) return;
      target.dataset.revealState = "pending";
      pending.add(target);
      observer.observe(target);
    };
    const revealPassed = () => {
      for (const target of pending) {
        if (target.getBoundingClientRect().bottom < 0) reveal(target);
      }
    };
    const additions = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches("[data-reveal]")) observe(node as HTMLElement);
          node.querySelectorAll<HTMLElement>("[data-reveal]").forEach(observe);
        }
      }
    });

    targets.forEach(observe);
    additions.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", revealPassed, { passive: true });
    window.addEventListener("resize", revealPassed);

    const showAll = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      observer.disconnect();
      additions.disconnect();
      pending.clear();
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
        target.dataset.revealState = "visible";
      });
    };
    reducedMotion.addEventListener("change", showAll);

    return () => {
      observer.disconnect();
      additions.disconnect();
      window.removeEventListener("scroll", revealPassed);
      window.removeEventListener("resize", revealPassed);
      reducedMotion.removeEventListener("change", showAll);
    };
  }, [pathname]);

  return null;
}
