import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("validation.invalid_email"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
