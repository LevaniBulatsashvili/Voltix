import type { ReactNode } from "react";

interface IPrimaryButton {
  children: ReactNode;
  onClick?: () => void;
}

const PrimaryButton = ({ children, ...props }: IPrimaryButton) => {
  return (
    <button
      {...props}
      className="bg-primary text-background font-semibold px-8 py-3 rounded-lg hover:opacity-80 transition-colors duration-200"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
