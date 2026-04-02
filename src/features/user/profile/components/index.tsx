import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";
import { userFormSchema, type TUserForm } from "../../schemas/userSchema";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUpsertAddress } from "../hooks/useUpsertAddress";
import { mapUserToForm } from "../utils/mapUserToForm";
import type { IAddress } from "../../../../types/profile";
import userImg from "../../../../assets/images/User.png";
import { notifySuccess } from "../../../../lib/toast/notifySuccess";
import { useTranslation } from "react-i18next";
import { notifySupabaseError } from "../../../../lib/toast/notifySupabaseError";
import Orders from "./ProfileOrders/Orders";
import useFetchProfile from "../hooks/useFetchProfile";
import ProfileActions from "./profileHeader.tsx/ProfileActions";
import ProfileHeader from "./profileHeader.tsx/ProfileHeader";
import ProfileForm from "./profileForm/ProfileForm";
import AsyncBoundary from "../../../../components/feedback/AsyncBoundary";
import ProfileHeaderSkeleton from "./skeleton/ProfileHeaderSkeleton";
import EmailSectionSkeleton from "./skeleton/EmailSectionSkeleton";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const { data: profileData, isLoading } = useFetchProfile();

  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();

  const { mutateAsync: upsertAddress, isPending: isUpdatingAddress } =
    useUpsertAddress();

  const isSaving = isUpdatingUser || isUpdatingAddress;

  const formMethods = useForm<TUserForm>({
    resolver: zodResolver(userFormSchema),
  });

  const { reset, handleSubmit } = formMethods;

  useEffect(() => {
    if (profileData) reset(mapUserToForm(profileData));
  }, [profileData, reset]);

  const onEdit = () => {
    if (isEditing && profileData) reset(mapUserToForm(profileData));

    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (data: TUserForm) => {
    try {
      const { address, ...rest } = data;

      if (rest) await updateUser(rest);
      if (address)
        await upsertAddress({
          id: profileData?.address?.id,
          data: address as Omit<IAddress, "id" | "user_id">,
        });

      setIsEditing(false);
      setIsAddressOpen(false);

      notifySuccess(t("profile.profile_successfully_updated"));
    } catch (err) {
      notifySupabaseError(err);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white my-12 w-[90%] mx-auto">
        <div className="h-25 bg-linear-to-r from-primary to-background"></div>

        <div className="p-4 sm:p-10 text-black!">
          <div className="h-41 flex flex-col md:flex-row items-center gap-5 sm:gap-0 sm:justify-between">
            <AsyncBoundary
              data={profileData}
              isLoading={isLoading}
              loadingFallback={<ProfileHeaderSkeleton />}
            >
              {(profile) => (
                <ProfileHeader
                  avatar={profile.avatar_url || userImg}
                  id={profile.id}
                  name={profile.full_name}
                  email={profile.email}
                  onAvatarSuccess={() =>
                    notifySuccess(t("profile.image_successfully_updated"))
                  }
                />
              )}
            </AsyncBoundary>

            <ProfileActions
              isEditing={isEditing}
              isSaving={isSaving}
              onEdit={onEdit}
              onSave={handleSubmit(onSubmit)}
            />
          </div>

          <ProfileForm
            isEditing={isEditing}
            isSaving={isSaving}
            isAddressOpen={isAddressOpen}
            toggleIsAddressOpen={() => setIsAddressOpen((prev) => !prev)}
            onSubmit={onSubmit}
            formMethods={formMethods}
          />

          <AsyncBoundary
            data={profileData}
            isLoading={isLoading}
            loadingFallback={<EmailSectionSkeleton />}
          >
            {(profile) => <EmailSection profile={profile} />}
          </AsyncBoundary>
          <PasswordSection />

          <Orders />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
