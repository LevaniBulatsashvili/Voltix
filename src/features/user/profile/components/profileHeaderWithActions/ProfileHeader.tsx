import AvatarUploader from "./avatarUploader/AvatarUploader";
import ProfileInfo from "./ProfileInfo";

interface IProfileHeader {
  id: string;
  avatar: string;
  name?: string;
  email: string;
  onAvatarSuccess?: () => void;
}

const ProfileHeader = ({
  id,
  avatar,
  name,
  email,
  onAvatarSuccess,
}: IProfileHeader) => {
  return (
    <div className="flex self-start md:self-auto items-center gap-4 md:gap-6">
      <AvatarUploader
        currentAvatar={avatar}
        profileId={id}
        onUploadSuccess={onAvatarSuccess}
      />

      <ProfileInfo name={name} email={email} />
    </div>
  );
};

export default ProfileHeader;
