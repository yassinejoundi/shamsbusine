"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function AdminSignOutButton() {
  const router = useRouter();

  return (
    <button className="text-link admin-sign-out" type="button" onClick={async () => {
      await authClient.signOut();
      router.replace("/admin/sign-in");
      router.refresh();
    }}>
      Se déconnecter
    </button>
  );
}
