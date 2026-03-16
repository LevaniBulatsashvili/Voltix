import { useAppDispatch } from "./redux";
import { logout } from "../features/auth/store/auth.slice";
import { supabase } from "../lib/supabase";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const signOut = async () => {
    await supabase.auth.signOut();
    dispatch(logout());
  };

  return { signOut };
};
