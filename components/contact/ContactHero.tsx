import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { contact } from "@/lib/site";

export function ContactHero() {
  return (
    <section className="contact-hero frame" aria-labelledby="contact-title">
      <h1 id="contact-title" data-hero>Parlons de votre projet.</h1>
      <div className="contact-hero-copy">
        <p data-hero>Construction et rénovation à Marrakech. Décrivez les travaux envisagés et la ville du chantier pour préparer un premier échange.</p>
        <Link href="#devis" className="button" data-hero>Décrire mon projet <Arrow /></Link>
        <div className="contact-direct-links" data-hero>
          <a href={contact.phoneHref}>Appeler · {contact.phone}</a>
          <a href={`mailto:${contact.email}`}>Écrire · {contact.email}</a>
        </div>
      </div>
      <div className="contact-gallery" role="group" aria-label="Vues de chantiers et d’aménagements réalisés par Shams Busine">
        <figure className="photo contact-photo contact-photo-main" data-photo-motion data-hero>
          <Image src="/images/chantier-maconnerie.webp" alt="Structure en briques et béton en cours de construction" fill sizes="(max-width: 699px) 100vw, (max-width: 899px) 92vw, 42vw" preload />
        </figure>
        <figure className="photo contact-photo contact-photo-structure" data-reveal>
          <Image src="/images/chantier-structure.webp" alt="Structure de béton et échafaudages sur un chantier en cours" fill sizes="(max-width: 699px) 50vw, (max-width: 899px) 30vw, 18vw" />
        </figure>
        <figure className="photo contact-photo contact-photo-detail" data-reveal>
          <Image src="/images/detail-finitions.webp" alt="Bassin extérieur en pierre, avec un détail de menuiserie en bois" fill sizes="(max-width: 699px) 50vw, (max-width: 899px) 30vw, 18vw" />
        </figure>
        <figure className="photo contact-photo contact-photo-interior" data-reveal>
          <Image src="/images/escalier-interieur.webp" alt="Intérieur lumineux avec de grandes ouvertures sur un jardin" fill sizes="(max-width: 699px) 50vw, (max-width: 899px) 30vw, 18vw" />
        </figure>
      </div>
    </section>
  );
}
