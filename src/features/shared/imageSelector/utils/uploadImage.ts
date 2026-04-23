import { supabase } from "@/lib/supabase";

export const uploadImage = async (file: File, bucket: string) => {
  const fileName = `${Date.now()}-${file.name}`;
  const isSvg = file.type === "image/svg+xml";

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      contentType: isSvg ? "image/svg+xml" : "image/webp",
      upsert: false,
    });

  if (error) throw new Error("failed_to_upload_image");

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
};
