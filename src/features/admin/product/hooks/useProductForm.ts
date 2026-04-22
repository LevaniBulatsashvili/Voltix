import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { notifySuccess } from "@/lib/toast/notifySuccess";
import {
  useCreateManyProductImages,
  useDeleteManyProductImages,
} from "@/features/public/product/hooks/productImagesCRUD";
import type { ICreatePayload } from "@/types/common/api";

export const useProductForm = () => {
  const [formKey, setFormKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const uploadRef = useRef<(() => Promise<string[]>) | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultProductForm,
  });

  const watchedMainCategory = useWatch({ control, name: "main_category_id" });

  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: createManyProductImages } = useCreateManyProductImages();
  const { mutateAsync: deleteManyProductImages } = useDeleteManyProductImages();

  const openCreate = () => {
    setEditingProduct(null);
    reset(defaultProductForm);
    setModalOpen(true);
    setFormKey((k) => k + 1);
  };

  const openEdit = (product: IProduct) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      brand_id: product.brand_id,
      main_category_id: product.main_category_id,
      category_id: product.category_id,
      price: product.price,
      discount_percentage: product.discount_percentage ?? 0,
      stock: product.stock,
      thumbnail: product.thumbnail,
    });
    setModalOpen(true);
    setFormKey((k) => k + 1);
  };

  const closeModal = () => setModalOpen(false);

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
      notifySuccess("admin_management.products.product_updated");
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
      notifySuccess("admin_management.products.product_created");
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
  };
};
