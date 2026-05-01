import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { useFetchProductsFAQs } from "@/features/public/product/hooks/productFAQCRUD";
import type { IProductFAQ } from "@/types/public/product";

export const useProductFAQQuery = () => {
  const result = useAdminQuery<IProductFAQ>({
    useQuery: useFetchProductsFAQs,
    selectField: `id, product_id, question, answer, answered_at, profile_id, answered_by, product:product_id(name)`,
    sort: [{ field: "answered_at", ascending: false }],
  });

  return {
    ...result,
    faqList: result.list,
    faqsQuery: result.query,
  };
};
