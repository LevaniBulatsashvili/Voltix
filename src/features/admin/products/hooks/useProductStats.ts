import { useTranslation } from "react-i18next";
import type { IStatItem } from "../../components/AdminStats";
import type { IProduct } from "@/types/public/product";
import { usePrice } from "@/features/user/cart/hooks/usePrice";

const getAvgPrice = (products: IProduct[]): number => {
  if (!products.length) return 0;
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return total / products.length;
};

const getInStock = (products: IProduct[]) =>
  products.filter((product) => product.stock > 0).length;

const getOutOfStock = (products: IProduct[]) =>
  products.filter((product) => product.stock === 0).length;

export const useProductStats = (
  productList: IProduct[],
  total: number,
): IStatItem[] => {
  const { t } = useTranslation();
  const { format } = usePrice();

  return [
    { label: t("admin_management.products.total_products"), value: total },
    {
      label: t("admin_management.products.in_stock"),
      value: getInStock(productList),
    },
    {
      label: t("admin_management.products.out_of_stock"),
      value: getOutOfStock(productList),
    },
    {
      label: t("admin_management.products.avg_price"),
      value: format(getAvgPrice(productList)),
    },
  ];
};
