import { useEscKey } from "@/hooks/useEscKey";
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { ReactNode } from "react";

interface IModal {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({ isOpen, children, onClose, className = "" }: IModal) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => isOpen && onClose());
  useEscKey(() => isOpen && onClose());

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={`bg-background text-primary border border-primary/30 rounded-xl py-8 px-3 sm:px-6 lg:px-8 w-full max-w-xl shadow-lg mx-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
