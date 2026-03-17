import { useMutation } from "@tanstack/react-query";
import type { IAuthResponse, IRegisterInput } from "../../../../types/Auth";
import { authService } from "../../services/authService";
import { useAppDispatch } from "../../../../hooks/redux";
import { setSession, setUser } from "../../store/auth.slice";

export const useRegister = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation<IAuthResponse, Error, IRegisterInput>({
    mutationFn: ({ email, password }) =>
      authService.registerWithEmail(email, password),
    onSuccess: (data) => {
      if (data.user) dispatch(setUser(data.user));
      if (data.session) dispatch(setSession(data.session));
    },
  });

  return {
    register: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};
