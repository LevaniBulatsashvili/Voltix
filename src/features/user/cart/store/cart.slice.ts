import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "../../../../types/Cart";
import type { IProduct } from "../../../../types/Product";
import { cartStorage } from "./cartStorage";

interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = {
  items: cartStorage.get(),
};

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
