import z from "zod";
import { addressSchema } from "./addressSchema";

export const userSchema = z.object({
  id: z.string(),
  full_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  avatar_url: z.string().url().optional(),
  created_at: z.string(),
  address: addressSchema.optional(),
});

export type TUser = z.infer<typeof userSchema>;
