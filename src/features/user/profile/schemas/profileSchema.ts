import { z } from "zod";

const addressDraftSchema = z.object({
  address_line: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z
    .string()
    .transform((val) => val.toUpperCase())
    .optional(),
});

type AddressDraft = z.infer<typeof addressDraftSchema>;

const trimmedLen = (s: string | undefined) => s?.trim().length ?? 0;

const addressStarted = (a: AddressDraft) =>
  trimmedLen(a.address_line) > 0 ||
  trimmedLen(a.city) > 0 ||
  trimmedLen(a.postal_code) > 0 ||
  trimmedLen(a.country) > 0;

const requireIfStarted =
  (check: (a: AddressDraft) => boolean) =>
  (data: { address?: AddressDraft }) => {
    const a = data.address;
    if (!a || !addressStarted(a)) return true;
    return check(a);
  };

export const profileSchema = z
  .object({
    full_name: z.string().optional(),
    phone: z.string().optional(),
    address: addressDraftSchema.optional(),
  })
  .refine(
    requireIfStarted((a) => trimmedLen(a.address_line) > 0),
    {
      error: "address_line_is_required",
      path: ["address", "address_line"],
    },
  )
  .refine(
    requireIfStarted((a) => trimmedLen(a.city) > 0),
    {
      error: "city_is_required",
      path: ["address", "city"],
    },
  )
  .refine(
    requireIfStarted((a) => trimmedLen(a.postal_code) > 0),
    {
      error: "postal_code_is_required",
      path: ["address", "postal_code"],
    },
  )
  .refine(
    requireIfStarted((a) => trimmedLen(a.country) === 2),
    {
      error: "country_must_be_ISO_2-letter_code",
      path: ["address", "country"],
    },
  );

export type TProfileForm = z.infer<typeof profileSchema>;
