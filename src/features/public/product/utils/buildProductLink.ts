import { PAGE } from "@/pages/pageConfig";

export const buildProductLink = (
  mainCategoryName: string,
  categoryName: string,
  productId: number,
) =>
  PAGE.PUBLIC.PRODUCT.replace(":mainCategory", mainCategoryName)
    .replace(":category", categoryName)
    .replace(":productId", String(productId));
