import { useAppSelector } from "@/hooks/redux";
import { useFetchWishlists } from "./wishlistCRUD";
import { useMemo } from "react";

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

  const wishlistedIds = useMemo(
    () => new Set((query.data?.data ?? []).map((w) => w.product_id)),
    [query.data?.data],
  );

  const wishlistIdByProductId = useMemo(
    () => new Map((query.data?.data ?? []).map((w) => [w.product_id, w.id])),
    [query.data?.data],
  );

  return { wishlistedIds, wishlistIdByProductId, isLoading: query.isLoading };
}
