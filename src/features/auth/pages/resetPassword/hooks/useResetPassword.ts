import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/toast/toast";

export const useResetPassword = () => {
  const [isReady, setIsReady] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsReady(true);
      else setIsInvalid(true);
    });
  }, []);

  const { mutate, isPending, error } = useMutation({
    meta: { hasToast: true },
    mutationFn: (password: string) => {
      return notify.promise(
        supabase.auth.updateUser({ password }).then(({ error }) => {
          if (error) throw error;
        }),
        {
          loading: "reset_password.updating",
          success: "reset_password.updated",
          error: "errors.failed_to_reset_password",
        },
      );
    },
  });

  return { resetPassword: mutate, isPending, error, isReady, isInvalid };
};
