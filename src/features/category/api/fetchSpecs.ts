import { supabase } from "../../../lib/supabase";
import type { ISpecs } from "../../../types/product";

const fetchSpecs = async () => {
  const { data, error } = await supabase.from("product_specs").select("*");

  if (error || !data) throw new Error("specs not found");

  return data as ISpecs[];
};

export default fetchSpecs;
