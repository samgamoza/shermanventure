import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .regex(/^[+()\-\s\d]*$/, "Use digits, spaces, + ( ) or - only")
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().min(3, "Please add a short subject").max(150),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000, "Message must be under 2000 characters"),
  privacy_consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy to continue" }) }),
});

export type ContactInput = z.infer<typeof contactSchema>;
