import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/lib/site";
import { Arrow } from "./Arrow";
import { MobileMenu } from "./MobileMenu";

export function SiteNavbar() {
  return (
    <header className="site-header frame">
      <Link href="/" className="brand" aria-label="Shams Busine, accueil" aria-current="page">
        <Image src="/images/shamsbusine-logo.png" width={106} height={88} alt="" />
      </Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {navigation.slice(1).map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/#devis" className="header-quote">Demander un devis <Arrow /></Link>
        <MobileMenu />
      </div>
    </header>
  );
}
