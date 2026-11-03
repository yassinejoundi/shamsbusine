"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const moveFrames: Keyframe[] = [
  { opacity: 0, transform: "translate3d(var(--reveal-x), var(--reveal-y), 0)" },
  { opacity: 1, transform: "translate3d(0, 0, 0)" },
];
const revealFrames: Record<string, Keyframe[]> = {
  left: moveFrames,
  right: moveFrames,
  up: moveFrames,
  type: [
    { opacity: 0, clipPath: "inset(0 0 100%)", transform: "translateY(.16em)" },
    { opacity: 1, clipPath: "inset(0)", transform: "translateY(0)" },
  ],
  "wipe-left": [
    { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    { opacity: 1, clipPath: "inset(0)" },
  ],
  "wipe-right": [
    { opacity: 0, clipPath: "inset(0 0 0 100%)" },
    { opacity: 1, clipPath: "inset(0)" },
  ],
};

export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!targets.length || reducedMotion.matches || !("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") return;

    const pending = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    const reveal = (target: HTMLElement) => {
      pending.delete(target);
      const animation = animations.get(target);
      if (animation && animation.playState !== "finished") animation.play();
      observer.unobserve(target);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
    const observe = (target: HTMLElement) => {
      if (animations.has(target)) return;
      const direction = target.dataset.reveal;
      const frames = direction ? revealFrames[direction] : undefined;
      if (!direction || !frames) return;
      const duration = direction === "type" ? 800 : direction.startsWith("wipe-") ? 850 : 720;
      const delay = Math.max(0, Math.min(3, Number(target.dataset.revealDelay) || 0)) * 90;
      const easing = direction.startsWith("wipe-") ? "cubic-bezier(.65, 0, .35, 1)" : "cubic-bezier(.2, .75, .2, 1)";
      const animation = target.animate(frames, { duration, delay, easing, fill: "both" });
      animation.pause();
      animation.currentTime = 0;
      animations.set(target, animation);
      pending.add(target);
      observer.observe(target);
    };
    const revealPassed = () => {
      for (const target of pending) {
        if (target.getBoundingClientRect().bottom < 0) {
          animations.get(target)?.finish();
          pending.delete(target);
          observer.unobserve(target);
        }
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
    revealPassed();

    const showAll = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      observer.disconnect();
      additions.disconnect();
      animations.forEach((animation) => animation.finish());
      pending.clear();
    };
    reducedMotion.addEventListener("change", showAll);

    return () => {
      observer.disconnect();
      additions.disconnect();
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener("scroll", revealPassed);
      window.removeEventListener("resize", revealPassed);
      reducedMotion.removeEventListener("change", showAll);
    };
  }, [pathname]);

  return null;
}
