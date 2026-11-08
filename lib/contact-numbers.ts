export function normalizeInternationalNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidContactNumber(value: string) {
  return /^[1-9]\d{7,14}$/.test(value) || /^0[5-7]\d{8}$/.test(value);
}

export function toInternationalNumber(value: string) {
  return /^0[5-7]\d{8}$/.test(value) ? `212${value.slice(1)}` : value;
}

export function formatInternationalNumber(value: string) {
  if (/^0[5-7]\d{8}$/.test(value)) {
    return `${value.slice(0, 2)} ${value.slice(2, 4)} ${value.slice(4, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;
  }
  if (value.startsWith("212") && value.length === 12) {
    return `+212 ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;
  }
  return value ? `+${value}` : "";
}

export function getTelephoneHref(value: string) {
  return value ? `tel:+${toInternationalNumber(value)}` : "";
}

export function getWhatsAppHref(number: string, message: string) {
  if (!number) return "";
  const base = `https://wa.me/${toInternationalNumber(number)}`;
  return message.trim() ? `${base}?text=${encodeURIComponent(message.trim())}` : base;
}

export function parseLegacyWhatsAppLink(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !["wa.me", "www.wa.me"].includes(url.hostname)) return null;
    const path = url.pathname.replace(/^\//, "");
    if (!/^\d+$/.test(path)) return null;
    const number = normalizeInternationalNumber(path);
    return isValidContactNumber(number)
      ? { number, message: url.searchParams.get("text") ?? "" }
      : null;
  } catch {
    return null;
  }
}
