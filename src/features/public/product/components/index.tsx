import { useParams } from "react-router-dom";
import ProductDisplay from "./productDisplay/ProductDisplay";
import ProductTabs from "./productTabs";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { buildProductBreadcrumbs } from "../utils/buildProductBreadcrumbs";
import { useTranslation } from "react-i18next";
import ProductSkeleton from "./productSkeleton/ProductSkeleton";
import { useFetchProduct } from "../hooks/productCRUD";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import PageWrapper from "@/components/ui/PageWrapper";
import { lazy, Suspense } from "react";

const Product = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const productQuery = useFetchProduct(Number(productId));

  const ProductReviews = lazy(
    () => import("./productTabs/Tabs/ProductReviews"),
  );
  const ProductDetails = lazy(
    () => import("./productTabs/Tabs/ProductDetails"),
  );
  const ProductFAQs = lazy(() => import("./productTabs/Tabs/ProductFAQs"));

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
                    <Suspense fallback={<div className="h-40" />}>
                      <ProductDetails specs={product.product_specs || []} />
                    </Suspense>
                  ),
                  reviews: (
                    <Suspense fallback={<div className="h-40" />}>
                      <ProductReviews
                        productId={product.id}
                        productRating={product.rating_count}
                      />
                    </Suspense>
                  ),
                  faqs: (
                    <Suspense fallback={<div className="h-40" />}>
                      <ProductFAQs faqs={product.product_faqs || []} />
                    </Suspense>
                  ),
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
