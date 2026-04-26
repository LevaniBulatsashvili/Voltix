import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";

export const useLoginWithGoogle = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => authService.loginWithGoogle(),
  });

  return { loginWithGoogle: mutate, isPending };
};
