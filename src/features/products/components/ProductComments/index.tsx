import { useState } from "react";
import { useVisibleCount } from "../../hooks/useVisibleCount";
import { useFetchProductComments } from "../../../../hooks/useFetchProductComments";
import ProductCommentsView from "./ProductCommentsView";
import { useTranslation } from "react-i18next";

const ProductComments = () => {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);
  const visibleProducts = useVisibleCount();
  const { data, isLoading, error } = useFetchProductComments(
    startIndex,
    visibleProducts,
  );

  return (
    <ProductCommentsView
      title={t("products.our_happy_customers")}
      startIndex={startIndex}
      visibleProducts={visibleProducts}
      setStartIndex={setStartIndex}
      productCommentsData={data}
      commentsLoading={isLoading}
      commentsError={error}
    />
  );
};

export default ProductComments;
