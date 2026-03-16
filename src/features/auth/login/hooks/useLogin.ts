import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/loginUser";
import { useAppDispatch } from "../../../../hooks/redux";
import { setUser } from "../../store/auth.slice";

interface ILoginInput {
  email: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: ({ email, password }: ILoginInput) =>
      loginUser(email, password),

    onSuccess: (data) => {
      dispatch(setUser(data.user));
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
