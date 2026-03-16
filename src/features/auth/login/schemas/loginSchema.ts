import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "login-email is required" })
    .email({ message: "login-invalid email address" }),
  password: z
    .string()
    .min(6, { message: "login-password must be at least 6 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
