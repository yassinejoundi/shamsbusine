export function enquiryEmail(values: { name: string; city: string; phone: string; email: string; type: string; description: string }) {
  const subject = `Demande de devis — ${values.type} à ${values.city}`;
  const body = `Bonjour Shams Busine,\n\nJe souhaite discuter de mon projet.\n\nNom : ${values.name}\nVille : ${values.city}\nTéléphone : ${values.phone}\nE-mail : ${values.email}\nProjet : ${values.type}\n\nDescription :\n${values.description}\n\nMerci de me recontacter.`;
  return `mailto:info@shamsbusine.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
