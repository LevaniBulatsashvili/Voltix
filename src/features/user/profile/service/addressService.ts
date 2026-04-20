import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IAddress } from "@/types/profile/profile";

export const addressService = createSupabaseService<
  IAddress,
  ICreatePayload<IAddress>,
  IUpdatePayload<IAddress>,
  string
>({
  table: Query_Tables.addresses,
  keyField: "id",
  serviceName: "address",
});
