import { useQuery } from "@tanstack/react-query";
import Query_Keys from "../react-query/query-keys";
import type { IUser } from "../types/User";
import { userService } from "../features/user/api/userService";

export const useCurrentUser = () => {
  return useQuery<IUser | null>({
    queryKey: [Query_Keys.getUser],
    queryFn: async () => {
      return await userService.getUser();
    },
    staleTime: 1000 * 60 * 5,
  });
};
