"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function AdminSignOutButton() {
  const router = useRouter();

  return (
    <button className="admin-sidebar-action admin-sign-out" type="button" onClick={async () => {
      await authClient.signOut();
      router.replace("/admin/sign-in");
      router.refresh();
    }}>
      <svg className="admin-action-icon" aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none">
        <path d="M8 4.5H4.5v11H8m3-8 3 3-3 3m3-3H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Se déconnecter</span>
    </button>
  );
}
