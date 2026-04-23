import { useAdminQuery } from "../../hooks/useAdminQuery";
import { useFetchBrands } from "@/features/public/search/hooks/brandCRUD";
import type { IBrand } from "@/types/public/product";

export const useBrandQuery = () => {
  const result = useAdminQuery<IBrand>({
    useQuery: useFetchBrands,
    selectField: "id, name, logo_url, website_url",
  });

  return {
    ...result,
    brandsQuery: result.query,
    brandList: result.list,
  };
};
