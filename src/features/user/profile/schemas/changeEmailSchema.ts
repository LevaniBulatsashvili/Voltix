import z from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().email("validation.invalid_email_address"),
  password: z
    .string()
    .min(6, "validation.password_must_be_at_least_6_characters"),
});

export type TChangeEmail = z.infer<typeof changeEmailSchema>;
