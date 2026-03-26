import type { Middleware } from "@reduxjs/toolkit";
import { isAnyOf } from "@reduxjs/toolkit";
import { cartStorage } from "./cartStorage";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "./cart.slice";
import { notifyError } from "../../../../lib/toast/notifyError";

const isCartAction = isAnyOf(
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
);

export const cartMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (isCartAction(action)) {
    try {
      const state = store.getState();
      cartStorage.set(state.cart.items);
    } catch (error) {
      notifyError(error);
    }
  }

  return result;
};
