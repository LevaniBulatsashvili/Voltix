import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem } from "../../../../types/Cart";
import type { IProduct } from "../../../../types/Product";

interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.id,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
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
