import { useAppDispatch } from "./redux";
import { logout } from "../features/auth/store/auth.slice";
import { supabase } from "../lib/supabase";
import { client } from "../lib/react-query/client";
import { clearProfile } from "../features/user/profile/store/profile.slice";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      client.clear();
      dispatch(logout());
      dispatch(clearProfile());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { signOut };
};
