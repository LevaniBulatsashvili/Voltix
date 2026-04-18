import { X } from "lucide-react";
import type { ReactNode } from "react";
import Modal from "./Modal";

interface IConfirmModal {
  open: boolean;
  title: string;
  description?: ReactNode | string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  variant?: "default" | "danger";
}

const ConfirmModal = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  variant = "default",
}: IConfirmModal) => {
  const isDanger = variant === "danger";

  return (
    <Modal isOpen={open} onClose={onClose} className="max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <button onClick={onClose} className="opacity-60 hover:opacity-100">
          <X size={16} />
        </button>
      </div>

      {description && <p className="text-md opacity-80 mb-5">{description}</p>}

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="h-9 px-4 font-semibold border border-background/50 rounded-lg text-md hover:bg-background/5"
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          className={`h-9 px-4 font-semibold rounded-lg text-md border ${
            isDanger
              ? "border-red-400 text-red-500 hover:bg-red-50"
              : "border-indigo-200 text-indigo-500 hover:bg-indigo-50"
          }`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
