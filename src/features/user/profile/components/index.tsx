import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { profileSchema, type TProfileForm } from "../schemas/profileSchema";
import ProfileOrders from "./profileOrders/ProfileOrders";
import ProfileForm from "./profileForm/ProfileForm";
import { useProfilePageLogic } from "../hooks/useProfilePageLogic";
import { mapProfileToForm } from "../utils/mapProfileToForm";
import { QueryBoundary } from "../../../../components/feedback/QueryBoundary";
import ProfileHeaderWithActions from "./profileHeaderWithActions/ProfileHeaderWithActions";
import ProfileHeaderWithActionsSkeleton from "./profileSkeleton/ProfileWithActionsSkeleton";
import ProfileSecuritySection from "./profileSecuritySection/profileSecuritySection";
import ProfileSecuritySectionSkeleton from "./profileSkeleton/ProfileSecuritySectionSkeleton";
import ProfileOrdersSkeleton from "./profileSkeleton/ProfileOrdersSkeleton";

const Profile = () => {
  const {
    isEditing,
    isAddressOpen,
    isSaving,
    profileQuery,
    ordersQuery,
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
    <div className="w-full">
      <div className="bg-white my-12 w-[90%] mx-auto">
        <div className="h-25 bg-linear-to-r from-primary to-background"></div>

        <div className="p-4 sm:p-10 text-black!">
          <QueryBoundary
            query={profileQuery}
            loadingFallback={<ProfileHeaderWithActionsSkeleton />}
            defaultFallbackOptions={{
              className: "w-70! h-25! p-0! space-y-1! mb-2!",
            }}
          >
            {(profile) => (
              <ProfileHeaderWithActions
                profile={profile}
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
              className: "mt-8 w-full! h-25! p-0! space-y-1! mx-0! mb-2!",
            }}
          >
            {(profile) => <ProfileSecuritySection profile={profile} />}
          </QueryBoundary>

          <QueryBoundary
            query={ordersQuery}
            loadingFallback={<ProfileOrdersSkeleton />}
            defaultFallbackOptions={{
              className: "mt-8 w-full! h-25! p-0! space-y-1! mx-0! mb-2!",
            }}
          >
            {(orders) => <ProfileOrders orders={orders} />}
          </QueryBoundary>
        </div>
      </div>
    </div>
  );
};

export default Profile;
