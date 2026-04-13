import { createPersistenceMiddleware } from "@/store/utils/createPersistenceMiddleware";
import { cartStorage } from "./cart.storage";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  type ICartState,
} from "./cart.slice";
import type { RootState } from "@/store";

export const cartMiddleware = createPersistenceMiddleware<
  RootState,
  ICartState
>({
  sliceSelector: (state) => state.cart,
  storage: cartStorage,
  actions: [
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  ],
});
