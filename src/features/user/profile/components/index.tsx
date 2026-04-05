import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";
import { profileSchema, type TProfileForm } from "../../schemas/profileSchema";
import userImg from "../../../../assets/images/User.png";
import { notifySuccess } from "../../../../lib/toast/notifySuccess";
import { useTranslation } from "react-i18next";
import Orders from "./ProfileOrders/Orders";
import ProfileActions from "./profileHeader.tsx/ProfileActions";
import ProfileHeader from "./profileHeader.tsx/ProfileHeader";
import ProfileForm from "./profileForm/ProfileForm";
import AsyncBoundary from "../../../../components/feedback/AsyncBoundary";
import ProfileHeaderSkeleton from "./skeleton/ProfileHeaderSkeleton";
import EmailSectionSkeleton from "./skeleton/EmailSectionSkeleton";
import { useProfilePageLogic } from "../hooks/useProfilePageLogic";
import { mapProfileToForm } from "../utils/mapProfileToForm";

const ProfilePage = () => {
  const { t } = useTranslation();
  const {
    isEditing,
    isAddressOpen,
    isSaving,
    profileData,
    profileLoading,
    profileError,
    ordersData,
    ordersLoading,
    ordersError,
    onEdit,
    toggleIsAddressOpen,
    onSubmit,
  } = useProfilePageLogic();

  const formMethods = useForm<TProfileForm>({
    resolver: zodResolver(profileSchema),
  });
  const { reset, handleSubmit } = formMethods;

  useEffect(() => {
    if (profileData) reset(mapProfileToForm(profileData));
  }, [profileData, reset]);

  return (
    <div className="w-full">
      <div className="bg-white my-12 w-[90%] mx-auto">
        <div className="h-25 bg-linear-to-r from-primary to-background"></div>

        <div className="p-4 sm:p-10 text-black!">
          <div className="h-41 flex flex-col md:flex-row items-center gap-5 sm:gap-0 sm:justify-between">
            <AsyncBoundary
              data={profileData}
              isLoading={profileLoading}
              error={profileError}
              loadingFallback={<ProfileHeaderSkeleton />}
              defaultFallbackOptions={{
                className: "w-70! h-25! p-0! space-y-1! mx-0! mb-2!",
              }}
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
              onEdit={() => onEdit(() => {})}
              onSave={handleSubmit(onSubmit)}
            />
          </div>

          <ProfileForm
            isEditing={isEditing}
            isSaving={isSaving}
            isAddressOpen={isAddressOpen}
            toggleIsAddressOpen={toggleIsAddressOpen}
            onSubmit={onSubmit}
            formMethods={formMethods}
          />

          <AsyncBoundary
            data={profileData}
            isLoading={profileLoading}
            error={profileError}
            loadingFallback={<EmailSectionSkeleton />}
            defaultFallbackOptions={{
              className: "mt-8 w-full! h-25! p-0! space-y-1! mx-0! mb-2!",
            }}
          >
            {(profile) => <EmailSection profile={profile} />}
          </AsyncBoundary>
          <PasswordSection />

          <AsyncBoundary
            data={ordersData}
            isLoading={ordersLoading}
            error={ordersError}
            loadingFallback={<EmailSectionSkeleton />}
            defaultFallbackOptions={{
              className: "mt-8 w-full! h-25! p-0! space-y-1! mx-0! mb-2!",
            }}
          >
            {(orders) => <Orders orders={orders} />}
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
