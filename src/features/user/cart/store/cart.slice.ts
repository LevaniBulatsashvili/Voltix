import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "../../../../types/common/cart";
import type { IProduct } from "../../../../types/product";
import { cartStorage } from "./cartStorage";
import { notifyError } from "../../../../lib/toast/notifyError";

interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = (() => {
  try {
    return { items: cartStorage.get() };
  } catch (error) {
    notifyError(error);
    return { items: [] };
  }
})();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }>,
    ) {
      const { product, quantity } = action.payload;

      const existing = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existing) {
        const newQuantity = existing.quantity + quantity;

        existing.quantity =
          newQuantity > product.stock ? product.stock : newQuantity;
      } else {
        state.items.push({
          product,
          quantity: quantity > product.stock ? product.stock : quantity,
        });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.product.id === action.payload,
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
