import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { useFetchProductSpecs } from "@/features/public/product/hooks/productSpecCRUD";
import type { IProductSpec } from "@/types/public/product";

export const useProductSpecQuery = () => {
  const result = useAdminQuery<IProductSpec>({
    useQuery: useFetchProductSpecs,
    selectField: `id, product_id, spec, value, product:product_id(name)`,
  });

  return {
    ...result,
    specList: result.list,
    specsQuery: result.query,
  };
};
