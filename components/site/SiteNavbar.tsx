import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/lib/site";
import { Arrow } from "./Arrow";
import { MobileMenu } from "./MobileMenu";
import { NavigationLink } from "./NavigationLink";
import { getCloudinaryImage } from "@/lib/cms/content";

export function SiteNavbar() {
  return (
    <header className="site-header frame">
      <NavigationLink href="/" className="brand" aria-label="Shams Busine, accueil">
        <Image src={getCloudinaryImage("shared/shamsbusine-logo")} width={106} height={88} alt="" />
      </NavigationLink>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {navigation.slice(1).map(({ href, label }) => <NavigationLink key={href} href={href}>{label}</NavigationLink>)}
      </nav>
      <div className="header-actions">
        <Link href="/contact/#devis" className="header-quote">Demander un devis <Arrow /></Link>
        <MobileMenu />
      </div>
    </header>
  );
}

export function SiteNavbarFallback() {
  return (
    <header className="site-header frame">
      <Link href="/" className="brand" aria-label="Shams Busine, accueil">
        <Image src={getCloudinaryImage("shared/shamsbusine-logo")} width={106} height={88} alt="" />
      </Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {navigation.slice(1).map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/contact/#devis" className="header-quote">Demander un devis <Arrow /></Link>
        <details className="mobile-menu">
          <summary>Menu <span className="mobile-menu-icon" aria-hidden="true"><span /><span /></span></summary>
          <nav aria-label="Navigation mobile">
            {navigation.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
