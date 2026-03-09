import type { IProduct } from "../../../../types/Product";

interface IProductDetails {
  product: IProduct;
}

const ProductDetails = ({ product }: IProductDetails) => {
  const hasSpecs = product.specs && Object.keys(product.specs).length > 0;

  return (
    <div className="w-full">
      {hasSpecs ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(product.specs!).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border border-gray-400 items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="font-semibold text-gray-600 capitalize">
                {key}
              </span>
              <span className="text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          No specifications available for this product.
        </p>
      )}
    </div>
  );
};

export default ProductDetails;
