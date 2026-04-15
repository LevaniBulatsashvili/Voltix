import { useStepPagination } from "@/hooks/useStepPagination";
import ProductsCommentsListSkeleton from "../productsSkeleton/ProductsCommentsListSkeleton";
import ProductsCommentsNavigation from "./ProductsCommentNavigation";
import ProductsCommentsList from "./ProductsCommentsList";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDataResponse } from "@/types/common/api";
import type { IProductComment } from "@/types/public/product";

interface IProductsCommentsView {
  title: string;
  page: number;
  setPage: (index: number) => void;
  visibleProducts: number;
  productCommentsQuery: UseQueryResult<IDataResponse<IProductComment>>;
}

const ProductsCommentsView = ({
  title,
  page,
  productCommentsQuery,
  visibleProducts,
  setPage,
}: IProductsCommentsView) => {
  const { prev, next, prevDisabled, nextDisabled } = useStepPagination({
    currentPage: page,
    totalItems: productCommentsQuery?.data?.total || 0,
    visibleItems: visibleProducts,
    onChange: setPage,
  });

  return (
    <div className="w-[90%] mx-auto mb-20 sm:mb-30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold uppercase text-center sm:text-start">
          {title}
        </h2>
        <ProductsCommentsNavigation
          onPrev={prev}
          onNext={next}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
        />
      </div>

      <QueryBoundary
        query={productCommentsQuery}
        loadingFallback={
          <ProductsCommentsListSkeleton count={visibleProducts} />
        }
        defaultFallbackOptions={{ className: "my-15 h-74 w-full" }}
      >
        {(productComments) => (
          <ProductsCommentsList productComments={productComments} />
        )}
      </QueryBoundary>
    </div>
  );
};

export default ProductsCommentsView;
