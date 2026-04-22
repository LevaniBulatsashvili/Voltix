import { z } from "zod";

const addressDraftSchema = z.object({
  address_line: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
});

export type AddressDraft = z.infer<typeof addressDraftSchema>;

const trimmed = (v?: string) => v?.trim() ?? "";

export const profileSchema = z
  .object({
    full_name: z.string().optional(),
    phone: z.string().optional(),
    address: addressDraftSchema.optional(),
  })
  .superRefine((data, ctx) => {
    const a = data.address;

    if (!a) return;

    const line = trimmed(a.address_line);
    const city = trimmed(a.city);
    const postal = trimmed(a.postal_code);
    const country = trimmed(a.country);

    const started =
      line.length > 0 ||
      city.length > 0 ||
      postal.length > 0 ||
      country.length > 0;

    if (!started) return;

    if (!line) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "validation.address_line_is_required",
        path: ["address", "address_line"],
      });
    }

    if (!city) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "validation.city_is_required",
        path: ["address", "city"],
      });
    }

    if (!postal) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "validation.postal_code_is_required",
        path: ["address", "postal_code"],
      });
    }

    if (country.length !== 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "validation.country_must_be_ISO_2-letter_code",
        path: ["address", "country"],
      });
    }
  });

export type TProfileForm = z.infer<typeof profileSchema>;
