import type { IProductFAQ } from "@/types/public/product";
import { useItemForm } from "@/features/admin/hooks/useItemForm";
import {
  defaultProductFAQForm,
  productFAQSchema,
  type ProductFAQFormData,
} from "../schemas/productFAQSchema";
import {
  useCreateProductFAQ,
  useUpdateProductFAQ,
} from "@/features/public/product/hooks/productFAQCRUD";
import { useAppSelector } from "@/hooks/redux";

export const useProductFAQForm = () => {
  const { profile } = useAppSelector((state) => state.profile);
  const { mutateAsync: createFAQ } = useCreateProductFAQ();
  const { mutateAsync: updateFAQ } = useUpdateProductFAQ();

  const {
    formKey,
    modalOpen,
    editingItem: editingFAQ,
    openCreate,
    openEdit,
    closeModal,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useItemForm<IProductFAQ, ProductFAQFormData>({
    schema: productFAQSchema,
    defaultValues: defaultProductFAQForm,
    toFormValues: (f) => ({
      product_id: f.product_id,
      question: f.question,
      answer: f.answer ?? "",
    }),
  });

  const onSubmit = async (data: ProductFAQFormData) => {
    if (editingFAQ) {
      await updateFAQ({
        id: editingFAQ.id,
        ...data,
        answered_by: editingFAQ.answered_by,
        answered_at: data.answer ? new Date().toISOString() : undefined,
      });
    } else {
      await createFAQ({
        ...data,
        profile_id: profile!.id,
        answered_by: profile!.id,
      });
    }
    closeModal();
  };

  return {
    formKey,
    modalOpen,
    editingFAQ,
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
