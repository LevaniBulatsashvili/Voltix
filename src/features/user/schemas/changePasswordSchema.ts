import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "current_password_is_required"),
    newPassword: z
      .string()
      .min(6, "new_password_must_be_at_least_6_characters"),
    confirmPassword: z.string().min(6, "please_confirm_your_new_password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "passwords_do_not_match",
    path: ["confirmPassword"],
  });

export type TChangePassword = z.infer<typeof changePasswordSchema>;
