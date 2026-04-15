import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks/redux";
import type { IAuthResponse, ILoginInput } from "@/types/auth/auth";
import { setSession, setUser } from "../../store/auth.slice";
import { authService } from "../../services/authService";
import { notifySuccess } from "@/lib/toast/notifySuccess";
import { notifyError } from "@/lib/toast/notifyError";
import { client } from "@/lib/react-query/client";
import { Query_Keys } from "@/lib/react-query/configs";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation<IAuthResponse, Error, ILoginInput>({
    mutationFn: ({ email, password }) =>
      authService.loginWithEmail(email, password),
    onSuccess: (data) => {
      if (data.authUser) dispatch(setUser(data.authUser));

      if (data.user) {
        client.setQueryData([Query_Keys.getUser], data.user);
      }

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
