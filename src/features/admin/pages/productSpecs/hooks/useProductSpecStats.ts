import { useTranslation } from "react-i18next";
import type { IProductSpec } from "@/types/public/product";
import type { IStatItem } from "@/features/admin/components/AdminStats";

export const useProductSpecStats = (
  specList: IProductSpec[],
  total: number,
): IStatItem[] => {
  const { t } = useTranslation();

  const uniqueProducts = new Set(specList.map((s) => s.product_id)).size;
  const uniqueSpecs = new Set(specList.map((s) => s.spec)).size;

  return [
    { label: t("admin_management.product_specs.total_specs"), value: total },
    {
      label: t("admin_management.product_specs.unique_spec_types"),
      value: uniqueSpecs,
    },
    {
      label: t("admin_management.product_specs.products_with_specs"),
      value: uniqueProducts,
    },
  ];
};
