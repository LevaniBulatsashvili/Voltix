import { useParams } from "react-router-dom";
import ProductDetails from "./productTabs/Tabs/ProductDetails";
import ProductDisplay from "./productDisplay/ProductDisplay";
import ProductFAQs from "./productTabs/Tabs/ProductFAQs";
import ProductReviews from "./productTabs/Tabs/ProductReviews";
import ProductTabs from "./productTabs";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { buildProductBreadcrumbs } from "../utils/buildProductBreadcrumbs";
import { useTranslation } from "react-i18next";
import ProductSkeleton from "./productSkeleton/ProductSkeleton";
import { useFetchProduct } from "../hooks/productCRUD";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import PageWrapper from "@/components/ui/PageWrapper";

const Product = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const productQuery = useFetchProduct(Number(productId));

  return (
    <PageWrapper>
      <QueryBoundary
        query={productQuery}
        loadingFallback={<ProductSkeleton />}
        defaultFallbackOptions={{ className: "h-[75dvh]" }}
      >
        {(productArr) => {
          const product = productArr[0];

          return (
            <>
              <Breadcrumbs items={buildProductBreadcrumbs(product, t)} />
              <ProductDisplay product={product} />
              <ProductTabs
                children={{
                  details: (
                    <ProductDetails specs={product.product_specs || []} />
                  ),
                  reviews: <ProductReviews productId={product.id} />,
                  faqs: <ProductFAQs faqs={product.product_faqs || []} />,
                }}
              />
            </>
          );
        }}
      </QueryBoundary>
    </PageWrapper>
  );
};

export default Product;
