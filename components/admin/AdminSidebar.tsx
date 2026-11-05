"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useCallback, type MouseEvent } from "react";
import { cmsPages } from "@/lib/cms/schema";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { useAdminUnsavedChanges } from "@/components/admin/AdminUnsavedChangesProvider";

export function AdminSidebar() {
  const router = useRouter();
  const { requestNavigation } = useAdminUnsavedChanges();
  const handleNavigation = useCallback((event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.currentTarget.target === "_blank") return;
    event.preventDefault();
    requestNavigation(() => router.push(href));
  }, [requestNavigation, router]);

  return (
    <aside className="admin-sidebar">
      <header className="admin-sidebar-header">
        <Link className="admin-brand" href="/admin/pages" onClick={(event) => handleNavigation(event, "/admin/pages")}>
          <Image src="/images/shamsbusine-logo.png" alt="Shams Busine" width={144} height={54} sizes="144px" priority />
          <span>Espace de gestion</span>
        </Link>
      </header>
      <Suspense fallback={<AdminNavigationFallback />}>
        <AdminNavigation onNavigate={handleNavigation} />
      </Suspense>
      <div className="admin-sidebar-actions">
        <Link className="admin-sidebar-action admin-go-site" href="/" onClick={(event) => handleNavigation(event, "/")}>
          <SiteIcon />
          <span>Voir le site</span>
        </Link>
        <AdminSignOutButton />
      </div>
    </aside>
  );
}

function AdminNavigation({ onNavigate }: { onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void }) {
  const pathname = usePathname();
  const activePath = pathname ?? "";
  const contentPageActive = activePath === "/admin/pages";

  return (
    <nav className="admin-nav" aria-label="Administration">
      <ul className="admin-nav-list">
        <li className="admin-nav-group">
          <Link
            className={`admin-nav-link${activePath.startsWith("/admin/pages") ? " is-section-active" : ""}`}
            href="/admin/pages"
            aria-current={contentPageActive ? "page" : undefined}
            onClick={(event) => onNavigate(event, "/admin/pages")}
          >
            Contenu du site
          </Link>
          <ul className="admin-subnav">
            {cmsPages.map((page) => {
              const href = `/admin/pages/${page.slug}`;
              const current = activePath === href;
              return (
                <li key={page.slug}>
                  <Link className="admin-subnav-link" href={href} aria-current={current ? "page" : undefined} onClick={(event) => onNavigate(event, href)}>
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <Link className="admin-nav-link" href="/admin/devis" aria-current={activePath.startsWith("/admin/devis") ? "page" : undefined} onClick={(event) => onNavigate(event, "/admin/devis")}>
            Demandes de devis
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function AdminNavigationFallback() {
  return (
    <nav className="admin-nav" aria-label="Administration">
      <ul className="admin-nav-list">
        <li className="admin-nav-group">
          <Link className="admin-nav-link" href="/admin/pages">Contenu du site</Link>
          <ul className="admin-subnav">
            {cmsPages.map((page) => (
              <li key={page.slug}>
                <Link className="admin-subnav-link" href={`/admin/pages/${page.slug}`}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li><Link className="admin-nav-link" href="/admin/devis">Demandes de devis</Link></li>
      </ul>
    </nav>
  );
}

function SiteIcon() {
  return (
    <svg className="admin-action-icon" aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none">
      <path d="M11.5 3.5h5v5m-.25-4.75-7 7M15 10.5v5a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
