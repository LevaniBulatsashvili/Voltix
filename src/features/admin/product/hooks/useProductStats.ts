import { useTranslation } from "react-i18next";
import type { IStatItem } from "../components/adminStats/AdminStats";
import type { IProduct } from "@/types/public/product";

export const useProductStats = (
  productList: IProduct[],
  total: number,
): IStatItem[] => {
  const { t } = useTranslation();

  const avgPrice = productList.length
    ? (
        productList.reduce((a, p) => a + p.price, 0) / productList.length
      ).toFixed(0)
    : "0";

  return [
    { label: t("admin_products.total_products"), value: total },
    {
      label: t("admin_products.in_stock"),
      value: productList.filter((p) => p.stock > 0).length,
    },
    {
      label: t("admin_products.out_of_stock"),
      value: productList.filter((p) => p.stock === 0).length,
    },
    { label: t("admin_products.avg_price"), value: `$${avgPrice}` },
  ];
};
