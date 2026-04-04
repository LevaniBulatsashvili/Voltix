import type { IProductComment } from "../../../../types/product";
import ProductCommentCard from "../../../../components/cards/ProductCommentCard";

interface IProductsCommentsList {
  productComments: IProductComment[];
}

const ProductsCommentsList = ({ productComments }: IProductsCommentsList) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productComments.map((productComment) => (
        <ProductCommentCard
          key={productComment.id}
          productComment={productComment}
        />
      ))}
    </div>
  );
};

export default ProductsCommentsList;
