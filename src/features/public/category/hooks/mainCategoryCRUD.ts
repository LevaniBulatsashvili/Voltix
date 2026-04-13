import { createEntityHooks } from "@/hooks/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { mainCategoryService } from "../services/mainCategoryService";

export const {
  useFetchMany: useFetchMainCategories,
  useFetch: useFetchMainCategory,
  useCreate: useCreateMainCategory,
  useUpdate: useUpdateMainCategory,
  useDelete: useDeleteMainCategory,
} = createEntityHooks(mainCategoryService, Query_Keys.main_category);
