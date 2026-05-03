import { useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch } from "@/hooks/redux";
import {
  setUser,
  setLoading,
  setSession,
} from "@/features/auth/store/auth.slice";
import { mapUser } from "@/features/auth/utils/mapUser";
import {
  clearProfile,
  setProfile,
} from "@/features/user/profile/store/profile.slice";
import { profileService } from "@/features/user/profile/service/profileService";
import type { Session } from "@supabase/supabase-js";

const REFETCH_EVENTS = new Set(["TOKEN_REFRESHED", "USER_UPDATED"]);
const SIGNOUT_EVENTS = new Set(["SIGNED_OUT"]);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const applySession = useCallback(
    async (session: Session | null) => {
      if (!session?.user) {
        dispatch(setUser(null));
        dispatch(setSession(null));
        dispatch(clearProfile());
        return;
      }

      const profile = await profileService.fetch(session.user.id);
      dispatch(setUser(mapUser(session.user)));
      dispatch(setSession(session));
      if (profile) dispatch(setProfile(profile));
      else dispatch(clearProfile());
    },
    [dispatch],
  );

  useEffect(() => {
    let listener: { subscription: { unsubscribe: () => void } } | null = null;

    const init = async () => {
      dispatch(setLoading(true));
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await applySession(session);
      dispatch(setLoading(false));

      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (SIGNOUT_EVENTS.has(event)) {
            await applySession(null);
            return;
          }
          if (!REFETCH_EVENTS.has(event)) return;
          await applySession(session);
        },
      );

      listener = data;
    };

    init();

    return () => listener?.subscription.unsubscribe();
  }, [dispatch, applySession]);

  return <>{children}</>;
};

export default AuthProvider;
