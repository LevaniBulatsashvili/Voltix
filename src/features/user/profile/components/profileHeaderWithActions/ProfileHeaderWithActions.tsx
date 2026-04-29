import ProfileHeader from "./ProfileHeader";
import ProfileActions from "./ProfileActions";
import type { IProfile } from "@/types/profile/profile";
import type { UseFormHandleSubmit } from "react-hook-form";
import type { TProfileForm } from "../../schemas/profileSchema";

interface IProfileHeaderWithActions {
  profile: IProfile;
  email: string;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSubmit: ReturnType<UseFormHandleSubmit<TProfileForm>>;
}

const ProfileHeaderWithActions = ({
  profile,
  email,
  isEditing,
  isSaving,
  onEdit,
  onSubmit,
}: IProfileHeaderWithActions) => {
  return (
    <div className="h-41 flex flex-col md:flex-row items-center gap-5 sm:gap-0 sm:justify-between">
      <ProfileHeader
        avatar={profile.avatar_url || "/images/placeholders/user.webp"}
        id={profile.id}
        name={profile.full_name}
        email={email}
      />

      <ProfileActions
        isEditing={isEditing}
        isSaving={isSaving}
        onEdit={onEdit}
        onSave={onSubmit}
      />
    </div>
  );
};

export default ProfileHeaderWithActions;
