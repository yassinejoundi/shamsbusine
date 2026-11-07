export type CmsPartner = {
  id: string;
  name: string;
  image: string;
  visible: boolean;
};

export const defaultEntreprisePartners: CmsPartner[] = [
  { id: "partner-0", name: "Agence d’architecture", image: "entreprise/partner-agence-architecture", visible: true },
  { id: "partner-1", name: "Sonasid", image: "entreprise/partner-sonasid", visible: true },
  { id: "partner-2", name: "Ménara Préfa", image: "entreprise/partner-menara-prefa", visible: true },
  { id: "partner-3", name: "Beldi Fusion Kitchen", image: "entreprise/partner-beldi-fusion-kitchen", visible: true },
  { id: "partner-4", name: "Chaoua Briques", image: "entreprise/partner-chaoua-briques", visible: true },
  { id: "partner-5", name: "Royaume du Maroc, ministère de l’Éducation nationale, du Préscolaire et des Sports", image: "entreprise/partner-ministere-education", visible: true },
  { id: "partner-6", name: "Planète Montessori International School", image: "entreprise/partner-planete-montessori", visible: true },
  { id: "partner-7", name: "Mega Engineering", image: "entreprise/partner-mega-engineering", visible: true },
  { id: "partner-8", name: "Association Al Nadi Al Baydaoui de Marrakech", image: "entreprise/partner-association-alnadi", visible: true },
  { id: "partner-9", name: "Laboratoire privé d’analyses et d’essais, L.P.A.E. Agadir", image: "entreprise/partner-lpae", visible: true },
  { id: "partner-10", name: "ART BÉTON, études et travaux béton", image: "entreprise/partner-art-beton", visible: true },
  { id: "partner-11", name: "Tecnitas", image: "entreprise/partner-tecnitas", visible: true },
  { id: "partner-12", name: "Labo Control, laboratoire d’essais, analyses et de contrôle", image: "entreprise/partner-labo-control", visible: true },
  { id: "partner-13", name: "3D Concept", image: "entreprise/partner-3d-concept", visible: true },
  { id: "partner-14", name: "Magriser, systèmes d’irrigation", image: "entreprise/partner-magriser", visible: true },
  { id: "partner-15", name: "Cogetis, systèmes d’étanchéité", image: "entreprise/partner-cogetis", visible: true },
  { id: "partner-16", name: "Carripréfa", image: "entreprise/partner-carriprefa", visible: true },
];

export function parseCmsPartners(value: string): CmsPartner[] | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed) || parsed.length > 50) return null;

  const partners: CmsPartner[] = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const partner = item as Record<string, unknown>;
    if (
      typeof partner.id !== "string"
      || !/^[a-z0-9-]{1,64}$/i.test(partner.id)
      || typeof partner.name !== "string"
      || partner.name.length > 100
      || typeof partner.image !== "string"
      || partner.image.length > 180
      || typeof partner.visible !== "boolean"
    ) return null;

    partners.push({
      id: partner.id,
      name: partner.name,
      image: partner.image,
      visible: partner.visible,
    });
  }

  return partners;
}

export function isValidCmsPartners(
  partners: CmsPartner[],
  isValidImage: (image: string) => boolean,
) {
  const ids = new Set<string>();
  return partners.every((partner) => {
    if (ids.has(partner.id) || (partner.image !== "" && !isValidImage(partner.image))) return false;
    ids.add(partner.id);
    return !partner.visible || (partner.name.trim().length > 0 && partner.image !== "");
  });
}
