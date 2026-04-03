import { useState } from "react";
import Avatar from "../../../../../components/ui/Avatar";
import AvatarOverlay from "./AvatarOverlay";
import Spinner from "../../../../../components/feedback/Spinner";
import { useUploadAvatar } from "../../hooks/useUploadAvatar";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { deleteAvatar } from "../../hooks/deleteAvatar";
import { getPathFromUrl } from "../../utils/getPathFromUrl";

interface IAvatarUploader {
  currentAvatar: string;
  userId: string;
  disabled?: boolean;
  onUploadSuccess?: (url: string) => void;
}

const AvatarUploader = ({
  currentAvatar,
  userId,
  disabled,
  onUploadSuccess,
}: IAvatarUploader) => {
  const [preview, setPreview] = useState(currentAvatar);
  const [previousAvatar, setPreviousAvatar] = useState(currentAvatar);

  const { uploadAvatar, uploading } = useUploadAvatar();
  const { mutateAsync: updateUser } = useUpdateUser();

  const inputId = `avatar-${userId}`;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      const url = await uploadAvatar(file, userId);
      await updateUser({ avatar_url: url });

      if (previousAvatar?.includes("/avatars/")) {
        const oldPath = getPathFromUrl(previousAvatar);
        if (oldPath) await deleteAvatar(oldPath);
      }

      setPreviousAvatar(url);
      onUploadSuccess?.(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative size-18 sm:size-24">
      <label
        htmlFor={inputId}
        className="group block size-full rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer relative"
      >
        <Avatar src={preview} />
        <AvatarOverlay />
      </label>

      <input
        id={inputId}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled || uploading}
      />

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
          <Spinner containerClass="mt-0!" spinnerclass="size-8" />
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;
