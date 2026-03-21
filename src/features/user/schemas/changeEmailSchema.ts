import z from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Enter your password"),
});

export type TChangeEmail = z.infer<typeof changeEmailSchema>;
