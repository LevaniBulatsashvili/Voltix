import { useMutation, useQueryClient } from "@tanstack/react-query";
import Query_Keys from "../../../../react-query/query-keys";
import type { IProfile } from "../../../../types/Profile";
import { profileService } from "../api/profileService";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<IProfile>) => {
      return await profileService.updateProfile(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.getUser],
      });
    },
  });
};
