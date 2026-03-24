import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "login.email_is_required" })
    .email({ message: "login.invalid_email_address" }),
  password: z
    .string()
    .min(6, { message: "login.password_must_be_at_least_6_characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
