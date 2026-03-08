import { useTranslation } from "react-i18next";
import type { IProduct } from "../../../types/Product";
import ProductCard from "./ProductCard";
import AppLink from "../../../components/button/AppLink";
import { PAGE } from "../../../pages/pageConfig";

interface INewProducts {
  products: IProduct[];
}

const NewProducts = ({ products }: INewProducts) => {
  const { t } = useTranslation();

  return (
    <div className="w-[90%] mx-auto my-15 text-center">
      <h2 className="mb-14 text-5xl font-extrabold uppercase">
        {t("products-new arrivals")}
      </h2>
      <div className="w-full mb-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <AppLink
        to={PAGE.PRODUCTS}
        className="px-6 py-2 rounded-full bg-accent text-white font-semibold"
      >
        {t("products-view all")}
      </AppLink>
    </div>
  );
};
export default NewProducts;
