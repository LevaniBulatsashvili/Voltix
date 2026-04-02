import type { IProfile } from "../../../../types/profile";
import type { TUserForm } from "../../schemas/userSchema";

export const mapUserToForm = (profile: IProfile): TUserForm => ({
  full_name: profile.full_name ?? "",
  phone: profile.phone ?? "",
  address: {
    city: profile.address?.city ?? "",
    postal_code: profile.address?.postal_code ?? "",
    country: profile.address?.country ?? "",
    address_line: profile.address?.address_line ?? "",
  },
});
