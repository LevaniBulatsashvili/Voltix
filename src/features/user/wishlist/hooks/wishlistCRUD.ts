import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { wishlistService } from "../services/wishlistService";

export const {
  useInfiniteFetchMany: useInfiniteFetchWishlistWithTotal,
  useFetchMany: useFetchWishlists,
  useFetch: useFetchWishlist,
  useCreate: useCreateWishlist,
  useUpdate: useUpdateWishlist,
  useDelete: useDeleteWishlist,
} = createEntityHooks(
  wishlistService,
  Query_Keys.wishlist,
  Query_Keys.wishlist,
);
