import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks/redux";
import type { IAuthResponse, ILoginInput } from "@/types/auth/auth";
import { notifySuccess } from "@/lib/toast/notifySuccess";
import { notifyError } from "@/lib/toast/notifyError";
import { authService } from "@/features/auth/services/authService";
import { setSession, setUser } from "@/features/auth/store/auth.slice";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation<IAuthResponse, Error, ILoginInput>({
    mutationFn: ({ email, password }) =>
      authService.loginWithEmail(email, password),
    onSuccess: (data) => {
      if (data.authUser) dispatch(setUser(data.authUser));

      if (data.session) dispatch(setSession(data.session));

      notifySuccess("login.welcome_back");
    },
    onError: (error) => notifyError(error),
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};
