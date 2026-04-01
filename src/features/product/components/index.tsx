import { useParams } from "react-router-dom";
import ProductDetails from "./productTabs/Tabs/ProductDetails";
import ProductDisplay from "./productDisplay/ProductDisplay";
import ProductFAQs from "./productTabs/Tabs/ProductFAQs";
import ProductReviews from "./productTabs/Tabs/ProductReviews";
import ProductTabs from "./productTabs";
import AsyncBoundary from "../../../components/feedback/AsyncBoundary";
import useFetchProduct from "../hooks/useFetchProduct";
import Breadcrumbs from "../../../components/ui/BreadCrumbs";
import { buildProductBreadcrumbs } from "../utils/buildProductBreadcrumbs";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const productQuery = useFetchProduct(id ?? "");

  return (
    <AsyncBoundary query={productQuery}>
      {(product) => (
        <div className="p-6 w-full md:w-[95%] lg:w-[90%] text-primary bg-background">
          <Breadcrumbs items={buildProductBreadcrumbs(product, t)} />
          <ProductDisplay product={product} />
          <ProductTabs
            children={{
              details: <ProductDetails specs={product.product_specs || []} />,
              reviews: (
                <ProductReviews reviews={product.product_comments || []} />
              ),
              faqs: <ProductFAQs faqs={product.product_faqs || []} />,
            }}
          />
        </div>
      )}
    </AsyncBoundary>
  );
};

export default Product;
