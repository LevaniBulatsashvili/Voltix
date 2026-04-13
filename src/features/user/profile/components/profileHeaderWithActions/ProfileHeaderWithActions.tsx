import ProfileHeader from "./ProfileHeader";
import ProfileActions from "./ProfileActions";
import userImg from "@/assets/images/User.png";
import type { IProfile } from "@/types/profile";
import type { UseFormHandleSubmit } from "react-hook-form";
import type { TProfileForm } from "../../schemas/profileSchema";
import { notifySuccess } from "@/lib/toast/notifySuccess";

interface IProfileHeaderWithActions {
  profile: IProfile;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSubmit: ReturnType<UseFormHandleSubmit<TProfileForm>>;
}

const ProfileHeaderWithActions = ({
  profile,
  isEditing,
  isSaving,
  onEdit,
  onSubmit,
}: IProfileHeaderWithActions) => {
  return (
    <div className="h-41 flex flex-col md:flex-row items-center gap-5 sm:gap-0 sm:justify-between">
      <ProfileHeader
        avatar={profile.avatar_url || userImg}
        id={profile.id}
        name={profile.full_name}
        email={profile.email}
        onAvatarSuccess={() =>
          notifySuccess("profile.image_successfully_updated")
        }
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
