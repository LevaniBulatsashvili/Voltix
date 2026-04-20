import { useAppSelector } from "@/hooks/redux";
import { useFetchWishlists } from "./wishlistCRUD";

export function useWishlistedIds() {
  const { profile } = useAppSelector((state) => state.profile);

  const query = useFetchWishlists(
    {
      filters: { eq: { profile_id: profile?.id ?? "" } },
      selectField: "id, product_id",
      limit: 1000,
    },
    !!profile,
  );

  const wishlistedIds = new Set(
    (query.data?.data ?? []).map((w) => w.product_id),
  );

  const wishlistIdByProductId = new Map(
    (query.data?.data ?? []).map((w) => [w.product_id, w.id]),
  );

  return { wishlistedIds, wishlistIdByProductId, isLoading: query.isLoading };
}
