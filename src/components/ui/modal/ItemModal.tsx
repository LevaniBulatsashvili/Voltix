import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";

interface IItemModal {
  open: boolean;
  isEditing?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
}

const ItemModal = ({
  open,
  isEditing,
  onClose,
  onSubmit,
  children,
}: IItemModal) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={open} onClose={onClose} className="max-w-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-medium">
          {isEditing
            ? t("admin_products.edit_product")
            : t("admin_products.add_product")}
        </h2>

        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      {children}

      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={onClose}
          className="h-9 px-4 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
        >
          {t("common.cancel")}
        </button>

        <button
          onClick={onSubmit}
          className="h-9 px-4 bg-gray-900 text-white rounded-lg text-sm hover:opacity-85"
        >
          {isEditing ? t("common.save_changes") : t("common.create")}
        </button>
      </div>
    </Modal>
  );
};

export default ItemModal;
