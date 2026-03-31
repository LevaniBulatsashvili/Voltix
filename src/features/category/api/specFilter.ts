import type { IProduct, ISpecs } from "../../../types/product";
import { supabase } from "../../../lib/supabase";

export const filterProductsBySpecs = async (productSpecs: ISpecs[]) => {
  if (!productSpecs?.length) return null;

  const { data, error } = await supabase.rpc("filter_products_by_specs", {
    spec_filters: productSpecs.map((s) => ({ spec: s.spec, value: s.value })),
  });

  if (error) throw new Error("specs couldn't be filtered");

  return data?.map((p: IProduct) => p.id) || [];
};
