import { useMutation } from "@tanstack/react-query";
import type { IAuthResponse, IRegisterInput } from "@/types/auth/auth";
import { authService } from "@/features/auth/services/authService";
import { useAppDispatch } from "@/hooks/redux";
import { setSession, setUser } from "@/features/auth/store/auth.slice";
import { notifySuccess } from "@/lib/toast/notifySuccess";
import { notifyError } from "@/lib/toast/notifyError";

export const useRegister = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation<IAuthResponse, Error, IRegisterInput>({
    meta: { hasToast: true },
    mutationFn: ({ email, password }) =>
      authService.registerWithEmail(email, password),
    onSuccess: (data) => {
      if (data.authUser) dispatch(setUser(data.authUser));
      if (data.session) dispatch(setSession(data.session));

      notifySuccess("register.account_created_check_your_email");
    },
    onError: (error) => notifyError(error),
  });

  return {
    register: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};
