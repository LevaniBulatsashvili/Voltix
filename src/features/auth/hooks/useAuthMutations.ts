import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { notifySuccess } from "../../../lib/toast/notifySuccess";
import type { IAuthResponse } from "../../../types/Auth";

interface LoginVariables {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<IAuthResponse, unknown, LoginVariables>({
    mutationFn: ({ email, password }: LoginVariables) =>
      authService.loginWithEmail(email, password),
    onSuccess: () => notifySuccess("success.login"),
  });
};

interface RegisterVariables {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation<IAuthResponse, unknown, RegisterVariables>({
    mutationFn: ({ email, password }: RegisterVariables) =>
      authService.registerWithEmail(email, password),
    onSuccess: () => notifySuccess("success.register"),
  });
};
