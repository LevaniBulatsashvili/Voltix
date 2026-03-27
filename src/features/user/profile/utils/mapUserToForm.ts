import type { IUser } from "../../../../types/profile";
import type { TUserForm } from "../../schemas/userSchema";

export const mapUserToForm = (user: IUser): TUserForm => ({
  full_name: user.full_name ?? "",
  phone: user.phone ?? "",
  address: {
    city: user.address?.city ?? "",
    postal_code: user.address?.postal_code ?? "",
    country: user.address?.country ?? "",
    address_line: user.address?.address_line ?? "",
  },
});
