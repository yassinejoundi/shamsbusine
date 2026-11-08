import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { defaultSiteSettings, getSiteSettings, type SiteSettings } from "@/lib/site-settings";

export async function SiteFooter() {
  return <SiteFooterContent settings={await getSiteSettings()} />;
}

export function SiteFooterFallback() {
  return <SiteFooterContent settings={defaultSiteSettings} />;
}

function SiteFooterContent({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="site-footer">
      <div className="frame">
        <p className="footer-signature">Shams Busine.</p>
        <div className="footer-main">
          <div className="footer-identity">
            <Link href="/" className="footer-logo" aria-label="Shams Busine, accueil">
              <Image src={settings.logo} width={106} height={88} alt="" />
            </Link>
            <p>Construction & rénovation.<br />Marrakech, Maroc.</p>
          </div>
          <nav aria-label="Navigation de pied de page">
            {navigation.slice(1).map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <div className="footer-contact">
            <Link className="text-link" href="/contact/#devis">Votre prochain projet</Link>
            <a href={settings.phoneHref}>{settings.phoneDisplay}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            {settings.address && <address>{settings.address}</address>}
            {settings.socialLinks.length > 0 && <nav className="footer-social" aria-label="Réseaux sociaux">
              <ul>{settings.socialLinks.map(({ href, label }, index) => <li key={`${href}-${index}`}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (ouvre dans un nouvel onglet)`}>{label}</a></li>)}</ul>
            </nav>}
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 Shams Busine</p><a href="#contenu">Revenir en haut <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
