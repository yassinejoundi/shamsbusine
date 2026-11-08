import { cache } from "react";
import { contact, socialLinks } from "./site";
import { cmsImage, getCmsContent, getCloudinaryImage } from "./cms/content";
import { parseCmsSocialLinks, type CmsSocialLink } from "./cms/social-links";
import { formatInternationalNumber, getTelephoneHref, getWhatsAppHref } from "./contact-numbers";

export type SiteSettings = {
  logo: string;
  phone: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappHref: string;
  address: string;
  socialLinks: CmsSocialLink[];
};

export const defaultSiteSettings: SiteSettings = {
  logo: getCloudinaryImage("shared/shamsbusine-logo"),
  phone: contact.phone,
  phoneDisplay: formatInternationalNumber(contact.phone),
  phoneHref: getTelephoneHref(contact.phone),
  email: contact.email,
  whatsappNumber: contact.whatsappNumber,
  whatsappMessage: contact.whatsappMessage,
  whatsappHref: getWhatsAppHref(contact.whatsappNumber, contact.whatsappMessage),
  address: contact.address,
  socialLinks,
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const content = await getCmsContent("site-settings");
  const phone = content["site.phone"] || defaultSiteSettings.phone;
  const whatsappNumber = content["site.whatsappNumber"] ?? defaultSiteSettings.whatsappNumber;
  const whatsappMessage = content["site.whatsappMessage"] ?? defaultSiteSettings.whatsappMessage;
  const socials = parseCmsSocialLinks(content["site.socialLinks"] ?? "[]") ?? defaultSiteSettings.socialLinks;

  return {
    logo: cmsImage(content, "site.logo") || defaultSiteSettings.logo,
    phone,
    phoneDisplay: formatInternationalNumber(phone),
    phoneHref: getTelephoneHref(phone),
    email: content["site.email"] || defaultSiteSettings.email,
    whatsappNumber,
    whatsappMessage,
    whatsappHref: getWhatsAppHref(whatsappNumber, whatsappMessage),
    address: content["site.address"] ?? "",
    socialLinks: socials.filter((link) => link.href),
  };
});
