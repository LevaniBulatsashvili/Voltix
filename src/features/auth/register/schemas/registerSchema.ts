import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "register.email_is_required" })
    .email({ message: "register.invalid_email_address" }),
  password: z
    .string()
    .min(6, { message: "register.password_must_be_at_least_6_characters" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
