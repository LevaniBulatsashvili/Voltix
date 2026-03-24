import { useTranslation } from "react-i18next";
import { PAGE } from "../../../../pages/pageConfig";
import CategoryCard from "./CategoryCard";
import electronicsImg from "../../../../assets/images/Electronics2.png";
import gamingImg from "../../../../assets/images/Gaming.png";
import camerasImg from "../../../../assets/images/Cameras.png";
import headphonesImg from "../../../../assets/images/Headphones.png";

const ProductCategories = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-14 sm:mb-20 w-[90%] mx-auto rounded-4xl p-16 bg-white">
      <h2 className="mb-10 sm:mb-16 text-4xl sm:text-5xl font-extrabold uppercase text-center">
        {t("products.browse_by_category")}
      </h2>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-5 lg:col-span-2">
          <CategoryCard
            to={PAGE.PRODUCTS}
            title="products.electronics"
            image={electronicsImg}
            imageWidth="w-[100%]"
            imageHeight="h-[90%]"
          />
        </div>

        <div className="col-span-5 lg:col-span-3">
          <CategoryCard
            to={PAGE.PRODUCTS}
            title="products.cameras"
            image={camerasImg}
            imageWidth="w-[120%]"
            imageHeight="h-full"
          />
        </div>

        <div className="col-span-5 lg:col-span-3">
          <CategoryCard
            to={PAGE.PRODUCTS}
            title="products.gaming"
            image={gamingImg}
            imageWidth="w-[90%]"
            imageHeight="h-full"
          />
        </div>

        <div className="col-span-5 lg:col-span-2">
          <CategoryCard
            to={PAGE.PRODUCTS}
            title="products.headphones"
            image={headphonesImg}
            imageWidth="w-[90%]"
            imageHeight="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
