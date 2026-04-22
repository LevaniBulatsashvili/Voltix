import type { IMainCategory } from "@/types/public/product";
import type { ICreatePayload } from "@/types/common/api";
import { useItemForm } from "../../hooks/useItemForm";
import { notifyItemAction } from "../../utils/notifyItemAction";
import {
  mainCategorySchema,
  defaultMainCategoryForm,
  type MainCategoryFormData,
} from "../schemas/mainCategorySchema";
import {
  useCreateMainCategory,
  useUpdateMainCategory,
} from "@/features/public/category/hooks/mainCategoryCRUD";
import { useRef } from "react";
import { deleteStorageImage } from "@/features/shared/imageSelector/utils/deleteStorageImage";

export const useMainCategoryForm = () => {
  const uploadRef = useRef<(() => Promise<string[]>) | null>(null);
  const { mutateAsync: createMainCategory } = useCreateMainCategory();
  const { mutateAsync: updateMainCategory } = useUpdateMainCategory();

  const {
    formKey,
    modalOpen,
    editingItem: editingMainCategory,
    openCreate,
    openEdit,
    closeModal,
    register,
    handleSubmit,
    formState: { errors },
  } = useItemForm<IMainCategory, MainCategoryFormData>({
    schema: mainCategorySchema,
    defaultValues: defaultMainCategoryForm,
    toFormValues: (mc) => ({
      name: mc.name,
      thumbnail: mc.thumbnail ?? "",
    }),
  });

  const onSubmit = async (data: MainCategoryFormData) => {
    const imageUrls = (await uploadRef.current?.()) ?? [];
    const thumbnail = imageUrls[0] ?? data.thumbnail;

    if (editingMainCategory) {
      if (imageUrls.length && editingMainCategory.thumbnail)
        await deleteStorageImage(
          editingMainCategory.thumbnail,
          "main-categories",
        );

      await updateMainCategory({
        id: editingMainCategory.id,
        ...data,
        thumbnail,
      });
      notifyItemAction("main_category", "update");
    } else {
      await createMainCategory({
        ...data,
        thumbnail,
      } as unknown as ICreatePayload<IMainCategory>);
      notifyItemAction("main_category", "create");
    }

    closeModal();
  };

  return {
    uploadRef,
    formKey,
    modalOpen,
    editingMainCategory,
    register,
    handleSubmit,
    errors,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  };
};
