"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Arrow } from "@/components/site/Arrow";

export function EntrepriseHero() {
  const scope = useRef<HTMLElement>(null);
  const moveLayers = useRef<((x: number, y: number) => void) | null>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const section = scope.current;
      if (!section) return;

      const mainFrame = section.querySelector<HTMLElement>("[data-hero-main]");
      const mainImage = mainFrame?.querySelector("img");

      if (mainFrame && mainImage) {
        gsap.fromTo(mainFrame, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0)",
          duration: 1.05,
          delay: 0.12,
          ease: "power3.inOut",
          clearProps: "clipPath",
        });
        gsap.fromTo(mainImage, { scale: 1.1 }, {
          scale: 1,
          duration: 1.15,
          delay: 0.12,
          ease: "power2.out",
          clearProps: "scale",
        });
      }

      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", section).flatMap((frame) => {
        const image = frame.querySelector("img");
        return image ? [{ image, depth: Number(frame.dataset.depth) }] : [];
      });
      const movers = layers.map(({ image, depth }) => ({
        x: gsap.quickTo(image, "x", { duration: 0.45, ease: "power2.out" }),
        y: gsap.quickTo(image, "y", { duration: 0.45, ease: "power2.out" }),
        depth,
      }));

      moveLayers.current = (x, y) => movers.forEach(({ x: moveX, y: moveY, depth }) => {
        moveX(x * depth * 7);
        moveY(y * depth * 7);
      });

      return () => { moveLayers.current = null; };
    });

    return () => media.revert();
  }, { scope });

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    moveLayers.current?.(x, y);
  }

  return (
    <section
      ref={scope}
      className="entreprise-hero frame"
      aria-labelledby="entreprise-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => moveLayers.current?.(0, 0)}
    >
      <h1 id="entreprise-title" data-hero>
        Du gros œuvre <span>aux finitions.</span>
      </h1>
      <div className="entreprise-hero-copy">
        <p data-hero>À Marrakech, Shams Busine accompagne les projets résidentiels, commerciaux et professionnels, de l’étude à la réception des travaux.</p>
        <Link className="button" href="/contact/#devis" data-hero>
          Demander un devis <Arrow />
        </Link>
      </div>
      <div className="entreprise-hero-visuals">
        <figure className="entreprise-hero-main" data-hero-main>
          <div className="photo entreprise-hero-photo" data-depth="1">
            <Image
              src="/images/chantier-maconnerie.webp"
              alt="Bâtiment en cours de maçonnerie, avec une grue de chantier à proximité."
              fill
              preload
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 68vw, 66vw"
            />
          </div>
          <figcaption>Maçonnerie en cours</figcaption>
        </figure>
        <div className="entreprise-hero-details">
          <figure className="entreprise-hero-detail" data-reveal>
            <div className="photo entreprise-hero-detail-photo" data-depth="0.65">
              <Image
                src="/images/chantier-structure.webp"
                alt="Structure en béton en cours de réalisation, entourée d’échafaudages."
                fill
                sizes="(max-width: 699px) 46vw, (max-width: 1099px) 23vw, 20vw"
              />
            </div>
            <figcaption>Structure et mise en œuvre</figcaption>
          </figure>
          <figure className="entreprise-hero-materials" data-reveal aria-hidden="true">
            <div className="photo entreprise-hero-material-photo" data-depth="0.4">
              <Image
                src="/images/materials-study.webp"
                alt=""
                fill
                sizes="(max-width: 699px) 46vw, (max-width: 1099px) 20vw, 17vw"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
