import assert from "node:assert/strict";
import { test } from "node:test";
import { enquiryEmail } from "./enquiry.ts";

test("email brief preserves French, line breaks and reserved characters", () => {
  const values = { name: "Élodie & Sami", city: "Marrakech", type: "Rénovation / finitions", description: "Cuisine & salon ?\nPlans : 120 m² #A" };
  const email = enquiryEmail(values);
  assert.ok(email.startsWith("mailto:info@shamsbusine.com?"));
  const query = new URLSearchParams(email.split("?")[1]);
  assert.equal(query.get("subject"), "Demande de devis : Rénovation / finitions à Marrakech");
  assert.ok(query.get("body")?.includes("Nom : Élodie & Sami"));
  assert.ok(query.get("body")?.includes(values.description));
  assert.equal([...query.keys()].length, 2);
});
