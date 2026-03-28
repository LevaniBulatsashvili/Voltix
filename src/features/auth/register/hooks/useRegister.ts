import { useMutation } from "@tanstack/react-query";
import type { IAuthResponse, IRegisterInput } from "../../../../types/auth";
import { authService } from "../../services/authService";
import { useAppDispatch } from "../../../../hooks/redux";
import { setSession, setUser } from "../../store/auth.slice";
import { notifySuccess } from "../../../../lib/toast/notifySuccess";
import { notifyError } from "../../../../lib/toast/notifyError";

export const useRegister = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation<IAuthResponse, Error, IRegisterInput>({
    mutationFn: ({ email, password }) =>
      authService.registerWithEmail(email, password),
    onSuccess: (data) => {
      if (data.authUser) dispatch(setUser(data.authUser));
      if (data.session) dispatch(setSession(data.session));

      notifySuccess("success.register");
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
