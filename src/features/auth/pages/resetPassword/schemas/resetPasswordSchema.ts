import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "validation.password_too_short"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwords_do_not_match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
