import { useMutation } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/authService";
import { notify } from "@/lib/toast/toast";

export const useForgotPassword = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    meta: { hasToast: true },
    mutationFn: (email: string) => {
      return notify.promise(authService.sendPasswordResetEmail(email), {
        loading: "forgot_password.sending",
        success: "forgot_password.email_sent",
      });
    },
  });

  return { sendResetEmail: mutate, isPending, error, isSuccess };
};
