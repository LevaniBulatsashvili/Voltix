import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "validation.password_must_be_at_least_6_characters"),
    newPassword: z
      .string()
      .min(6, "validation.password_must_be_at_least_6_characters"),
    confirmPassword: z
      .string()
      .min(6, "validation.please_confirm_your_new_password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "validation.passwords_do_not_match",
    path: ["confirmPassword"],
  });

export type TChangePassword = z.infer<typeof changePasswordSchema>;
