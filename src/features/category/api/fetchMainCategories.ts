import { supabase } from "../../../lib/supabase";
import type { IMainCategory } from "../../../types/product";

export interface IFetchMainCategoriesOptions {
  includeCategories?: boolean;
}

export const fetchMainCategories = async ({
  includeCategories = false,
}: IFetchMainCategoriesOptions = {}): Promise<IMainCategory[]> => {
  const { data, error } = await supabase.from("main_categories").select(`
      ${includeCategories ? "*, categories(id,name)" : "id, *"}
      `);

  if (error || !data) throw new Error("main_categories_could_not_be_fetched");

  return data;
};

export default fetchMainCategories;
