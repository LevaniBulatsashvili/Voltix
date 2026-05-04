import PageWrapper from "@/components/ui/PageWrapper";
import PaginatedGridSection from "@/components/ui/PaginatedGridSection";
import ProductCard from "@/features/public/products/components/productsShowcase/ProductCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchWishlists } from "../hooks/wishlistCRUD";
import { useAppSelector } from "@/hooks/redux";
import { PRODUCTSELECTFIELD } from "@/utils/consts";

const Wishlist = () => {
  const { t } = useTranslation();
  const { profile } = useAppSelector((state) => state.profile);
  const [page, setPage] = useState(1);

  const productsQuery = useFetchWishlists({
    page,
    limit: 9,
    filters: { eq: { profile_id: profile?.id } },
    selectField: `product: products(${PRODUCTSELECTFIELD})`,
  });

  return (
    <PageWrapper className="xl:px-0">
      <PaginatedGridSection
        query={productsQuery}
        title={t("wishlist.wishlist")}
        description="common.showing_products"
        onPageChange={setPage}
        renderItem={({ product }) => (
          <ProductCard key={product!.id} product={product!} />
        )}
        maxCols={3}
      />
    </PageWrapper>
  );
};

export default Wishlist;
