import type { CmsField } from "./schema";
import { isValidContactNumber } from "../contact-numbers";

export function isValidCmsTextFieldValue(field: CmsField, value: string) {
  if (value.length > field.maxLength) return false;
  if (!value.trim()) return Boolean(field.optional);

  switch (field.inputType) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    case "tel":
      return isValidContactNumber(value);
    case "url":
      try {
        return new URL(value.trim()).protocol === "https:";
      } catch {
        return false;
      }
    default:
      return true;
  }
}
