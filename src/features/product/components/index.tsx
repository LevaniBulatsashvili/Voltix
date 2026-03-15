import { useParams } from "react-router-dom";
import Breadcrumbs from "./breadCrumb";
import ProductDetails from "./productTabs/Tabs/ProductDetails";
import ProductDisplay from "./productDisplay/ProductDisplay";
import ProductFAQs from "./productTabs/Tabs/ProductFAQs";
import ProductReviews from "./productTabs/Tabs/ProductReviews";
import ProductTabs from "./productTabs";
import AsyncBoundary from "../../../components/feedback/AsyncBoundary";
import useFetchProduct from "../hooks/useFetchProduct";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const productQuery = useFetchProduct(id ?? "");

  return (
    <AsyncBoundary query={productQuery}>
      {(product) => (
        <div className="p-6 w-full md:w-[95%] lg:w-[90%] text-primary bg-background">
          <Breadcrumbs product={product} />
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
