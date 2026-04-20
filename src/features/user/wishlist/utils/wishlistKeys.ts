import { Query_Keys } from "@/lib/react-query/configs";

export const wishlistKeys = {
  all: () => [Query_Keys.wishlist] as const,

  ids: (profileId: string) =>
    [
      Query_Keys.wishlist,
      {
        filters: { eq: { profile_id: profileId } },
        selectField: "id, product_id",
        limit: 1000,
      },
    ] as const,
};
