import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const useUploadAvatar = () => {
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (file: File, profileId: string) => {
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${profileId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  return { uploadAvatar, uploading };
};
