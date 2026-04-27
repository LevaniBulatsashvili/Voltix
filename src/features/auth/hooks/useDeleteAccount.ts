import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/toast/toast";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/features/auth/store/auth.slice";
import { clearProfile } from "@/features/user/profile/store/profile.slice";

export const useDeleteAccount = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    meta: { hasToast: true },
    mutationFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      return notify.promise(
        fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`, {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        }).then(async (res) => {
          if (!res.ok) throw new Error(await res.text());
        }),
        {
          loading: "profile.deleting_account",
          success: "profile.account_deleted",
        },
      );
    },
    onSuccess: () => {
      dispatch(logout());
      dispatch(clearProfile());
      queryClient.clear();
      supabase.auth.signOut();
    },
  });
};
