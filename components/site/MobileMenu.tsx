"use client";

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
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
      <summary>Menu <FontAwesomeIcon icon={faBars} className="when-closed" aria-hidden="true" /><FontAwesomeIcon icon={faXmark} className="when-open" aria-hidden="true" /></summary>
      <nav aria-label="Navigation mobile">
        {navigation.map(({ href, label }) => (
          <NavigationLink key={href} href={href} onClick={() => closeMenu()}>{label}</NavigationLink>
        ))}
      </nav>
    </details>
  );
}
