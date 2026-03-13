import { dummyCustomers } from "../../../utils/dummyCustomers";
import { dummyFAQs } from "../../../utils/dummyFAQs";
import { dummyProducts } from "../../../utils/dummyProducts";
import Breadcrumbs from "./breadCrumb";
import ProductDetails from "./productTabs/Tabs/ProductDetails";
import ProductDisplay from "./productDisplay/ProductDisplay";
import ProductFAQs from "./productTabs/Tabs/ProductFAQs";
import ProductReviews from "./productTabs/Tabs/ProductReviews";
import ProductTabs from "./productTabs";

const Product = () => {
  const product = dummyProducts[0];

  return (
    <div className="p-6 w-full md:w-[95%] lg:w-[90%] text-primary bg-background">
      <Breadcrumbs />
      <ProductDisplay product={product} />
      <ProductTabs
        children={{
          details: <ProductDetails product={product} />,
          reviews: <ProductReviews reviews={dummyCustomers} />,
          faqs: <ProductFAQs faqs={dummyFAQs} />,
        }}
      />
    </div>
  );
};

export default Product;
