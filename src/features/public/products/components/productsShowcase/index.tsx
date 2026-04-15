import { useTranslation } from "react-i18next";
import type { IProduct } from "@/types/public/product";
import ProductCard from "./ProductCard";
import ViewProducts from "./ViewProducts";
import { PAGE } from "@/pages/pageConfig";

interface IProductShowcase {
  title: string;
  products: IProduct[];
  viewAllLink: string;
}

const ProductShowcase = ({
  title,
  products,
  viewAllLink = PAGE.PUBLIC.SHOP,
}: IProductShowcase) => {
  const { t } = useTranslation();

  return (
    <div className="w-[90%] mx-auto my-15 text-center">
      <h2 className="mb-14 text-5xl font-extrabold uppercase">{t(title)}</h2>

      <div className="w-full mb-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16">
        <ViewProducts to={viewAllLink} text={"products.view_all"} />
      </div>
    </div>
  );
};

export default ProductShowcase;
