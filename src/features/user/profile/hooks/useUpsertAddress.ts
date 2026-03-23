import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IAddress } from "../../../../types/User";
import { userService } from "../../api/userService";
import Query_Keys from "../../../../react-query/query-keys";

interface IUpsertAddress {
  id?: string;
  data: Omit<IAddress, "id" | "user_id">;
}

export const useUpsertAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: IUpsertAddress) => {
      if (id) return await userService.updateAddress({ id, ...data });
      return await userService.addAddress(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.getUser],
      });
    },
  });
};
