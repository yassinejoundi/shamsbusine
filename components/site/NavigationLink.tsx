"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavigationLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function NavigationLink({ href, ...props }: NavigationLinkProps) {
  const pathname = usePathname();
  const current = !href.includes("#") && (pathname.replace(/\/$/, "") || "/") === (href.replace(/\/$/, "") || "/");

  return <Link {...props} href={href} aria-current={current ? "page" : undefined} />;
}
