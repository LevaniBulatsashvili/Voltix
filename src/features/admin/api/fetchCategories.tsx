import { supabase } from "../../../lib/supabase";

export const fetchCategories = async () => {
  const { data: mainCategories, error: mainError } = await supabase
    .from("main_categories")
    .select("*");
  if (mainError) throw mainError;

  const { data: subCategories, error: subError } = await supabase
    .from("categories")
    .select("*");
  if (subError) throw subError;

  return { mainCategories, subCategories };
};
