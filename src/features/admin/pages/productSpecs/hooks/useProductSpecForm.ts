import type { IProductSpec } from "@/types/public/product";
import { useItemForm } from "@/features/admin/hooks/useItemForm";
import {
  defaultProductSpecForm,
  productSpecSchema,
  type ProductSpecFormData,
} from "../schemas/productSpecSchema";
import {
  useCreateProductSpec,
  useUpdateProductSpec,
} from "@/features/public/product/hooks/productSpecCRUD";

export const useProductSpecForm = () => {
  const { mutateAsync: createProductSpec } = useCreateProductSpec();
  const { mutateAsync: updateProductSpec } = useUpdateProductSpec();

  const {
    formKey,
    modalOpen,
    editingItem: editingSpec,
    openCreate,
    openEdit,
    closeModal,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useItemForm<IProductSpec, ProductSpecFormData>({
    schema: productSpecSchema,
    defaultValues: defaultProductSpecForm,
    toFormValues: (s) => ({
      product_id: s.product_id,
      spec: s.spec,
      value: s.value,
    }),
  });

  const onSubmit = async (data: ProductSpecFormData) => {
    if (editingSpec) {
      await updateProductSpec({ id: editingSpec.id, ...data });
    } else {
      await createProductSpec(data);
    }
    closeModal();
  };

  return {
    formKey,
    modalOpen,
    editingSpec,
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
