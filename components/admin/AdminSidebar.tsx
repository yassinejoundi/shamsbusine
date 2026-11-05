"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

const adminLinks = [
  { href: "/admin/pages", label: "Contenu du site" },
  { href: "/admin/devis", label: "Demandes de devis" },
];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link className="admin-brand" href="/admin/pages">
          <Image src="/images/shamsbusine-logo.png" alt="Shams Busine" width={144} height={54} sizes="144px" priority />
          <span>Espace de gestion</span>
        </Link>
        <AdminSignOutButton />
      </div>
      <Suspense fallback={<AdminNavigationFallback />}>
        <AdminNavigation />
      </Suspense>
    </aside>
  );
}

function AdminNavigation() {
  const pathname = usePathname();
  const activePath = pathname ?? "";

  return (
    <nav className="admin-nav" aria-label="Administration">
      <ul className="admin-nav-list">
        {adminLinks.map((item) => {
          const current = activePath === item.href || activePath.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link className="admin-nav-link" href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function AdminNavigationFallback() {
  return (
    <nav className="admin-nav" aria-label="Administration">
      <ul className="admin-nav-list">
        {adminLinks.map((item) => (
          <li key={item.href}>
            <Link className="admin-nav-link" href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
