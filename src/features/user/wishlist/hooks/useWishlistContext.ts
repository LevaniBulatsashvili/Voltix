import { useContext } from "react";
import { WishlistContext } from "../providers/WishlistContext";

export const useWishlistContext = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlistContext must be used within WishlistProvider");
  return ctx;
};
