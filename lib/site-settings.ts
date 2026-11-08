import { cache } from "react";
import { contact, socialLinks } from "./site";
import { cmsImage, getCmsContent, getCloudinaryImage } from "./cms/content";
import { parseCmsSocialLinks, type CmsSocialLink } from "./cms/social-links";

export type SiteSettings = {
  logo: string;
  phone: string;
  phoneHref: string;
  email: string;
  whatsapp: string;
  address: string;
  socialLinks: CmsSocialLink[];
};

export const defaultSiteSettings: SiteSettings = {
  logo: getCloudinaryImage("shared/shamsbusine-logo"),
  phone: contact.phone,
  phoneHref: contact.phoneHref,
  email: contact.email,
  whatsapp: contact.whatsapp,
  address: "",
  socialLinks,
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const content = await getCmsContent("site-settings");
  const phone = content["site.phone"] || defaultSiteSettings.phone;
  const socials = parseCmsSocialLinks(content["site.socialLinks"] ?? "[]") ?? defaultSiteSettings.socialLinks;

  return {
    logo: cmsImage(content, "site.logo") || defaultSiteSettings.logo,
    phone,
    phoneHref: `tel:${phone.replace(/[^+\d]/g, "")}`,
    email: content["site.email"] || defaultSiteSettings.email,
    whatsapp: content["site.whatsapp"] ?? "",
    address: content["site.address"] ?? "",
    socialLinks: socials.filter((link) => link.href),
  };
});
