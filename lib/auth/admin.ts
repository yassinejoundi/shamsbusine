import "server-only";
import { redirect } from "next/navigation";
import { auth, authForServerComponents } from "./server";

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

export async function getAdminSessionForRender(): Promise<AuthUser | null> {
  const { data } = await authForServerComponents.getSession();
  return data?.user ? data.user as AuthUser : null;
}

export function requireAdmin() {
  return requireAdminWith(getAdminSession);
}

export function requireAdminForRender() {
  return requireAdminWith(getAdminSessionForRender);
}

async function requireAdminWith(getSession: () => Promise<AuthUser | null>) {
  const user = await getSession();
  if (!user) redirect("/admin");
  if (!isAdmin(user)) redirect("/admin?access=denied");
  return user;
}
