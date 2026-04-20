import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setSession, setUser } from "../../store/auth.slice";
import { supabase } from "@/lib/supabase";

export const useSyncSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        dispatch(
          setUser({
            id: session.user.id,
            email: session.user.email!,
            email_verified: session.user.email_confirmed_at != null,
            created_at: session.user.created_at,
          }),
        );
        dispatch(setSession(session));
      } else {
        dispatch(setUser(null));
        dispatch(setSession(null));
      }
    };

    fetchSession();
  }, [dispatch]);
};
