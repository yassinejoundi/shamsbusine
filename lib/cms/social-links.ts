export type CmsSocialLink = { label: string; href: string };

const maxLinks = 20;

export function parseCmsSocialLinks(value: string): CmsSocialLink[] | null {
  if (value.length > 10_000) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed) || parsed.length > maxLinks) return null;
  const links: CmsSocialLink[] = [];

  for (const item of parsed) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const { label, href } = item as Record<string, unknown>;
    if (typeof label !== "string" || typeof href !== "string") return null;

    const cleanLabel = label.trim();
    const cleanHref = href.trim();
    if (cleanLabel.length > 50 || cleanHref.length > 512 || (cleanHref && !cleanLabel)) return null;
    if (cleanHref) {
      try {
        if (new URL(cleanHref).protocol !== "https:") return null;
      } catch {
        return null;
      }
    }
    links.push({ label: cleanLabel, href: cleanHref });
  }

  return links;
}
