import "server-only";
import { headers } from "next/headers";
import { createAuthServer, extractNeonAuthCookies } from "@neon/auth/server";
import { createNeonAuth } from "@neon/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl || !cookieSecret) {
  throw new Error("NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be configured.");
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: { secret: cookieSecret },
});

export const authForServerComponents = createAuthServer({
  baseUrl,
  cookieSecret,
  context: async () => {
    const requestHeaders = await headers();
    return {
      getCookies: () => extractNeonAuthCookies(requestHeaders),
      // Server Components cannot persist refreshed cookies.
      setCookie: () => {},
      getHeader: (name) => requestHeaders.get(name),
      getOrigin: () => requestHeaders.get("origin")
        || requestHeaders.get("referer")?.split("/").slice(0, 3).join("/")
        || "",
      getFramework: () => "nextjs",
    };
  },
});
