import type { IProductComment } from "../../../../types/product";
import ProductCommentCard from "../../../../components/cards/ProductCommentCard";

interface IProductCommentsList {
  productComments: IProductComment[];
  startIndex: number;
}

const ProductCommentsList = ({
  productComments,
  startIndex,
}: IProductCommentsList) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productComments.map((productComment, index) => (
        <ProductCommentCard
          key={startIndex + index}
          productComment={productComment}
        />
      ))}
    </div>
  );
};

export default ProductCommentsList;
