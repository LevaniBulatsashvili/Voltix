import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { categoryService } from "../services/categoryService";

export const {
  useInfiniteFetchMany: useInfiniteFetchCategories,
  useFetchMany: useFetchCategories,
  useFetch: useFetchCategory,
  useCreate: useCreateCategory,
  useUpdate: useUpdateCategory,
  useDelete: useDeleteCategory,
} = createEntityHooks(
  categoryService,
  Query_Keys.category,
  Query_Keys.category,
);
