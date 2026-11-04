import "server-only";
import { neon } from "@neondatabase/serverless";

export function getNeonDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");
  return neon(url);
}
