import { useQuery } from "@tanstack/react-query";
import { fetchProductComments } from "../api/fetchProductComments";
import type { IProductComment } from "../types/product";

export const useFetchProductComments = (offset: number, limit: number) => {
  return useQuery<{ comments: IProductComment[]; total: number }>({
    queryKey: ["comments", offset, limit],
    queryFn: () => fetchProductComments(offset, limit),
    meta: {
      keepPreviousData: true,
    },
  });
};
