import "server-only";
import { redirect } from "next/navigation";
import { auth } from "./server";

type AuthUser = NonNullable<NonNullable<Awaited<ReturnType<typeof auth.getSession>>["data"]>["user"]> & {
  role?: string | string[];
};

export function isAdmin(user: AuthUser) {
  return user.role === "admin" || (Array.isArray(user.role) && user.role.includes("admin"));
}

export async function getAdminSession(): Promise<AuthUser | null> {
  const { data } = await auth.getSession();
  return data?.user ? data.user as AuthUser : null;
}

export async function requireAdmin() {
  const user = await getAdminSession();
  if (!user) redirect("/admin");
  if (!isAdmin(user)) redirect("/admin?access=denied");
  return user;
}
