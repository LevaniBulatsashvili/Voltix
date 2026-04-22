import type { ICategory } from "@/types/public/product";
import { notifySuccess } from "@/lib/toast/notifySuccess";
import type { ICreatePayload } from "@/types/common/api";
import { useItemForm } from "../../hooks/useItemForm";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/features/public/category/hooks/categoryCRUD";
import {
  categorySchema,
  defaultCategoryForm,
  type CategoryFormData,
} from "../schemas/categorySchema";

export const useCategoryForm = () => {
  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const {
    modalOpen,
    editingItem: editingCategory,
    openCreate,
    openEdit,
    closeModal,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useItemForm<ICategory, CategoryFormData>({
    schema: categorySchema,
    defaultValues: defaultCategoryForm,
    toFormValues: (c) => ({
      name: c.name,
      main_category_id: c.main_category_id,
    }),
  });

  const onSubmit = async (data: CategoryFormData) => {
    if (editingCategory) {
      await updateCategory({ id: editingCategory.id, ...data });
      notifySuccess("admin_management.categories.category_updated");
    } else {
      await createCategory(data as unknown as ICreatePayload<ICategory>);
      notifySuccess("admin_management.categories.category_created");
    }

    closeModal();
  };

  return {
    modalOpen,
    editingCategory,
    register,
    handleSubmit,
    errors,
    control,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  };
};
