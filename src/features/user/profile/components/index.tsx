import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { profileSchema, type TProfileForm } from "../schemas/profileSchema";
import ProfileForm from "./profileForm/ProfileForm";
import { useProfilePageLogic } from "../hooks/useProfilePageLogic";
import { mapProfileToForm } from "../utils/mapProfileToForm";
import ProfileHeaderWithActions from "./profileHeaderWithActions/ProfileHeaderWithActions";
import ProfileSecuritySection from "./profileSecuritySection/profileSecuritySection";
import PageWrapper from "@/components/ui/PageWrapper";

const Profile = () => {
  const {
    user,
    isEditing,
    isAddressOpen,
    isSaving,
    profile,
    onEdit,
    toggleIsAddressOpen,
    onSubmit,
  } = useProfilePageLogic();

  const formMethods = useForm<TProfileForm>({
    resolver: zodResolver(profileSchema),
  });
  const { reset, handleSubmit } = formMethods;

  useEffect(() => {
    if (profile) reset(mapProfileToForm(profile));
  }, [profile, reset]);

  return (
    <PageWrapper>
      <div className="h-25 bg-linear-to-r from-primary to-background"></div>

      <div className="p-4 sm:p-10 text-primary bg-background border border-primary/50 border-t-0 border-r-primary/30 ">
        <ProfileHeaderWithActions
          profile={profile!}
          email={user!.email!}
          isEditing={isEditing}
          isSaving={isSaving}
          onEdit={() => onEdit(() => {})}
          onSubmit={handleSubmit(onSubmit)}
        />

        <ProfileForm
          isEditing={isEditing}
          isSaving={isSaving}
          isAddressOpen={isAddressOpen}
          toggleIsAddressOpen={toggleIsAddressOpen}
          onSubmit={onSubmit}
          formMethods={formMethods}
        />

        <ProfileSecuritySection
          email={user!.email}
          createdAt={user!.created_at}
        />
      </div>
    </PageWrapper>
  );
};

export default Profile;
