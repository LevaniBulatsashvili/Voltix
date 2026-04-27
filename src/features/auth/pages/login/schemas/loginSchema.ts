import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "validation.email_is_required" })
    .email({ message: "validation.invalid_email_address" }),
  password: z
    .string()
    .min(6, { message: "validation.password_must_be_at_least_6_characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
