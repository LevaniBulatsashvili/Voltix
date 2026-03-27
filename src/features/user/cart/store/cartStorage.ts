import type { ICartItem } from "../../../../types/cart";

const CART_KEY = "cart";

export const cartStorage = {
  get(): ICartItem[] {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      throw new Error("Failed to read cart from storage");
    }
  },

  set(items: ICartItem[]) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      throw new Error("Failed to save cart");
    }
  },

  clear() {
    try {
      localStorage.removeItem(CART_KEY);
    } catch {
      throw new Error("Failed to clear cart");
    }
  },
};
