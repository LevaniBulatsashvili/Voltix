import PageWrapper from "@/components/ui/PageWrapper";
import PaginatedGridSection from "@/components/ui/PaginatedGridSection";
import ProductCard from "@/features/public/products/components/productsShowcase/ProductCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchWishlists } from "../hooks/wishlistCRUD";
import { useAppSelector } from "@/hooks/redux";
import { useWishlist } from "../hooks/useWishlist";
import { getLikeOptions } from "../utils/getLikeOptions";

const Wishlist = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const [page, setPage] = useState(1);
  const { isLiked, toggleWishlist } = useWishlist();

  const productsQuery = useFetchWishlists({
    page,
    limit: 9,
    filters: { eq: { profile_id: profile } },
    selectField:
      "product: products(*, brand:brands(name), category:categories(name), main_category: main_categories(*))",
  });

  return (
    <PageWrapper className="xl:px-0">
      <PaginatedGridSection
        query={productsQuery}
        title={t("wishlist.wishlist")}
        description="common.showing_products"
        onPageChange={setPage}
        renderItem={({ product }) => (
          <ProductCard
            key={product!.id}
            product={product!}
            likeOptions={getLikeOptions({
              userId: user!.id,
              productId: product!.id,
              isLiked,
              toggleWishlist,
            })}
          />
        )}
        maxCols={3}
      />
    </PageWrapper>
  );
};

export default Wishlist;
