import { createContext } from "react";
import type { useWishlist } from "../hooks/useWishlist";

type WishlistContextType = ReturnType<typeof useWishlist>;

export const WishlistContext = createContext<WishlistContextType | null>(null);
