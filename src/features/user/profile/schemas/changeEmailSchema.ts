import z from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().email("invalid_email_address"),
  password: z.string().min(6, "enter_your_password"),
});

export type TChangeEmail = z.infer<typeof changeEmailSchema>;
