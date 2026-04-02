import { supabase } from "../../../../lib/supabase";
import type { IProfile } from "../../../../types/profile";

const fetchProfile = async (): Promise<IProfile> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("user not found");

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*, address(*)")
    .eq("id", user.id)
    .single();

  if (profileError || !profileData) throw new Error("profile not found");
  const address = profileData.address?.[0];

  return { ...profileData, address };
};

export default fetchProfile;
