import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("validation.invalid_email_address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
