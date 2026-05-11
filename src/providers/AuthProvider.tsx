import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setUser,
  setLoading,
  setSession,
} from "@/features/auth/store/auth.slice";
import { mapUser } from "@/features/auth/utils/mapUser";
import {
  clearProfile,
  setProfile,
  setProfileLoading,
} from "@/features/user/profile/store/profile.slice";
import { profileService } from "@/features/user/profile/service/profileService";
import type { Session } from "@supabase/supabase-js";
import { notifyError } from "@/lib/toast/notifyError";

const REFETCH_EVENTS = new Set([
  "TOKEN_REFRESHED",
  "USER_UPDATED",
  "SIGNED_IN",
]);
const SIGNOUT_EVENTS = new Set(["SIGNED_OUT"]);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  const currentUserIdRef = useRef(currentUserId);
  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  const applySession = useCallback(
    async (session: Session | null, currentUserId?: string) => {
      if (!session?.user) {
        dispatch(setUser(null));
        dispatch(setSession(null));
        dispatch(clearProfile());
        return;
      }

      if (session.user.id === currentUserId) return;

      dispatch(setProfileLoading(true));
      try {
        const fetchedProfile = await profileService.fetch(session.user.id);
        dispatch(setUser(mapUser(session.user)));
        dispatch(setSession(session));
        if (fetchedProfile) dispatch(setProfile(fetchedProfile));
        else dispatch(clearProfile());
      } catch (error) {
        notifyError(error);
      } finally {
        dispatch(setProfileLoading(false));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    let listener: { subscription: { unsubscribe: () => void } } | null = null;

    const init = async () => {
      dispatch(setLoading(true));
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        await applySession(session);
      } finally {
        dispatch(setLoading(false));
      }

      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (SIGNOUT_EVENTS.has(event)) {
            await applySession(null);
            return;
          }
          if (REFETCH_EVENTS.has(event))
            await applySession(session, currentUserIdRef.current);
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
