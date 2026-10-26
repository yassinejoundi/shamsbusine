import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/lib/site";
import { Arrow } from "./Arrow";
import { MobileMenu } from "./MobileMenu";
import { NavigationLink } from "./NavigationLink";

export function SiteNavbar() {
  return (
    <header className="site-header frame">
      <NavigationLink href="/" className="brand" aria-label="Shams Busine, accueil">
        <Image src="/images/shamsbusine-logo.png" width={106} height={88} alt="" />
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
