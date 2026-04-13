import { PAGE } from "@/pages/pageConfig";

export const buildCategoryLink = (categoryName: string) =>
  PAGE.PUBLIC.CATEGORY.replace(":categoryName", categoryName);
