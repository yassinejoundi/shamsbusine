"use client";

import { useRef, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DisclosureIcon } from "@/components/site/DisclosureIcon";

gsap.registerPlugin(useGSAP);

type Question = {
  question: string;
  answer: string;
};

export function QuestionsAccordion({ questions }: { questions: Question[] }) {
  const list = useRef<HTMLDivElement>(null);
  const targetOpen = useRef(new WeakMap<HTMLDetailsElement, boolean>());
  const { contextSafe } = useGSAP({ scope: list });

  const toggleQuestion = (event: MouseEvent<HTMLElement>) => {
    contextSafe(() => {
      const summary = event.currentTarget;
      const details = summary.parentElement;
      const answer = summary.nextElementSibling;

      if (!(details instanceof HTMLDetailsElement) || !(answer instanceof HTMLElement)) return;

      const isTargetOpen = targetOpen.current.get(details) ?? details.open;
      const willOpen = !isTargetOpen;
      const isClosing = details.open && !isTargetOpen;
      event.preventDefault();
      targetOpen.current.set(details, willOpen);
      gsap.killTweensOf(answer);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        details.open = willOpen;
        gsap.set(answer, { clearProps: "height,opacity,overflow" });
        return;
      }

      if (willOpen) {
        details.open = true;
        const animation = {
          height: "auto",
          opacity: 1,
          duration: 0.36,
          ease: "power2.out",
          clearProps: "height,opacity,overflow",
        };

        if (isClosing) {
          gsap.to(answer, animation);
        } else {
          gsap.fromTo(answer, { height: 0, opacity: 0, overflow: "hidden" }, animation);
        }
        return;
      }

      gsap.to(answer, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          if (targetOpen.current.get(details) !== false) return;
          details.open = false;
          gsap.set(answer, { clearProps: "height,opacity,overflow" });
        },
      });
    })();
  };

  return (
    <div className="faq-list" ref={list}>
      {questions.map(({ question, answer }) => (
        <details key={question} data-reveal>
          <summary onClick={toggleQuestion}>{question}<DisclosureIcon /></summary>
          <div className="faq-answer"><p>{answer}</p></div>
        </details>
      ))}
    </div>
  );
}
