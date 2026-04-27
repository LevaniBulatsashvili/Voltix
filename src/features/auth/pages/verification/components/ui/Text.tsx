import type { ReactNode } from "react";

interface IText {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

const Text = ({ children, className = "", align = "center" }: IText) => {
  return <p className={`mb-12 text-${align} ${className}`}>{children}</p>;
};

export default Text;
