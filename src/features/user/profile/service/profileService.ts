import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { IUpdatePayload } from "@/types/common/api";
import type { IProfile } from "@/types/profile/profile";

export const profileService = createSupabaseService<
  IProfile,
  Omit<IProfile, "created_at" | "addresses">,
  IUpdatePayload<IProfile>,
  string
>({
  table: Query_Tables.profiles,
  keyField: "id",
  serviceName: "profile",
  selectFieldOptions: {
    fetchSelectField: "*, addresses(*)",
    createSelectField: "*, addresses(*)",
    updateSelectField: "*, addresses(*)",
  },
});
