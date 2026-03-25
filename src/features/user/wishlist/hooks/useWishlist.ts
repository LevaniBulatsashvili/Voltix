import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "../services/wishlistService";
import Query_Keys from "../../../react-query/query-keys";

export const useWishlist = (userId: string) => {
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: [Query_Keys.wishlist, userId],
    queryFn: () => wishlistService.getWishlist(userId),
    enabled: !!userId,
  });

  const addMutation = useMutation({
    mutationFn: (productId: number) =>
      wishlistService.addToWishlist(userId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.wishlist, userId],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) =>
      wishlistService.removeFromWishlist(userId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.wishlist, userId],
      });
    },
  });

  return {
    ...wishlistQuery,
    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
  };
};
