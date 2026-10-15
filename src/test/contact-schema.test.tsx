import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const ok = { name: "Jane Doe", email: "jane@example.com", phone: "", subject: "Hello", message: "I would like advice.", privacy_consent: true as const };

describe("contact form rules", () => {
  it("accepts a valid inquiry", () => expect(contactSchema.safeParse(ok).success).toBe(true));
  it("requires privacy consent", () => expect(contactSchema.safeParse({ ...ok, privacy_consent: false }).success).toBe(false));
  it("rejects invalid email", () => expect(contactSchema.safeParse({ ...ok, email: "nope" }).success).toBe(false));
  it("rejects messages over 2000 characters", () => expect(contactSchema.safeParse({ ...ok, message: "a".repeat(2001) }).success).toBe(false));
});
