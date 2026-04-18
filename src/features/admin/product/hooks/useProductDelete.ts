import { useState } from "react";
import { useDeleteProduct } from "@/features/public/product/hooks/productCRUD";
import type { IProduct } from "@/types/public/product";
import { notifySuccess } from "@/lib/toast/notifySuccess";

export const useProductDelete = () => {
  const [deleteModal, setDeleteModal] = useState<IProduct | null>(null);
  const { mutate: deleteProduct } = useDeleteProduct();

  const openDelete = (product: IProduct) => setDeleteModal(product);
  const closeDelete = () => setDeleteModal(null);

  const confirmDelete = () => {
    if (!deleteModal) return;
    deleteProduct(deleteModal.id);
    notifySuccess("admin_products.product_deleted");
    closeDelete();
  };

  return { deleteModal, openDelete, closeDelete, confirmDelete };
};
