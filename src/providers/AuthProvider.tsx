import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAppDispatch } from "../hooks/redux";
import { setUser, setLoading } from "../features/auth/store/auth.slice";
import { mapUser } from "../utils/mapUser";
import type { Session } from "@supabase/supabase-js";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      dispatch(setLoading(true));
      const {
        data: { session },
      } = await supabase.auth.getSession();

      dispatch(setUser(mapUser(session?.user ?? null)));
      dispatch(setLoading(false));
    };
    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        dispatch(setUser(mapUser(session?.user ?? null)));
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
