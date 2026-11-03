import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { contact } from "@/lib/site";

export function ContactHero() {
  return (
    <section className="contact-hero frame" aria-labelledby="contact-title">
      <div className="contact-hero-heading">
        <h1 id="contact-title"><span data-reveal="type">Votre projet</span><span data-reveal="type" data-reveal-delay="1">commence ici.</span></h1>
      </div>
      <div className="contact-hero-content">
        <div className="contact-hero-copy" data-reveal="left">
          <p className="contact-hero-lead">Une idée, un terrain, un espace à transformer&nbsp;?</p>
          <p>Racontez-nous votre projet de construction ou de rénovation. Nous prendrons le temps d’en comprendre le cadre avant de parler travaux.</p>
          <Link href="#devis" className="button">Parler de mon projet <Arrow /></Link>
          <div className="contact-direct-links">
            <a href={contact.phoneHref}>Appeler · {contact.phone}</a>
            <a href={`mailto:${contact.email}`}>Écrire · {contact.email}</a>
          </div>
        </div>
        <div className="contact-hero-visuals">
          <figure className="contact-hero-photo contact-hero-photo-facade" data-reveal="wipe-right">
            <div className="contact-hero-photo-frame photo">
              <Image src="/images/contact-villa-facade.webp" alt="Façade aux tons ocre et pierre claire, ouverte sur le jardin" fill sizes="(max-width: 699px) 60vw, (max-width: 1099px) 42vw, 36vw" preload />
            </div>
            <figcaption>Façade ocre</figcaption>
          </figure>
          <figure className="contact-hero-photo contact-hero-photo-pool" data-reveal="wipe-left" data-reveal-delay="1">
            <div className="contact-hero-photo-frame photo">
              <Image src="/images/contact-villa-piscine.webp" alt="Bassin extérieur bordé par la villa et ses plantations" fill sizes="(max-width: 699px) 40vw, (max-width: 1099px) 25vw, 20vw" />
            </div>
            <figcaption>Terrasse &amp; bassin</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
