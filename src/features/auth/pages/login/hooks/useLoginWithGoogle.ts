import { authService } from "@/features/auth/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useLoginWithGoogle = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => authService.loginWithGoogle(),
  });

  return { loginWithGoogle: mutate, isPending };
};
