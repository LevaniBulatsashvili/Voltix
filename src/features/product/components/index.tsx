import { dummyProducts } from "../../../utils/dummyProducts";
import Breadcrumbs from "./breadCrumb";
import ProductDisplay from "./product/ProductDisplay";

const Product = () => {
  const product = dummyProducts[0];

  return (
    <div className="p-6 w-[90%] text-primary bg-background">
      <Breadcrumbs />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
