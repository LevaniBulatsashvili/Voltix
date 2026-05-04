import { useCallback } from "react";
import { useWishlistedIds } from "./useFetchWishlistIds";
import { useToggleWishlist } from "./useToggleWishlist";

export function useWishlist() {
  const { wishlistedIds, wishlistIdByProductId } = useWishlistedIds();
  const toggle = useToggleWishlist();

  const isLiked = useCallback(
    (productId: number) => wishlistedIds.has(productId),
    [wishlistedIds],
  );

  const getWishlistId = useCallback(
    (productId: number) => wishlistIdByProductId.get(productId),
    [wishlistIdByProductId],
  );

  const toggleWishlist = useCallback(
    (productId: number) =>
      toggle.toggleWishlist({
        productId,
        isLiked: wishlistedIds.has(productId),
        wishlistId: wishlistIdByProductId.get(productId),
      }),
    [wishlistedIds, wishlistIdByProductId, toggle],
  );

  return {
    isLiked,
    getWishlistId,
    toggleWishlist,
  };
}
