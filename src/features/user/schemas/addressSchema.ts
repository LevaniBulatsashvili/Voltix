import { z } from "zod";

export const addressSchema = z.object({
  address_line: z.string().min(1),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().min(2).max(2),
});

export const optionalAddressSchema = z
  .object({
    address: addressSchema.optional(),
  })
  .optional();

export type TOptionalAddress = z.infer<typeof optionalAddressSchema>;
