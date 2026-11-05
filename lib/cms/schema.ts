export type CmsField = {
  key: string;
  label: string;
  kind: "text" | "image";
  maxLength: number;
  defaultValue: string;
};

export type CmsSection = { id: string; title: string; fields: CmsField[] };
export type CmsPage = { slug: string; title: string; route: string; sections: CmsSection[] };

const text = (key: string, label: string, maxLength: number, defaultValue: string): CmsField => ({ key, label, kind: "text", maxLength, defaultValue });
const image = (key: string, label: string, defaultValue: string): CmsField => ({ key, label, kind: "image", maxLength: 0, defaultValue });
const section = (id: string, title: string, fields: CmsField[]): CmsSection => ({ id, title, fields });

export const cmsPages: CmsPage[] = [
  {
    slug: "home", title: "Accueil", route: "/", sections: [
      section("hero", "Introduction", [
        text("hero.title1", "Titre, ligne 1", 24, "Bâtir."), text("hero.title2", "Titre, ligne 2", 24, "Habiter."),
        text("hero.description", "Présentation", 220, "Construction et rénovation à Marrakech. Du gros œuvre aux finitions, Shams Busine donne vie à votre projet."),
        image("hero.accentImage", "Image secondaire", "home/detail-finitions"), text("hero.accentAlt", "Texte alternatif, image secondaire", 180, "Marbre sombre, bois et végétation dans un aménagement extérieur"),
        text("hero.quoteAction", "Libellé du bouton devis", 36, "Demander un devis"), text("hero.secondaryAction", "Libellé du lien secondaire", 42, "Découvrir nos réalisations"),
        image("hero.mainImage", "Image principale", "home/villa-jardin"), text("hero.mainAlt", "Texte alternatif, image principale", 180, "Villa aux façades roses, grandes baies vitrées et jardin planté de palmiers"), text("hero.mainCaption", "Légende, image principale", 100, "Des fondations aux espaces de vie."),
      ]),
      section("work", "Réalisations choisies", [
        text("work.title", "Titre", 48, "Nos réalisations."), text("work.intro", "Présentation", 220, "La structure, les matières, la lumière. Découvrez le travail de Shams Busine à travers ses chantiers et ses réalisations."),
        image("work.image1", "Photo extérieure", "home/villa-exterieur"), text("work.image1Alt", "Texte alternatif, photo extérieure", 180, "Villa contemporaine à deux niveaux, avec parement en pierre et larges baies vitrées"), text("work.image1Caption", "Légende, photo extérieure", 100, "Villa contemporaine · Façades & volumes"),
        image("work.image2", "Photo intérieure", "home/escalier-interieur"), text("work.image2Alt", "Texte alternatif, photo intérieure", 180, "Escalier courbe devant un mur blanc texturé et une fenêtre ouverte sur les palmiers"), text("work.image2Caption", "Légende, photo intérieure", 100, "Escalier intérieur & jeux de lumière"),
        text("work.closing", "Phrase de clôture", 100, "Un lieu se construit. Son caractère aussi."), text("work.action", "Libellé du lien", 36, "Parlons de vos travaux"),
      ]),
      section("services", "Services", [
        text("services.title1", "Titre, ligne 1", 32, "Des métiers"), text("services.title2", "Titre, ligne 2", 32, "complémentaires."),
        text("services.intro", "Présentation", 220, "Construire un bâtiment, rénover un intérieur ou préparer un chantier. Retrouvez les compétences utiles à votre projet."), text("services.action", "Libellé du lien", 42, "Explorer nos services"),
        text("services.item0.title", "Métier 1, titre", 42, "Gros œuvre"), text("services.item0.text", "Métier 1, description", 220, "Terrassement, fondations, assainissement, béton armé et maçonnerie. Les travaux de structure qui donnent sa forme au bâtiment."), image("services.item0.image", "Métier 1, image", "home/services-structure"), text("services.item0.alt", "Métier 1, texte alternatif", 180, "Échafaudages et dalle en béton sur un chantier de construction."), text("services.item0.caption", "Métier 1, légende", 100, "Une structure en cours de construction."),
        text("services.item1.title", "Métier 2, titre", 42, "Étanchéité"), text("services.item1.text", "Métier 2, description", 220, "Protection des toitures, terrasses et sous-sols. Diagnostic des supports, choix du système et mise en œuvre adaptés aux contraintes du projet."),
        text("services.item2.title", "Métier 3, titre", 42, "Second œuvre"), text("services.item2.text", "Métier 3, description", 220, "Plomberie, réseaux sanitaires, électricité, courants faibles, chauffage, ventilation et climatisation. Des installations coordonnées avec les autres corps de métier."),
        text("services.item3.title", "Métier 4, titre", 42, "Rénovation & finitions"), text("services.item3.text", "Métier 4, description", 220, "Transformation des espaces, carrelage et marbre, peinture, plâtrerie, cloisons et faux-plafonds. Le soin des matières jusqu’aux derniers détails."), image("services.item3.image", "Métier 4, image", "home/services-finitions"), text("services.item3.alt", "Métier 4, texte alternatif", 180, "Plafond en bois aux lignes géométriques dans un intérieur clair."),
        text("services.item4.title", "Métier 5, titre", 42, "Études & suivi"), text("services.item4.text", "Métier 5, description", 220, "Faisabilité, études techniques, chiffrage détaillé et planification. Coordination du chantier, contrôle qualité et accompagnement jusqu’à la réception."),
        text("services.item5.title", "Métier 6, titre", 42, "Travaux spécialisés"), text("services.item5.text", "Métier 6, description", 220, "Menuiseries bois et aluminium, métallerie, terrains de padel et aménagements extérieurs. Précisons ensemble les besoins propres à votre projet."),
      ]),
      section("process", "Déroulement du chantier", [
        text("process.title1", "Titre, ligne 1", 32, "Un chantier,"), text("process.title2", "Titre, ligne 2", 32, "un fil conducteur."),
        text("process.intro", "Présentation", 220, "De l’analyse du besoin aux contrôles de fin de chantier, chaque étape prépare la suivante."),
        image("process.image", "Photo du chantier", "home/techniciens-chantier"), text("process.imageAlt", "Texte alternatif, photo du chantier", 180, "Deux techniciens en tenue jaune, vus de dos, observent un chantier."), text("process.imageCaption", "Légende, photo du chantier", 100, "Visuel illustratif : une équipe sur le terrain."),
        text("process.step0.title", "Étape 1, titre", 48, "Étudier & chiffrer"), text("process.step0.text", "Étape 1, description", 220, "Nous échangeons autour de votre besoin, de vos plans et des contraintes du site. L’étude technique prépare un devis détaillé et un planning adapté."),
        text("process.step1.title", "Étape 2, titre", 48, "Réaliser & coordonner"), text("process.step1.text", "Étape 2, description", 220, "Les travaux s’organisent selon le périmètre retenu. Les corps de métier sont coordonnés et les échanges accompagnent l’avancement du chantier."),
        text("process.step2.title", "Étape 3, titre", 48, "Contrôler & réceptionner"), text("process.step2.text", "Étape 3, description", 220, "Les ouvrages sont contrôlés, les finitions examinées et la réception des travaux préparée avec vous."),
      ]),
      section("company", "L’entreprise", [
        text("company.title1", "Titre, ligne 1", 32, "Une équipe"), text("company.title2", "Titre, ligne 2", 32, "de terrain."),
        text("company.paragraph1", "Présentation, paragraphe 1", 220, "Basée à Marrakech, Shams Busine accompagne les projets résidentiels, commerciaux et professionnels, de la structure aux finitions."),
        text("company.paragraph2", "Présentation, paragraphe 2", 240, "Coordonner les métiers, soigner l’exécution et garder un dialogue clair : nos engagements se vivent sur le chantier, avec une attention constante à la sécurité."),
        text("company.action", "Libellé du lien", 42, "Parlons de votre projet"),
        image("company.image", "Photo de l’équipe", "home/company-team"), text("company.imageAlt", "Texte alternatif, photo de l’équipe", 180, "Deux techniciens de dos portent le logo Shams Busine sur leur veste jaune et consultent un plan dans un chantier en béton."), text("company.imageCaption", "Légende, photo de l’équipe", 120, "Visuel illustratif : deux techniciens coordonnent un point de chantier."),
      ]),
      section("faq", "Questions fréquentes", [
        text("faq.title", "Titre", 48, "Avant de se lancer."), text("faq.intro", "Présentation", 220, "Quelques réponses pour préparer votre échange : périmètre des travaux, lieu du chantier, planning et documents à réunir."),
        image("faq.image", "Photo", "home/faq-villa-detail"), text("faq.imageAlt", "Texte alternatif, photo", 180, "Détail d’une façade de villa en pierre grise et enduit clair"), text("faq.imageCaption", "Légende, photo", 110, "Une façade contemporaine, entre pierre grise et enduit clair."),
        text("faq.0.question", "Question 1", 120, "Quels travaux pouvez-vous réaliser ?"), text("faq.0.answer", "Réponse 1", 300, "Construction, gros œuvre, étanchéité, installations techniques, rénovation et finitions. Décrivez votre besoin pour que nous précisions ensemble le périmètre des travaux."),
        text("faq.1.question", "Question 2", 120, "Intervenez-vous hors de Marrakech ?"), text("faq.1.answer", "Réponse 2", 300, "Notre entreprise est basée à Marrakech. Indiquez la ville de votre projet : nous vous confirmerons les possibilités d’intervention selon sa localisation et sa nature."),
        text("faq.2.question", "Question 3", 120, "Travaillez-vous avec mon architecte ?"), text("faq.2.answer", "Réponse 3", 300, "Nous travaillons avec les architectes et bureaux d’études pour coordonner l’exécution. Vous pouvez nous transmettre les plans et les coordonnées des intervenants lors du premier échange."),
        text("faq.3.question", "Question 4", 120, "Comment évaluer le délai et le budget ?"), text("faq.3.answer", "Réponse 4", 300, "Ils dépendent du périmètre, des contraintes du site et du niveau de finition. L’étude de votre projet permet de préparer un chiffrage et un planning adaptés, sans délai standard annoncé à l’avance."),
        text("faq.4.question", "Question 5", 120, "Que prévoir avant de démarrer ?"), text("faq.4.answer", "Réponse 5", 300, "Partagez la localisation, le type de travaux et les plans disponibles. Le devis, le périmètre, les conditions d’exécution et les documents contractuels sont à examiner ensemble avant tout engagement."),
      ]),
    ],
  },
  {
    slug: "services", title: "Services", route: "/services", sections: [
      section("hero", "Introduction", [
        text("hero.title1", "Titre, ligne 1", 34, "De la structure"), text("hero.title2", "Titre, ligne 2", 34, "aux finitions."), text("hero.intro", "Présentation", 220, "Nos services de construction et de rénovation à Marrakech. Des compétences réunies, du premier ouvrage au dernier détail."),
        text("hero.quoteAction", "Libellé du bouton devis", 36, "Demander un devis"), text("hero.secondaryAction", "Libellé du lien secondaire", 42, "Découvrir les métiers"),
        image("hero.image", "Photo", "services/services-hero-villa-salim"), text("hero.imageAlt", "Texte alternatif, photo", 180, "Façade contemporaine en chantier, avec balcons en béton, échafaudage et enduits inachevés"), text("hero.imageCaption", "Légende, photo", 100, "La structure d’abord. Les espaces de vie ensuite."), text("hero.note", "Note", 160, "Un projet complet ou un besoin précis. Le périmètre se définit avec vous."),
      ]),
      section("scopes", "Les métiers", [
        text("scopes.title1", "Titre, ligne 1", 32, "Les métiers"), text("scopes.title2", "Titre, ligne 2", 32, "du projet."), text("scopes.intro", "Présentation", 220, "Découvrez les principaux travaux associés à nos six métiers, de la structure aux finitions."),
        text("scope.0.title", "Gros œuvre, titre", 42, "Gros œuvre"), text("scope.0.description", "Gros œuvre, description", 180, "Préparer le terrain et réaliser la structure qui donne forme à votre bâtiment."), text("scope.0.item0", "Gros œuvre, travaux 1", 120, "Terrassement, fondations et assainissement"), text("scope.0.item1", "Gros œuvre, travaux 2", 120, "Coffrage, ferraillage et béton armé"), text("scope.0.item2", "Gros œuvre, travaux 3", 120, "Maçonnerie, élévation et ouvrages de structure"),
        text("scope.1.title", "Étanchéité, titre", 42, "Étanchéité"), text("scope.1.description", "Étanchéité, description", 180, "Traiter les zones exposées à l’eau avec un système adapté au support et à son usage."), text("scope.1.item0", "Étanchéité, travaux 1", 120, "Diagnostic des supports et des points sensibles"), text("scope.1.item1", "Étanchéité, travaux 2", 120, "Toitures, terrasses et sous-sols"), text("scope.1.item2", "Étanchéité, travaux 3", 120, "Mise en œuvre, vérifications et tests d’étanchéité"),
        text("scope.2.title", "Second œuvre, titre", 42, "Second œuvre & techniques"), text("scope.2.description", "Second œuvre, description", 180, "Intégrer les réseaux et les équipements nécessaires au fonctionnement des espaces."), text("scope.2.item0", "Second œuvre, travaux 1", 120, "Plomberie et réseaux sanitaires"), text("scope.2.item1", "Second œuvre, travaux 2", 120, "Électricité générale et courants faibles"), text("scope.2.item2", "Second œuvre, travaux 3", 120, "Chauffage, ventilation et climatisation"),
        text("scope.3.title", "Rénovation, titre", 42, "Rénovation & finitions"), text("scope.3.description", "Rénovation, description", 180, "Transformer l’existant et apporter le soin final aux volumes, aux matières et aux surfaces."), text("scope.3.item0", "Rénovation, travaux 1", 120, "Réaménagement, rénovation et extension"), text("scope.3.item1", "Rénovation, travaux 2", 120, "Carrelage, marbre, peinture et traitement des façades"), text("scope.3.item2", "Rénovation, travaux 3", 120, "Plâtrerie, cloisons et faux-plafonds"),
        text("scope.4.title", "Études, titre", 42, "Conseil, études & suivi"), text("scope.4.description", "Études, description", 180, "Clarifier les choix techniques, le chiffrage et l’organisation avant et pendant les travaux."), text("scope.4.item0", "Études, travaux 1", 120, "Faisabilité, études techniques et devis détaillé"), text("scope.4.item1", "Études, travaux 2", 120, "Planification et coordination des corps de métier"), text("scope.4.item2", "Études, travaux 3", 120, "Suivi du chantier, contrôle qualité et réception"),
        text("scope.5.title", "Services spécialisés, titre", 42, "Services spécialisés"), text("scope.5.description", "Services spécialisés, description", 180, "Compléter votre projet avec des ouvrages et des aménagements adaptés à ses usages."), text("scope.5.item0", "Services spécialisés, travaux 1", 120, "Menuiseries bois et aluminium, ferronnerie"), text("scope.5.item1", "Services spécialisés, travaux 2", 120, "Préparation et construction de terrains de padel"), text("scope.5.item2", "Services spécialisés, travaux 3", 120, "Jardinage et aménagements extérieurs"),
      ]),
      section("stage", "Point de départ du projet", [
        text("stage.title1", "Titre, ligne 1", 32, "Où en est"), text("stage.title2", "Titre, ligne 2", 32, "votre projet ?"), text("stage.intro", "Présentation", 220, "Chaque projet a son point de départ. Choisissez celui qui vous ressemble pour découvrir les métiers concernés."),
        text("stage.0.title", "Étape 1, titre", 48, "Je prépare mon projet"), text("stage.0.detail", "Étape 1, détail", 100, "Études, chiffrage et organisation"), text("stage.1.title", "Étape 2, titre", 48, "Je veux construire"), text("stage.1.detail", "Étape 2, détail", 100, "Fondations, structure et maçonnerie"), text("stage.2.title", "Étape 3, titre", 48, "Je transforme un lieu"), text("stage.2.detail", "Étape 3, détail", 100, "Rénovation, réaménagement et finitions"),
      ]),
      section("projects", "Projets en images", [
        text("projects.title1", "Titre, ligne 1", 32, "La matière"), text("projects.title2", "Titre, ligne 2", 32, "en lumière."), text("projects.intro", "Présentation", 200, "Des façades aux détails intérieurs, quelques vues des projets de Shams Busine."),
        image("projects.0.image", "Projet 1, photo", "services/services-project-villa"), text("projects.0.alt", "Projet 1, texte alternatif", 180, "Façade de villa aux teintes terre cuite, bordée de végétation."), text("projects.0.caption", "Projet 1, légende", 110, "Une façade aux tons chauds, entre lignes nettes et végétation."), text("projects.0.link", "Projet 1, lien", 70, "Voir le gros œuvre"),
        image("projects.1.image", "Projet 2, photo", "services/services-project-interior"), text("projects.1.alt", "Projet 2, texte alternatif", 180, "Mur intérieur texturé et fenêtre ouverte sur la végétation."), text("projects.1.caption", "Projet 2, légende", 110, "Texture murale et lumière de fenêtre."), text("projects.1.link", "Projet 2, lien", 90, "Voir la rénovation et les finitions"),
        image("projects.2.image", "Projet 3, photo", "services/services-project-cour"), text("projects.2.alt", "Projet 3, texte alternatif", 180, "Cour couverte aux murs couleur terre cuite, ouverte sur un palmier."), text("projects.2.caption", "Projet 3, légende", 110, "Une cour ombragée ouverte sur le jardin."), text("projects.2.link", "Projet 3, lien", 90, "Voir les services spécialisés"), text("projects.action", "Lien vers la galerie", 50, "Parcourir les réalisations"),
      ]),
      section("process", "Déroulement", [
        text("process.title1", "Titre, ligne 1", 32, "Du besoin"), text("process.title2", "Titre, ligne 2", 32, "au chantier."), text("process.intro", "Présentation", 220, "De la définition du besoin à la réception, les étapes se précisent selon le périmètre de votre projet."),
        text("process.step0.title", "Étape 1, titre", 48, "Comprendre & chiffrer"), text("process.step0.text", "Étape 1, description", 220, "Nous examinons le besoin, les plans disponibles et les contraintes du site pour préciser le périmètre et préparer le devis."), text("process.step1.title", "Étape 2, titre", 48, "Organiser & réaliser"), text("process.step1.text", "Étape 2, description", 220, "Les interventions sont planifiées et les corps de métier coordonnés selon les étapes retenues pour votre chantier."), text("process.step2.title", "Étape 3, titre", 48, "Contrôler & réceptionner"), text("process.step2.text", "Étape 3, description", 220, "Les points de contrôle et la réception permettent de revoir les travaux réalisés au regard du périmètre convenu."),
      ]),
      section("faq", "Questions fréquentes", [
        text("faq.title", "Titre", 48, "Vos questions"), text("faq.intro", "Présentation", 200, "Quelques repères pour préparer votre échange avec notre équipe."), text("faq.action", "Libellé du lien", 40, "Parler de mon projet"),
        text("faq.0.question", "Question 1", 120, "Puis-je demander un seul lot de travaux ?"), text("faq.0.answer", "Réponse 1", 300, "Oui, un besoin ciblé peut être étudié : étanchéité, gros œuvre, installations techniques ou finitions. Nous précisons avec vous les travaux concernés et leur coordination avec les autres intervenants."),
        text("faq.1.question", "Question 2", 120, "Intervenez-vous sur un bâtiment existant ?"), text("faq.1.answer", "Réponse 2", 300, "La rénovation, le réaménagement et les extensions font partie de nos services. L’état du bâtiment et les contraintes techniques sont à examiner avant de définir les interventions."),
        text("faq.2.question", "Question 3", 120, "Pouvez-vous travailler avec mon architecte ?"), text("faq.2.answer", "Réponse 3", 300, "Nous coordonnons l’exécution avec les architectes et bureaux d’études. Transmettez les plans disponibles et les coordonnées des intervenants pour préparer cet échange."),
        text("faq.3.question", "Question 4", 120, "Comment sont définis le budget et le planning ?"), text("faq.3.answer", "Réponse 4", 300, "Ils dépendent de la nature des travaux, du site, des matériaux et des finitions. Le chiffrage et l’organisation sont précisés à partir de l’étude de votre besoin, sans tarif ni durée standard."),
        text("faq.4.question", "Question 5", 120, "Quels éléments transmettre pour un devis ?"), text("faq.4.answer", "Réponse 5", 300, "Indiquez la ville, le type de travaux et l’état d’avancement de votre projet. Des plans, des photos de l’existant et une description des attentes peuvent aider à définir le périmètre."),
      ]),
      section("enquiry", "Prendre contact", [
        text("enquiry.title1", "Titre, ligne 1", 32, "Parlons de"), text("enquiry.title2", "Titre, ligne 2", 32, "votre projet."), text("enquiry.intro", "Présentation", 200, "À Marrakech ou ailleurs, précisons ensemble votre besoin et les prochaines étapes."),
        text("enquiry.detailsTitle", "Titre des repères", 48, "Les premiers repères"), text("enquiry.prompt", "Introduction des repères", 150, "Pour préparer notre échange, partagez :"), text("enquiry.action", "Libellé du bouton", 36, "Demander un devis"),
        text("enquiry.0.label", "Repère 1, intitulé", 30, "Lieu"), text("enquiry.0.text", "Repère 1, détail", 100, "La ville et le type de bâtiment"), text("enquiry.1.label", "Repère 2, intitulé", 30, "Travaux"), text("enquiry.1.text", "Repère 2, détail", 100, "Ce que vous souhaitez construire ou transformer"), text("enquiry.2.label", "Repère 3, intitulé", 30, "Avancement"), text("enquiry.2.text", "Repère 3, détail", 100, "Où vous en êtes et les documents disponibles"),
      ]),
    ],
  },
  {
    slug: "contact", title: "Contact", route: "/contact", sections: [
      section("hero", "Introduction", [
        text("hero.title1", "Titre, ligne 1", 32, "Votre projet"), text("hero.title2", "Titre, ligne 2", 32, "commence ici."), text("hero.lead", "Phrase d’accroche", 100, "Une idée, un terrain, un espace à transformer ?"), text("hero.intro", "Présentation", 220, "Racontez-nous votre projet de construction ou de rénovation. Nous prendrons le temps d’en comprendre le cadre avant de parler travaux."), text("hero.action", "Libellé du bouton", 36, "Parler de mon projet"),
        image("hero.image1", "Photo principale", "contact/contact-villa-facade"), text("hero.image1Alt", "Texte alternatif, photo principale", 180, "Façade aux tons ocre et pierre claire, ouverte sur le jardin"), text("hero.image1Caption", "Légende, photo principale", 48, "Façade ocre"), image("hero.image2", "Photo secondaire", "contact/contact-villa-piscine"), text("hero.image2Alt", "Texte alternatif, photo secondaire", 180, "Bassin extérieur bordé par la villa et ses plantations"), text("hero.image2Caption", "Légende, photo secondaire", 48, "Terrasse & bassin"),
      ]),
    ],
  },
  {
    slug: "entreprise", title: "Entreprise", route: "/entreprise", sections: [
      section("hero", "Introduction", [
        text("hero.title1", "Titre, ligne 1", 32, "Du gros œuvre"), text("hero.title2", "Titre, ligne 2", 32, "aux finitions."), text("hero.intro", "Présentation", 220, "À Marrakech, Shams Busine accompagne les projets de construction et de rénovation, du gros œuvre aux finitions."), text("hero.quoteAction", "Libellé du bouton devis", 36, "Demander un devis"), text("hero.secondaryAction", "Libellé du lien secondaire", 48, "Découvrir notre méthode"), image("hero.image", "Photo", "entreprise/souihla-perspective"), text("hero.imageAlt", "Texte alternatif, photo", 180, "Perspective architecturale d’une construction contemporaine entourée de palmiers et de végétation."), text("hero.caption", "Légende", 100, "Perspective architecturale."),
      ]),
      section("approach", "L’équipe", [
        text("approach.title", "Titre", 48, "Le chantier avance en équipe."), text("approach.intro", "Présentation", 220, "Ingénieurs BTP, techniciens spécialisés, chefs de chantier et ouvriers qualifiés réunissent leurs compétences autour de chaque projet."), image("approach.image", "Photo", "entreprise/entreprise-approche"), text("approach.imageAlt", "Texte alternatif, photo", 180, "Trois personnes travaillent autour d’un échafaudage sur un chantier de construction."), text("approach.caption", "Légende", 110, "Une structure en cours de réalisation, avec échafaudage."), text("approach.note", "Texte de conclusion", 180, "La confiance, la qualité et la sécurité guident les échanges et le travail sur site."),
      ]),
      section("equipment", "Moyens sur le terrain", [
        text("equipment.title", "Titre", 48, "Des moyens sur le terrain."), text("equipment.intro", "Présentation", 220, "Terrassement, coffrage, levage et organisation : les équipements accompagnent les différentes phases des travaux."),
        text("equipment.0.title", "Moyen 1, titre", 42, "Préparer le terrain"), text("equipment.0.description", "Moyen 1, description", 180, "Pelles mécaniques, JCB, Bobcat et compacteurs."), text("equipment.1.title", "Moyen 2, titre", 42, "Coffrer et bâtir"), text("equipment.1.description", "Moyen 2, description", 180, "Grues, panneaux de coffrage, poutres H20, étais métalliques et vibrateurs à béton."), text("equipment.2.title", "Moyen 3, titre", 42, "Organiser le chantier"), text("equipment.2.description", "Moyen 3, description", 180, "Échafaudages, bureaux de chantier, compresseurs, postes à souder et pick-ups."),
      ]),
      section("gallery", "Galerie", [
        text("gallery.title", "Titre", 48, "Des lieux, des lignes, des matières."), text("gallery.intro", "Présentation", 200, "Façades, jardins et espaces de vie issus des réalisations Shams Busine."),
        image("gallery.0.image", "Photo 1", "entreprise/entreprise-facade-terracotta"), text("gallery.0.alt", "Photo 1, texte alternatif", 180, "Villa contemporaine à la façade terracotta, aux baies vitrées et au jardin planté."), text("gallery.0.caption", "Photo 1, légende", 110, "Façade terracotta, verre et végétation."),
        image("gallery.1.image", "Photo 2", "entreprise/entreprise-bois-pierre"), text("gallery.1.alt", "Photo 2, texte alternatif", 180, "Façade contemporaine en bois et pierre donnant sur un bassin en cours d’aménagement."), text("gallery.1.caption", "Photo 2, légende", 110, "Le bois et la pierre au bord du bassin."),
        image("gallery.2.image", "Photo 3", "entreprise/entreprise-cour-terracotta"), text("gallery.2.alt", "Photo 3, texte alternatif", 180, "Cour terracotta ouverte sur une piscine étroite, bordée de palmiers."), text("gallery.2.caption", "Photo 3, légende", 110, "Une cour ouverte autour de la piscine."),
      ]),
      section("method", "Méthode", [
        text("method.title", "Titre", 48, "Un chantier, un fil conducteur."), text("method.intro", "Présentation", 200, "Étude du besoin, organisation du chantier et points de contrôle structurent chaque étape."),
        text("method.0.title", "Étape 1, titre", 48, "Étudier et chiffrer."), text("method.0.description", "Étape 1, description", 220, "Analyser le besoin, étudier les aspects techniques et préparer un devis détaillé."), text("method.1.title", "Étape 2, titre", 48, "Réaliser et coordonner."), text("method.1.description", "Étape 2, description", 220, "Organiser les travaux et coordonner les corps de métier selon le périmètre retenu."), text("method.2.title", "Étape 3, titre", 48, "Contrôler et réceptionner."), text("method.2.description", "Étape 3, description", 220, "Suivre les points de contrôle et préparer la réception des travaux."),
      ]),
      section("partners", "Partenaires", [
        text("partners.title", "Titre", 48, "Nos partenaires."), text("partners.intro", "Présentation", 200, "Ils nous font confiance pour leurs projets de construction."),
        text("partner.0.name", "Partenaire 1, nom", 100, "Agence d’architecture"), image("partner.0.image", "Partenaire 1, logo", "entreprise/partner-agence-architecture"),
        text("partner.1.name", "Partenaire 2, nom", 100, "Sonasid"), image("partner.1.image", "Partenaire 2, logo", "entreprise/partner-sonasid"),
        text("partner.2.name", "Partenaire 3, nom", 100, "Ménara Préfa"), image("partner.2.image", "Partenaire 3, logo", "entreprise/partner-menara-prefa"),
        text("partner.3.name", "Partenaire 4, nom", 100, "Beldi Fusion Kitchen"), image("partner.3.image", "Partenaire 4, logo", "entreprise/partner-beldi-fusion-kitchen"),
        text("partner.4.name", "Partenaire 5, nom", 100, "Chaoua Briques"), image("partner.4.image", "Partenaire 5, logo", "entreprise/partner-chaoua-briques"),
        text("partner.5.name", "Partenaire 6, nom", 100, "Royaume du Maroc, ministère de l’Éducation nationale, du Préscolaire et des Sports"), image("partner.5.image", "Partenaire 6, logo", "entreprise/partner-ministere-education"),
        text("partner.6.name", "Partenaire 7, nom", 100, "Planète Montessori International School"), image("partner.6.image", "Partenaire 7, logo", "entreprise/partner-planete-montessori"),
        text("partner.7.name", "Partenaire 8, nom", 100, "Mega Engineering"), image("partner.7.image", "Partenaire 8, logo", "entreprise/partner-mega-engineering"),
        text("partner.8.name", "Partenaire 9, nom", 100, "Association Al Nadi Al Baydaoui de Marrakech"), image("partner.8.image", "Partenaire 9, logo", "entreprise/partner-association-alnadi"),
        text("partner.9.name", "Partenaire 10, nom", 100, "Laboratoire privé d’analyses et d’essais, L.P.A.E. Agadir"), image("partner.9.image", "Partenaire 10, logo", "entreprise/partner-lpae"),
        text("partner.10.name", "Partenaire 11, nom", 100, "ART BÉTON, études et travaux béton"), image("partner.10.image", "Partenaire 11, logo", "entreprise/partner-art-beton"),
        text("partner.11.name", "Partenaire 12, nom", 100, "Tecnitas"), image("partner.11.image", "Partenaire 12, logo", "entreprise/partner-tecnitas"),
        text("partner.12.name", "Partenaire 13, nom", 100, "Labo Control, laboratoire d’essais, analyses et de contrôle"), image("partner.12.image", "Partenaire 13, logo", "entreprise/partner-labo-control"),
        text("partner.13.name", "Partenaire 14, nom", 100, "3D Concept"), image("partner.13.image", "Partenaire 14, logo", "entreprise/partner-3d-concept"),
        text("partner.14.name", "Partenaire 15, nom", 100, "Magriser, systèmes d’irrigation"), image("partner.14.image", "Partenaire 15, logo", "entreprise/partner-magriser"),
        text("partner.15.name", "Partenaire 16, nom", 100, "Cogetis, systèmes d’étanchéité"), image("partner.15.image", "Partenaire 16, logo", "entreprise/partner-cogetis"),
        text("partner.16.name", "Partenaire 17, nom", 100, "Carripréfa"), image("partner.16.image", "Partenaire 17, logo", "entreprise/partner-carriprefa"),
      ]),
      section("enquiry", "Prendre contact", [
        text("enquiry.title", "Titre", 48, "Parlons de votre projet."), text("enquiry.intro", "Présentation", 220, "Indiquez la ville, les travaux envisagés et le stade d’avancement pour cadrer le premier échange."), text("enquiry.action", "Libellé du bouton", 36, "Demander un devis"),
      ]),
    ],
  },
  {
    slug: "realisations", title: "Réalisations", route: "/realisations", sections: [
      section("intro", "Introduction", [
        text("intro.title1", "Titre, ligne 1", 32, "Des projets"), text("intro.title2", "Titre, ligne 2", 32, "en images."), text("intro.text", "Présentation", 200, "De la structure aux finitions, découvrez des chantiers Shams Busine en images."), text("intro.action", "Libellé du bouton", 36, "Demander un devis"),
      ]),
      section("gallery", "Galerie", [
        text("gallery.title", "Titre", 48, "Du terrain aux détails."), text("gallery.intro", "Présentation", 200, "Parcourez les photos selon l’espace ou l’étape qui ressemble à votre projet."),
        text("filter.all", "Filtre, toutes les vues", 32, "Toutes les vues"), text("filter.exterieurs", "Filtre, extérieurs", 32, "Extérieurs"), text("filter.structure", "Filtre, structure", 32, "Structure"), text("filter.espaces", "Filtre, espaces et détails", 32, "Espaces & détails"),
        image("view.0.image", "Vue 1, photo", "realisations/villa-jardin"), text("view.0.alt", "Vue 1, texte alternatif", 180, "Maison contemporaine à deux niveaux, avec baies vitrées, palmiers et pelouse."), text("view.0.caption", "Vue 1, légende", 110, "Façade, jardin et bassin"),
        image("view.1.image", "Vue 2, photo", "realisations/chantier-structure"), text("view.1.alt", "Vue 2, texte alternatif", 180, "Ouvrage de béton sous un ciel dégagé, sur un terrain encore nu."), text("view.1.caption", "Vue 2, légende", 110, "Béton et échafaudage"),
        image("view.2.image", "Vue 3, photo", "realisations/escalier-interieur"), text("view.2.alt", "Vue 3, texte alternatif", 180, "Grande ouverture vitrée donnant sur des palmiers et un jardin."), text("view.2.caption", "Vue 3, légende", 110, "Parois travaillées et lumière traversante"),
        image("view.3.image", "Vue 4, photo", "realisations/chantier-maconnerie"), text("view.3.alt", "Vue 4, texte alternatif", 180, "Bâtiment à plusieurs niveaux, au pied d’une grue jaune."), text("view.3.caption", "Vue 4, légende", 110, "Maçonnerie et élévation"),
        image("view.4.image", "Vue 5, photo", "realisations/villa-exterieur"), text("view.4.alt", "Vue 5, texte alternatif", 180, "Façade contemporaine et terrain ouvert devant de larges baies vitrées."), text("view.4.caption", "Vue 5, légende", 110, "Volumes extérieurs et matières"),
        image("view.5.image", "Vue 6, photo", "realisations/detail-finitions"), text("view.5.alt", "Vue 6, texte alternatif", 180, "Fontaine circulaire en marbre sombre devant un mur à claire-voie en bois."), text("view.5.caption", "Vue 6, légende", 110, "Pierre, bois et détail d’aménagement"),
      ]),
      section("enquiry", "Prendre contact", [
        text("enquiry.title", "Titre", 48, "Un projet à faire avancer ?"), text("enquiry.intro", "Présentation", 220, "Pour un premier échange utile, indiquez la ville, les travaux envisagés et l’étape où vous en êtes."), text("enquiry.action", "Libellé du bouton", 36, "Décrire mon projet"), text("gallery.loading", "Message de chargement", 80, "Chargement des vues de projets…"),
      ]),
    ],
  },
];

export const cmsPageBySlug: Record<string, CmsPage> = Object.create(null);
for (const page of cmsPages) cmsPageBySlug[page.slug] = page;

export function defaultCmsContent(page: CmsPage) {
  return Object.fromEntries(page.sections.flatMap((group) => group.fields.map((field) => [field.key, field.defaultValue])));
}
