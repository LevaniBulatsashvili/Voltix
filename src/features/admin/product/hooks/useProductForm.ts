import { useState } from "react";
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
} from "../schemas/schema";
import type { ICreatePayload } from "@/types/common/api";
import { notifySuccess } from "@/lib/toast/notifySuccess";

export const useProductForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

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

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const openCreate = () => {
    setEditingProduct(null);
    reset(defaultProductForm);
    setModalOpen(true);
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
  };

  const closeModal = () => setModalOpen(false);

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, ...data });
      notifySuccess("admin_products.product_updated");
    } else {
      createProduct(data as ICreatePayload<IProduct>);
      notifySuccess("admin_products.product_created");
    }
    closeModal();
  };

  return {
    modalOpen,
    editingProduct,
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
