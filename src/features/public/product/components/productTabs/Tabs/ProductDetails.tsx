import { useTranslation } from "react-i18next";
import type { IProductSpec } from "@/types/product";

interface IProductDetails {
  specs?: IProductSpec[];
}

const ProductDetails = ({ specs }: IProductDetails) => {
  const { t } = useTranslation();
  const hasSpecs = specs && specs.length > 0;
  return (
    <div className="w-full">
      {hasSpecs ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {specs!.map(({ id, spec, value }) => (
            <div
              key={id}
              className="flex justify-between border border-gray-300 items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="font-semibold text-gray-600 capitalize">
                {spec}
              </span>

              <span className="text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          {t("product.no_specifications_available_for_this_product")}
        </p>
      )}
    </div>
  );
};

export default ProductDetails;
