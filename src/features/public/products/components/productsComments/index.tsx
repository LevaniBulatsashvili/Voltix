import { useState } from "react";
import { useVisibleCount } from "../../hooks/useVisibleCount";
import { useFetchProductComments } from "../../../product/hooks/productCommentCRUD";
import ProductCommentsView from "./ProductsCommentsView";
import { useTranslation } from "react-i18next";

const ProductsComments = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const visibleProducts = useVisibleCount();
  const productCommentsQuery = useFetchProductComments({
    page,
    limit: visibleProducts,
  });

  return (
    <ProductCommentsView
      title={t("products.our_happy_customers")}
      page={page}
      visibleProducts={visibleProducts}
      setPage={setPage}
      productCommentsQuery={productCommentsQuery}
    />
  );
};

export default ProductsComments;
