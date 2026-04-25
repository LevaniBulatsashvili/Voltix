import { useRef } from "react";
import type { IBrand } from "@/types/public/product";
import type { ICreatePayload } from "@/types/common/api";
import { useItemForm } from "../../hooks/useItemForm";
import {
  brandSchema,
  defaultBrandForm,
  type BrandFormData,
} from "../schemas/brandSchema";
import {
  useCreateBrand,
  useUpdateBrand,
} from "@/features/public/search/hooks/brandCRUD";
import { deleteStorageImage } from "@/features/shared/imageSelector/utils/deleteStorageImage";

export const useBrandForm = () => {
  const uploadRef = useRef<(() => Promise<string[]>) | null>(null);
  const { mutateAsync: createBrand } = useCreateBrand();
  const { mutateAsync: updateBrand } = useUpdateBrand();

  const {
    formKey,
    modalOpen,
    editingItem: editingBrand,
    openCreate,
    openEdit,
    closeModal,
    register,
    handleSubmit,
    formState: { errors },
  } = useItemForm<IBrand, BrandFormData>({
    schema: brandSchema,
    defaultValues: defaultBrandForm,
    toFormValues: (b) => ({
      name: b.name,
      logo_url: b.logo_url ?? "",
      website_url: b.website_url ?? "",
    }),
  });

  const onSubmit = async (data: BrandFormData) => {
    const imageUrls = (await uploadRef.current?.()) ?? [];
    const logo_url = imageUrls[0] ?? data.logo_url;

    if (editingBrand) {
      if (imageUrls.length && editingBrand.logo_url)
        await deleteStorageImage(editingBrand.logo_url, "brands");
      await updateBrand({ id: editingBrand.id, ...data, logo_url });
    } else
      await createBrand({
        ...data,
        logo_url,
      } as unknown as ICreatePayload<IBrand>);

    closeModal();
  };

  return {
    formKey,
    modalOpen,
    editingBrand,
    uploadRef,
    register,
    handleSubmit,
    errors,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  };
};
