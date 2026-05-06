import { supabase } from "@/lib/supabase";
import { notifyError } from "@/lib/toast/notifyError";

export const deleteStorageImage = async (url: string, bucket: string) => {
  let path: string | undefined;
  try {
    path = new URL(url).pathname.split(
      `/storage/v1/object/public/${bucket}/`,
    )[1];
  } catch {
    console.warn("deleteStorageImage: invalid URL", url);
    return;
  }

  if (!path) return;

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([decodeURIComponent(path)]);
    if (error) throw new Error("failed_to_delete_image");
  } catch (error) {
    notifyError(error);
  }
};
