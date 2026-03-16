import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "register-email is required" })
    .email({ message: "register-invalid email address" }),
  password: z
    .string()
    .min(6, { message: "register-password must be at least 6 characters" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
