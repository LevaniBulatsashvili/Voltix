import type { ReactNode } from "react";
import { useEscKey } from "@/hooks/useEscKey";
import { useTranslation } from "react-i18next";

interface IModal {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  className = "",
}: IModal) => {
  const { t } = useTranslation();
  useEscKey(onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-background text-primary rounded-xl p-4 sm:p-6 w-full max-w-xl shadow-lg mx-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-2xl font-bold mb-6 capitalize">{t(title)}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
