import { useState } from "react";

interface IUseDeleteModal<T extends { id: number | string }> {
  onDelete: (id: T["id"]) => void;
  onBeforeDelete?: (item: T) => Promise<void> | void;
}

export const useDeleteModal = <T extends { id: number | string }>({
  onDelete,
  onBeforeDelete,
}: IUseDeleteModal<T>) => {
  const [deleteModal, setDeleteModal] = useState<T | null>(null);

  const openDelete = (item: T) => setDeleteModal(item);
  const closeDelete = () => setDeleteModal(null);

  const confirmDelete = async () => {
    if (!deleteModal) return;
    await onBeforeDelete?.(deleteModal);
    onDelete(deleteModal.id);
    closeDelete();
  };

  return { deleteModal, openDelete, closeDelete, confirmDelete };
};
