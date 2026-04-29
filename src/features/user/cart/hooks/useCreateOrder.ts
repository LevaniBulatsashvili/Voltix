import { useMutation } from "@tanstack/react-query";
import { createOrder, type CreateOrderInput } from "../api/createOrder";
import { notifyError } from "@/lib/toast/notifyError";
import { notifySuccess } from "@/lib/toast/notifySuccess";
import { useAppDispatch } from "@/hooks/redux";
import { clearCart } from "../store/cart.slice";

export const useCreateOrder = () => {
  const dispatch = useAppDispatch();

  return useMutation<void, Error, CreateOrderInput>({
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
