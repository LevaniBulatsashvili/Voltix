import { useAppSelector } from "@/hooks/redux";
import { useFetchWishlists } from "./whishlistCRUD";

export function useWishlistedIds() {
  const { user } = useAppSelector((state) => state.auth);

  const query = useFetchWishlists({
    filters: { eq: { profile_id: user!.id } },
    selectField: "id, product_id",
    limit: 1000,
  });

  const wishlistedIds = new Set(
    (query.data?.data ?? []).map((w) => w.product_id),
  );

  const wishlistIdByProductId = new Map(
    (query.data?.data ?? []).map((w) => [w.product_id, w.id]),
  );

  return { wishlistedIds, wishlistIdByProductId, isLoading: query.isLoading };
}
