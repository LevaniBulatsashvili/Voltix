import { supabase } from "../lib/supabase";

export const uploadImage = async (file: File, bucket: string) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw new Error("failed_to_upload_image");

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
};
