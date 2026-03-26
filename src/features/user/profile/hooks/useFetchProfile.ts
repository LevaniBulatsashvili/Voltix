import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../../../hooks/redux";
import type { IProfile } from "../../../../types/Profile";
import Query_Keys from "../../../../react-query/query-keys";
import { profileService } from "../api/profileService";
import { setProfile } from "../store/profile.slice";

export const useFetchProfile = () => {
  const dispatch = useAppDispatch();

  return useQuery<IProfile>({
    queryKey: [Query_Keys.getProfile],
    queryFn: async () => {
      const profile = await profileService.getProfile();
      if (!profile) throw new Error("Profile not found");
      dispatch(setProfile(profile));
      return profile;
    },
  });
};
