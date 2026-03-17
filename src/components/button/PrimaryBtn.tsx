import type { ElementType, ReactNode } from "react";
import type { LinkProps } from "react-router-dom";

interface IPrimaryButton {
  children: ReactNode;
  as?: ElementType;
  to?: string;
  onClick?: () => void;
}

const PrimaryButton = ({
  children,
  as: Component = "button",
  ...props
}: IPrimaryButton & LinkProps) => {
  return (
    <Component
      {...props}
      className="bg-primary text-background font-semibold px-6 py-3 rounded-lg shadow hover:opacity-80 transition-colors duration-200"
    >
      {children}
    </Component>
  );
};

export default PrimaryButton;
