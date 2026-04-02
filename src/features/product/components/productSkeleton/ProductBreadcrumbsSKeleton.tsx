import { Skeleton } from "../../../../components/ui/Skeleton";

const ProductBreadcrumbsSKeleton = () => {
  return (
    <nav className="mb-6" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        <li className="flex items-center">
          <Skeleton className="h-4 w-12" />
          <span className="mx-1 text-gray-300">/</span>
        </li>

        <li className="flex items-center">
          <Skeleton className="h-4 w-12" />
          <span className="mx-1 text-gray-300">/</span>
        </li>

        <li className="flex items-center">
          <Skeleton className="h-4 w-12" />
          <span className="mx-1 text-gray-300">/</span>
        </li>

        <li className="flex items-center">
          <Skeleton className="h-4 w-12" />
        </li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumbsSKeleton;
