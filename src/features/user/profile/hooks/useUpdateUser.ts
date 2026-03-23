import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser } from "../../../../types/User";
import { userService } from "../../api/userService";
import Query_Keys from "../../../../react-query/query-keys";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<IUser>) => {
      return await userService.updateUser(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.getUser],
      });
    },
  });
};
