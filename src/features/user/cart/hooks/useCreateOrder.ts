import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/createOrder";
import { notifyError } from "@/lib/toast/notifyError";
import { notifySuccess } from "@/lib/toast/notifySuccess";
import type { IOrder } from "@/types/profile/profile";
import { useAppDispatch } from "@/hooks/redux";
import { clearCart } from "../store/cart.slice";

export const useCreateOrder = () => {
  const dispatch = useAppDispatch();

  return useMutation<
    void,
    Error,
    Omit<IOrder, "id" | "status" | "created_at" | "updated_at">
  >({
    mutationFn: (order) => createOrder({ ...order }),

    onSuccess: () => {
      notifySuccess("Order placed successfully!");
      dispatch(clearCart());
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      notifyError(message);
    },
  });
};
