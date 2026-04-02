import { supabase } from "../../../lib/supabase";
import type { IMainCategory } from "../../../types/product";

const fetchMainCategories = async (): Promise<IMainCategory[]> => {
  const { data, error } = await supabase.from("main_categories").select(
    `
      *,
      categories(id, name)
      `,
  );

  if (error || !data) new Error("main categories not found");

  return data as IMainCategory[];
};

export default fetchMainCategories;
