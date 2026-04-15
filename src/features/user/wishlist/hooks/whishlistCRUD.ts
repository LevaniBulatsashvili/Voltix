import { createEntityHooks } from "@/hooks/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { wishlistService } from "../services/whishlistService";

export const {
  useInfiniteFetchMany: useInfiniteFetchWishlistWithTotal,
  useFetchMany: useFetchWishlists,
  useFetch: useFetchWishlist,
  useCreate: useCreateWishlist,
  useUpdate: useUpdateWishlist,
  useDelete: useDeleteWishlist,
} = createEntityHooks(wishlistService, Query_Keys.wishlist);
