import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/redux";
import { useCreateWishlist, useDeleteWishlist } from "./whishlistCRUD";
import type { IWishlist } from "@/types/user/whishlist";
import type { IDataResponse } from "@/types/common/api";
import { wishlistKeys } from "../utils/wishlistKeys";

export function useToggleWishlist() {
  const { user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { mutate: createWishlist } = useCreateWishlist();
  const { mutate: deleteWishlist } = useDeleteWishlist();

  const toggleWishlist = ({
    productId,
    isLiked,
    wishlistId,
  }: {
    productId: number;
    isLiked: boolean;
    wishlistId?: string;
  }) => {
    const idsKey = wishlistKeys.ids(user!.id);

    queryClient.setQueryData<
      IDataResponse<Pick<IWishlist, "id" | "product_id">>
    >(idsKey, (old) => {
      if (!old) return old;
      return {
        ...old,
        data: isLiked
          ? old.data.filter((w) => w.product_id !== productId)
          : [...old.data, { id: "optimistic", product_id: productId }],
      };
    });

    if (isLiked && wishlistId) {
      deleteWishlist(wishlistId, {
        onError: () => queryClient.invalidateQueries({ queryKey: idsKey }),
      });
    } else {
      createWishlist(
        { product_id: productId, profile_id: user!.id },
        {
          onError: () => queryClient.invalidateQueries({ queryKey: idsKey }),
          onSuccess: () => queryClient.invalidateQueries({ queryKey: idsKey }),
        },
      );
    }
  };

  return { toggleWishlist };
}
