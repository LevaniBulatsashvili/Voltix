import { useQuery } from "@tanstack/react-query";
import type { IProfile } from "../../../../types/profile";
import Query_Keys from "../../../../react-query/query-keys";
import { notifyError } from "../../../../lib/toast/notifyError";
import fetchProfile from "../api/fetchProfile";

const useFetchProfile = () => {
  return useQuery<IProfile>({
    queryKey: [Query_Keys.getProfile],
    queryFn: async () => {
      try {
        return await fetchProfile();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        notifyError(message, true);
        throw error;
      }
    },
  });
};

export default useFetchProfile;
