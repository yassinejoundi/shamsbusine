"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navigation } from "@/lib/site";
import { Arrow } from "./Arrow";

export function SiteNavbar() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);

  function closeMenu(restoreFocus = false) {
    if (!menu.current?.open) return;
    menu.current.open = false;
    if (restoreFocus) menu.current.querySelector("summary")?.focus();
  }

  const links = navigation.map(({ href, label }) => (
    <Link key={href} href={href} aria-current={href === pathname ? "page" : undefined} onClick={() => closeMenu()}>
      {label}
    </Link>
  ));

  return (
    <header className="site-header frame">
      <Link href="/" className="brand" aria-label="Shams Busine, accueil">
        <Image src="/images/shamsbusine-logo.png" width={106} height={88} alt="" />
      </Link>
      <nav className="desktop-nav" aria-label="Navigation principale">{links}</nav>
      <div className="header-actions">
        <Link href="/#devis" className="button header-quote">Demander un devis <Arrow /></Link>
        <details className="mobile-menu" ref={menu} onKeyDown={(event) => {
          if (event.key === "Escape") closeMenu(true);
        }}>
          <summary>Menu <span className="menu-glyph" aria-hidden="true" /></summary>
          <nav aria-label="Navigation mobile">{links}</nav>
        </details>
      </div>
    </header>
  );
}
