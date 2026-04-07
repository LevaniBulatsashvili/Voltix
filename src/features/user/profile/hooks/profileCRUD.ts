import { createEntityHooks } from "../../../../hooks/createEntityHooks";
import { Query_Keys } from "../../../../lib/react-query/configs";
import { profileService } from "../service/profileService";

export const {
  useFetchMany: useFetchProfiles,
  useFetch: useFetchProfile,
  useCreate: useCreateProfile,
  useUpdate: useUpdateProfile,
  useDelete: useDeleteProfile,
} = createEntityHooks(profileService, Query_Keys.profile);