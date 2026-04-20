import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "@/hooks/redux";
import {
  setUser,
  setLoading,
  setSession,
} from "@/features/auth/store/auth.slice";
import { mapUser } from "@/features/auth/utils/mapUser";
import type { Session } from "@supabase/supabase-js";
import {
  clearProfile,
  setProfile,
} from "@/features/user/profile/store/profile.slice";
import { profileService } from "@/features/user/profile/service/profileService";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleSession = async (session: Session | null) => {
      dispatch(setSession(session));

      if (!session?.user) {
        dispatch(clearProfile());
        return;
      }

      const profile = await profileService.fetch(session.user.id);

      if (!profile) {
        dispatch(clearProfile());
        return;
      }

      dispatch(setProfile(profile));
    };

    const restoreSession = async () => {
      dispatch(setLoading(true));

      const {
        data: { session },
      } = await supabase.auth.getSession();
      await handleSession(session);

      dispatch(setUser(mapUser(session?.user ?? null)));
      dispatch(setLoading(false));
    };
    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        handleSession(session); // check for bugs
        dispatch(setUser(mapUser(session?.user ?? null)));
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
