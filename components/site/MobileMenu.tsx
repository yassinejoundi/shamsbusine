"use client";

import { useRef } from "react";
import { navigation } from "@/lib/site";
import { NavigationLink } from "./NavigationLink";

export function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (!menu.current?.open) return;
    menu.current.open = false;
    menu.current.querySelector("summary")?.focus();
  }

  return (
    <details className="mobile-menu" ref={menu} onKeyDown={(event) => {
      if (event.key === "Escape") closeMenu();
    }}>
      <summary>Menu <span className="mobile-menu-icon" aria-hidden="true"><span /><span /></span></summary>
      <nav aria-label="Navigation mobile">
        {navigation.map(({ href, label }) => (
          <NavigationLink key={href} href={href} onClick={() => closeMenu()}>{label}</NavigationLink>
        ))}
      </nav>
    </details>
  );
}
