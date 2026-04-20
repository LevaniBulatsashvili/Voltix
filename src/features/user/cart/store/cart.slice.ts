import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "@/types/profile/cart";
import type { IProduct } from "@/types/public/product";
import { cartStorage } from "./cart.storage";

export interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = cartStorage.get() || { items: [] };

export const cartSlice = createSlice({
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
        existing.quantity = Math.min(
          existing.quantity + quantity,
          product.stock,
        );
      } else {
        state.items.push({
          product,
          quantity: Math.min(quantity, product.stock),
        });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
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
