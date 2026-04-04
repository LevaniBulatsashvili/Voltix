import { useState } from "react";
import { useVisibleCount } from "../../hooks/useVisibleCount";
import { useFetchProductComments } from "../../hooks/useFetchProductComments";
import ProductCommentsView from "./ProductsCommentsView";
import { useTranslation } from "react-i18next";

const ProductsComments = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const visibleProducts = useVisibleCount();
  const {
    data: productCommentsData,
    isLoading: productCommentsLoading,
    error: productCommentsError,
  } = useFetchProductComments({ page, limit: visibleProducts });

  return (
    <ProductCommentsView
      title={t("products.our_happy_customers")}
      page={page}
      visibleProducts={visibleProducts}
      setPage={setPage}
      productCommentsData={productCommentsData}
      commentsLoading={productCommentsLoading}
      commentsError={productCommentsError}
    />
  );
};

export default ProductsComments;
