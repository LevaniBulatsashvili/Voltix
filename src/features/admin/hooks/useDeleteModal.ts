import { useState } from "react";
import { notifyItemAction } from "../utils/notifyItemAction";

interface IUseDeleteModal<T extends { id: number | string }> {
  onDelete: (id: T["id"]) => void;
  itemName: string;
}

export const useDeleteModal = <T extends { id: number | string }>({
  onDelete,
  itemName,
}: IUseDeleteModal<T>) => {
  const [deleteModal, setDeleteModal] = useState<T | null>(null);

  const openDelete = (item: T) => setDeleteModal(item);
  const closeDelete = () => setDeleteModal(null);

  const confirmDelete = () => {
    if (!deleteModal) return;
    onDelete(deleteModal.id);
    notifyItemAction(itemName, "delete");
    closeDelete();
  };

  return { deleteModal, openDelete, closeDelete, confirmDelete };
};
