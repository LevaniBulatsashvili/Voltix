import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/registerUser";
import { useLogin } from "../../login/hooks/useLogin";

interface IRegisterInput {
  email: string;
  password: string;
}

export const useRegister = () => {
  const loginMutation = useLogin();

  const mutation = useMutation({
    mutationFn: ({ email, password }: IRegisterInput) =>
      registerUser(email, password),

    onSuccess: (_data, variables) => {
      loginMutation.login({
        email: variables.email,
        password: variables.password,
      });
    },
  });

  return {
    register: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
