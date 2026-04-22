import { supabase } from "@/lib/supabase";
import { notifyError } from "@/lib/toast/notifyError";

export const deleteStorageImage = async (url: string, bucket: string) => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.split(
      `/storage/v1/object/public/${bucket}/`,
    )[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([decodeURIComponent(path)]);

    if (error) throw new Error("failed_to_delete_image");
  } catch (error) {
    notifyError(error);
  }
};
