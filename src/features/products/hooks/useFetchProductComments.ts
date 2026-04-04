import { useQuery } from "@tanstack/react-query";
import {
  fetchProductComments,
  type IFetchProductCommentsOptions,
  type IProductCommentsResponse,
} from "../../product/api/fetchProductComments";
import Query_Keys from "../../../react-query/query-keys";

export const useFetchProductComments = (
  options: IFetchProductCommentsOptions,
) => {
  return useQuery<IProductCommentsResponse>({
    queryKey: [Query_Keys.getProductComments, options],
    queryFn: () => fetchProductComments(options),
    meta: {
      keepPreviousData: true,
    },
  });
};
