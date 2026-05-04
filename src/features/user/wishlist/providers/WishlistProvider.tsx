// features/user/wishlist/providers/WishlistProvider.tsx
import { useWishlist } from "../hooks/useWishlist";
import { WishlistContext } from "./WishlistContext";

const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const wishlist = useWishlist();
  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
