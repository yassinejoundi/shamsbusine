export const projectTypes = [
  "Construction / gros œuvre",
  "Rénovation / finitions",
  "Étanchéité",
  "Second œuvre / techniques",
  "Conseil / suivi",
  "Autre projet",
] as const;

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && /^[+0-9().\s-]+$/.test(value);
}

export function validateEnquiry(values: {
  name: string;
  city: string;
  phone: string;
  email: string;
  type: string;
  description: string;
}) {
  if (!values.name || values.name.length > 100 || !values.city || values.city.length > 100 || !isValidPhone(values.phone) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254 ||
      !projectTypes.includes(values.type as (typeof projectTypes)[number]) ||
      !values.description || values.description.length > 2000) {
    return "Vérifiez les coordonnées et les détails de votre projet.";
  }

  return null;
}
