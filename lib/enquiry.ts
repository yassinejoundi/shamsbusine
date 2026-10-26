export function enquiryEmail(values: { name: string; city: string; type: string; description: string; contactMethod?: string; contactDetails?: string }) {
  const subject = `Demande de devis — ${values.type} à ${values.city}`;
  const contactLine = values.contactDetails ? `\nMoyen de contact préféré : ${values.contactMethod}\nCoordonnées : ${values.contactDetails}` : "";
  const body = `Bonjour Shams Busine,\n\nJe souhaite discuter de mon projet.\n\nNom : ${values.name}\nVille : ${values.city}\nTravaux : ${values.type}${contactLine}\n\n${values.description}\n\nMerci de me recontacter.`;
  return `mailto:info@shamsbusine.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
