"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent } from "react";
import { useAdminUnsavedChanges } from "@/components/admin/AdminUnsavedChangesProvider";

type BreadcrumbItem = { label: string; href?: string; current?: boolean };

export function AdminBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const router = useRouter();
  const { requestNavigation } = useAdminUnsavedChanges();

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    requestNavigation(() => router.push(href));
  }

  return (
    <nav className="admin-breadcrumb" aria-label="Fil d’Ariane">
      <ol>
        {items.map((item) => (
          <li key={item.label} aria-current={item.current ? "page" : undefined}>
            {item.href ? <Link href={item.href} onClick={(event) => navigate(event, item.href!)}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
