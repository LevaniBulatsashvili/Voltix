import { useQuery } from "@tanstack/react-query";
import type { IProfile } from "../../../../types/profile";
import Query_Keys from "../../../../react-query/query-keys";
import fetchProfile from "../api/fetchProfile";

const useFetchProfile = () => {
  return useQuery<IProfile>({
    queryKey: [Query_Keys.getProfile],
    queryFn: fetchProfile,
  });
};

export default useFetchProfile;
