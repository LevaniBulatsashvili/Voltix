import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useUpdateAddress } from "./addressCRUD";
import { useUpdateProfile } from "./profileCRUD";
import type { TProfileForm } from "../schemas/profileSchema";
import { mapProfileToForm } from "../utils/mapProfileToForm";

const compareObjects = (a: unknown, b: unknown) =>
  JSON.stringify(a, Object.keys(a as object).sort()) ===
  JSON.stringify(b, Object.keys(b as object).sort());

export const useProfilePageLogic = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { profile, loading: profileLoading } = useAppSelector(
    (state) => state.profile,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [lastSavedForm, setLastSavedForm] = useState<TProfileForm | null>(null);

  const { mutateAsync: updateProfile, isPending: updateProfilePending } =
    useUpdateProfile();
  const { mutateAsync: updateAddress, isPending: updateAddressPending } =
    useUpdateAddress();

  const isSaving =
    profileLoading || updateProfilePending || updateAddressPending;

  const onEdit = (reset: (data: TProfileForm) => void) => {
    if (isEditing && profile) reset(mapProfileToForm(profile));
    setIsEditing((prev) => !prev);
  };

  const toggleIsAddressOpen = () => setIsAddressOpen((prev) => !prev);

  const closeEditState = () => {
    setIsEditing(false);
    setIsAddressOpen(false);
  };

  const onSubmit = async (data: TProfileForm) => {
    try {
      const { address, ...rest } = data;
      const { address: originalAddress, ...originalRest } =
        lastSavedForm ?? mapProfileToForm(profile!);

      if (!compareObjects(rest, originalRest))
        await updateProfile({ id: profile!.id, ...rest });

      if (address && !compareObjects(address, originalAddress))
        await updateAddress({ ...address, id: profile!.addresses[0].id });

      setLastSavedForm(data);
      closeEditState();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      closeEditState();
    }
  };

  return {
    profile,
    user,
    isEditing,
    isAddressOpen,
    isSaving,
    onEdit,
    toggleIsAddressOpen,
    onSubmit,
  };
};
