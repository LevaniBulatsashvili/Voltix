import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import PrimaryButton from "@/components/button/PrimaryBtn";

interface IItemModal {
  open: boolean;
  isEditing?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  disableClickOutside?: boolean;
}

const ItemModal = ({
  open,
  isEditing,
  onClose,
  onSubmit,
  children,
  disableClickOutside,
}: IItemModal) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-lg"
      disableClickOutside={disableClickOutside}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-medium">
          {isEditing
            ? t("admin_products.edit_product")
            : t("admin_products.add_product")}
        </h2>

        <button onClick={onClose} className="opacity-70 hover:opacity-100">
          <X size={20} />
        </button>
      </div>

      {children}

      <div className="flex justify-end gap-2 mt-5">
        <PrimaryButton
          text={t("common.cancel")}
          onClick={onClose}
          className="py-2! text-primary! bg-background! border"
        />

        <PrimaryButton
          text={isEditing ? t("common.save_changes") : t("common.create")}
          onClick={onSubmit}
          className="py-2!"
        />
      </div>
    </Modal>
  );
};

export default ItemModal;
