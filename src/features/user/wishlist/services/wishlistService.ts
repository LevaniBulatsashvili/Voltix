import { Query_Tables } from "@/lib/react-query/configs";
import { createSupabaseService } from "@/lib/supabase/createSupabaseService";
import type { ICreatePayload, IUpdatePayload } from "@/types/common/api";
import type { IWishlist } from "@/types/profile/wishlist";

export const wishlistService = createSupabaseService<
  IWishlist,
  ICreatePayload<IWishlist>,
  IUpdatePayload<IWishlist>,
  string
>({
  table: Query_Tables.wishlists,
  keyField: "id",
  serviceName: "wishlist",
});
