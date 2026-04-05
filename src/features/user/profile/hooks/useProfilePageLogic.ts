import { useState } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { useUpdateAddress } from "./addressCRUD";
import { useFetchProfile, useUpdateProfile } from "./profileCRUD";
import type { TProfileForm } from "../../schemas/profileSchema";
import { notifySuccess } from "../../../../lib/toast/notifySuccess";
import { useTranslation } from "react-i18next";
import { mapProfileToForm } from "../utils/mapProfileToForm";
import { useFetchOrders } from "./ordersCRUD";

export const useProfilePageLogic = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useFetchProfile(user!.id);

  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useFetchOrders({ filters: { profile_id: user!.id } });

  const { mutateAsync: updateProfile, isPending: updateProfilePending } =
    useUpdateProfile();

  const { mutateAsync: updateAddress, isPending: updateAddressPending } =
    useUpdateAddress();

  const [isEditing, setIsEditing] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const isSaving =
    profileLoading || updateProfilePending || updateAddressPending;

  const onEdit = (reset: (data: TProfileForm) => void) => {
    if (isEditing && profileData) reset(mapProfileToForm(profileData));
    setIsEditing((prev) => !prev);
  };

  const toggleIsAddressOpen = () => setIsAddressOpen((prev) => !prev);

  const onSubmit = async (data: TProfileForm) => {
    try {
      const { address, ...rest } = data;

      if (rest) await updateProfile({ id: user!.id, ...rest });

      if (address)
        await updateAddress({ ...address, id: profileData!.addresses![0].id });

      setIsEditing(false);
      setIsAddressOpen(false);

      notifySuccess(t("profile.profile_successfully_updated"));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setIsEditing(false);
      setIsAddressOpen(false);
    }
  };

  return {
    profileData,
    profileLoading,
    profileError,
    ordersData,
    ordersLoading,
    ordersError,
    isEditing,
    isAddressOpen,
    isSaving,
    onEdit,
    toggleIsAddressOpen,
    onSubmit,
  };
};
