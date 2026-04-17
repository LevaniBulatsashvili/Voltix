import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { profileSchema, type TProfileForm } from "../schemas/profileSchema";
import ProfileForm from "./profileForm/ProfileForm";
import { useProfilePageLogic } from "../hooks/useProfilePageLogic";
import { mapProfileToForm } from "../utils/mapProfileToForm";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import ProfileHeaderWithActions from "./profileHeaderWithActions/ProfileHeaderWithActions";
import ProfileHeaderWithActionsSkeleton from "./profileSkeleton/ProfileWithActionsSkeleton";
import ProfileSecuritySection from "./profileSecuritySection/profileSecuritySection";
import ProfileSecuritySectionSkeleton from "./profileSkeleton/ProfileSecuritySectionSkeleton";
import PageWrapper from "@/components/ui/PageWrapper";

const Profile = () => {
  const {
    isEditing,
    isAddressOpen,
    isSaving,
    profileQuery,
    onEdit,
    toggleIsAddressOpen,
    onSubmit,
  } = useProfilePageLogic();

  const formMethods = useForm<TProfileForm>({
    resolver: zodResolver(profileSchema),
  });
  const { reset, handleSubmit } = formMethods;

  useEffect(() => {
    if (profileQuery.data) reset(mapProfileToForm(profileQuery.data));
  }, [profileQuery.data, reset]);

  return (
    <PageWrapper>
      <div className="h-25 bg-linear-to-r from-primary to-background"></div>

      <div className="p-4 sm:p-10 text-black!">
        <QueryBoundary
          query={profileQuery}
          loadingFallback={<ProfileHeaderWithActionsSkeleton />}
          defaultFallbackOptions={{
            className: "h-40 p-0! space-y-1! mb-2!",
          }}
        >
          {(profileArr) => (
            <ProfileHeaderWithActions
              profile={profileArr[0]}
              isEditing={isEditing}
              isSaving={isSaving}
              onEdit={() => onEdit(() => {})}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </QueryBoundary>

        <ProfileForm
          isEditing={isEditing}
          isSaving={isSaving}
          isAddressOpen={isAddressOpen}
          toggleIsAddressOpen={toggleIsAddressOpen}
          onSubmit={onSubmit}
          formMethods={formMethods}
        />

        <QueryBoundary
          query={profileQuery}
          loadingFallback={<ProfileSecuritySectionSkeleton />}
          defaultFallbackOptions={{
            className: "mt-8 h-60 space-y-1! mb-14!",
          }}
        >
          {(profileArr) => <ProfileSecuritySection profile={profileArr[0]} />}
        </QueryBoundary>
      </div>
    </PageWrapper>
  );
};

export default Profile;
