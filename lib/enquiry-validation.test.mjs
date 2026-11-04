import assert from "node:assert/strict";
import { test } from "node:test";
import { validateEnquiry } from "./enquiry-validation.ts";

const validEnquiry = {
  name: "Élodie & Sami",
  city: "Marrakech",
  phone: "+212 777 54 39 97",
  email: "client@example.com",
  type: "Rénovation / finitions",
  description: "Cuisine & salon ? Plans disponibles.",
};

test("accepts a complete French quote enquiry", () => {
  assert.equal(validateEnquiry(validEnquiry), null);
});

test("rejects invalid contact details and unsupported project types", () => {
  assert.ok(validateEnquiry({ ...validEnquiry, phone: "abc" }));
  assert.ok(validateEnquiry({ ...validEnquiry, email: "not-an-email" }));
  assert.ok(validateEnquiry({ ...validEnquiry, type: "Autre chose" }));
});

test("rejects fields above their stored limits", () => {
  assert.ok(validateEnquiry({ ...validEnquiry, name: "x".repeat(101) }));
  assert.ok(validateEnquiry({ ...validEnquiry, description: "x".repeat(2001) }));
});
