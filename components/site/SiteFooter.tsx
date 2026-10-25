import Image from "next/image";
import Link from "next/link";
import { contact, navigation } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Arrow } from "./Arrow";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="frame">
        <div className="footer-top">
          <Link href="/" className="footer-logo" aria-label="Shams Busine, accueil">
            <Image src="/images/shamsbusine-logo.png" width={106} height={88} alt="" />
          </Link>
          <p>Construction & rénovation.<br />Marrakech, Maroc.</p>
          <nav aria-label="Navigation de pied de page">
            {navigation.slice(1).map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <div className="footer-contact">
            <Link className="text-link footer-quote" href="/#devis">Parlons de votre projet <Arrow /></Link>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <p className="footer-signature">Shams Busine.</p>
        <div className="footer-bottom"><p>© 2026 Shams Busine</p><a href="#contenu">Revenir en haut <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
