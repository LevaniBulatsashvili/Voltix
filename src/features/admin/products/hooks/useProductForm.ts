import { useRef } from "react";
import { useWatch } from "react-hook-form";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/features/public/product/hooks/productCRUD";
import type { IProduct } from "@/types/public/product";
import {
  defaultProductForm,
  productSchema,
  type ProductFormData,
} from "../schemas/productSchema";
import {
  useCreateManyProductImages,
  useDeleteManyProductImages,
} from "@/features/public/product/hooks/productImagesCRUD";
import type { ICreatePayload } from "@/types/common/api";
import { useItemForm } from "../../hooks/useItemForm";

export const useProductForm = () => {
  const uploadRef = useRef<(() => Promise<string[]>) | null>(null);
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: createManyProductImages } = useCreateManyProductImages();
  const { mutateAsync: deleteManyProductImages } = useDeleteManyProductImages();

  const {
    formKey,
    modalOpen,
    editingItem: editingProduct,
    openCreate,
    openEdit,
    closeModal,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useItemForm<IProduct, ProductFormData>({
    schema: productSchema,
    defaultValues: defaultProductForm,
    toFormValues: (p) => ({
      name: p.name,
      description: p.description,
      brand_id: p.brand_id,
      main_category_id: p.main_category_id,
      category_id: p.category_id,
      price: p.price,
      discount_percentage: p.discount_percentage ?? 0,
      stock: p.stock,
      thumbnail: p.thumbnail,
    }),
  });

  const watchedMainCategory = useWatch({ control, name: "main_category_id" });

  const onSubmit = async (data: ProductFormData) => {
    const imageUrls = (await uploadRef.current?.()) ?? [];
    const thumbnail = imageUrls[0] ?? data.thumbnail;

    if (editingProduct) {
      await updateProduct({ id: editingProduct.id, ...data, thumbnail });
      if (imageUrls.length) {
        await deleteManyProductImages({
          eq: { product_id: editingProduct.id },
        });
        await createManyProductImages(
          imageUrls.map((url) => ({
            product_id: editingProduct.id,
            image_url: url,
          })),
        );
      }
    } else {
      const newProduct = await createProduct({
        ...data,
        thumbnail,
      } as unknown as ICreatePayload<IProduct>);
      if (imageUrls.length)
        await createManyProductImages(
          imageUrls.map((url) => ({
            product_id: newProduct.id,
            image_url: url,
          })),
        );
    }

    closeModal();
  };

  return {
    formKey,
    modalOpen,
    editingProduct,
    uploadRef,
    register,
    handleSubmit,
    errors,
    watchedMainCategory,
    control,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
    deleteManyProductImages,
  };
};
