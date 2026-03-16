import { supabase } from "../lib/supabase";

export const uploadImage = async (file: File, bucket: string) => {
  const fileName = `${Date.now()}-${file.name}`;
  console.log(file);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
};
