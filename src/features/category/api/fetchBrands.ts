import { supabase } from "../../../lib/supabase";
import type { IBrand } from "../../../types/product";

const fetchBrands = async (): Promise<IBrand[]> => {
  const { data, error } = await supabase
    .from("brands")
    .select("id, name")
    .order("name", { ascending: true });

  if (error || !data) throw new Error("brands not found");

  return data;
};

export default fetchBrands;
