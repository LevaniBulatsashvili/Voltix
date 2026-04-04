import { supabase } from "../../../lib/supabase";
import type { IBrand } from "../../../types/product";

const fetchBrands = async (): Promise<IBrand[]> => {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error("brands_could_not_be_fetched");

  return data;
};

export default fetchBrands;
