import { supabase } from "../../../../lib/supabase";

export const deleteAvatar = async (filePath: string) => {
  if (!filePath) return;
  const { error } = await supabase.storage.from("avatars").remove([filePath]);
  if (error) throw error;
};
