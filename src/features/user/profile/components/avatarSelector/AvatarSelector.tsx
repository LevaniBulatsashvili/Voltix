import { useState } from "react";
import { Camera } from "lucide-react";
import { useUploadAvatar } from "../../hooks/useUploadAvatar";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { deleteAvatar } from "../../hooks/deleteAvatar";
import { getPathFromUrl } from "../../utils/getPathFromUrl";
import Spinner from "../../../../../components/feedback/Spinner";

interface IAvatarSelector {
  currentAvatar: string;
  userId: string;
  disabled?: boolean;
  onUploadSuccess?: (url: string) => void;
}

const AvatarSelector = ({
  currentAvatar,
  userId,
  disabled = false,
  onUploadSuccess,
}: IAvatarSelector) => {
  const [preview, setPreview] = useState(currentAvatar);
  const [previousAvatar, setPreviousAvatar] = useState(currentAvatar);
  const { uploadAvatar, uploading } = useUploadAvatar();
  const { mutateAsync: updateUser } = useUpdateUser();

  const fileInputId = `avatar-upload-${userId}`;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedFile = e.target.files[0];

    setPreview(URL.createObjectURL(selectedFile));

    try {
      const avatarUrl = await uploadAvatar(selectedFile, userId);
      await updateUser({ avatar_url: avatarUrl });

      if (previousAvatar && previousAvatar.includes("/avatars/")) {
        const oldPath = getPathFromUrl(previousAvatar);
        if (oldPath) await deleteAvatar(oldPath);
      }

      setPreviousAvatar(avatarUrl);

      if (onUploadSuccess) onUploadSuccess(avatarUrl);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  return (
    <div className="relative size-18 sm:size-24">
      <label
        htmlFor={fileInputId}
        className="group block size-18 sm:size-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer relative"
      >
        <img
          src={preview}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
          <Camera className="size-4.5 sm:size-6 text-white group-hover:scale-110 transition-transform duration-200" />
        </div>
      </label>

      <input
        id={fileInputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full z-10">
          <Spinner containerClass="mt-0!" spinnerclass="size-8" />
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
