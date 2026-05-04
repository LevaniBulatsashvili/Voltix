import type { IProductComment } from "@/types/public/product";
import ProductCommentCard from "@/components/cards/ProductCommentCard";
import { memo } from "react";

interface IProductsCommentsList {
  productComments: IProductComment[];
}

const ProductsCommentsList = ({ productComments }: IProductsCommentsList) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {productComments.map((productComment) => (
      <ProductCommentCard
        key={productComment.id}
        productComment={productComment}
      />
    ))}
  </div>
);

export default memo(ProductsCommentsList);
