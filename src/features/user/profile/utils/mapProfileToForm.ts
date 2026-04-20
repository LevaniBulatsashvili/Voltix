import type { IProfile } from "@/types/profile/profile";
import type { TProfileForm } from "../schemas/profileSchema";

export const mapProfileToForm = (profile: IProfile): TProfileForm => ({
  full_name: profile.full_name ?? "",
  phone: profile.phone ?? "",
  address: {
    city: profile.addresses[0].city ?? "",
    postal_code: profile.addresses[0].postal_code ?? "",
    country: profile.addresses[0].country ?? "",
    address_line: profile.addresses[0].address_line ?? "",
  },
});
