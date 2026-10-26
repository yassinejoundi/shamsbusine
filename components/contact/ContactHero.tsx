import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { contact } from "@/lib/site";

export function ContactHero() {
  return (
    <section className="contact-hero frame" aria-labelledby="contact-title">
      <div className="contact-hero-heading">
        <h1 id="contact-title"><span data-hero>Votre projet</span><span data-hero>commence ici.</span></h1>
      </div>
      <div className="contact-hero-content">
        <div className="contact-hero-copy">
          <p className="contact-hero-lead" data-hero>Une idée, un terrain, un espace à transformer&nbsp;?</p>
          <p data-hero>Racontez-nous votre projet de construction ou de rénovation. Nous prendrons le temps d’en comprendre le cadre avant de parler travaux.</p>
          <Link href="#devis" className="button" data-hero>Parler de mon projet <Arrow /></Link>
          <div className="contact-direct-links" data-hero>
            <a href={contact.phoneHref}>Appeler · {contact.phone}</a>
            <a href={`mailto:${contact.email}`}>Écrire · {contact.email}</a>
          </div>
        </div>
        <div className="contact-hero-visuals">
          <figure className="contact-hero-site photo" data-hero data-photo-motion>
            <Image src="/images/chantier-maconnerie.webp" alt="Maçonnerie en briques et structure en béton sur un chantier Shams Busine" fill sizes="(max-width: 699px) 100vw, (max-width: 1099px) 65vw, 55vw" preload />
            <figcaption>Du premier échange au chantier.</figcaption>
          </figure>
          <figure className="contact-hero-materials photo" data-hero>
            <Image src="/images/contact-materials.webp" alt="Étude d’ambiance : papier de plan, pierre, brique et crayon dans la lumière" fill sizes="(max-width: 699px) 38vw, 20vw" />
          </figure>
        </div>
      </div>
    </section>
  );
}
