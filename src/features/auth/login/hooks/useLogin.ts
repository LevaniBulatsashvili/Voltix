import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../../../hooks/redux";
import type { IAuthResponse, ILoginInput } from "../../../../types/Auth";
import { setSession, setUser } from "../../store/auth.slice";
import { authService } from "../../services/authService";
import { notifySuccess } from "../../../../lib/toast/notifySuccess";
import { notifyError } from "../../../../lib/toast/notifyError";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation<IAuthResponse, Error, ILoginInput>({
    mutationFn: ({ email, password }) =>
      authService.loginWithEmail(email, password),
    onSuccess: (data) => {
      if (data.user) dispatch(setUser(data.user));
      if (data.session) dispatch(setSession(data.session));

      notifySuccess("success.login");
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
