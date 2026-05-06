import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface IText {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

const Text = ({ children, className, align = "center" }: IText) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <p className={cn("mb-12", alignClass[align], className)}>{children}</p>
  );
};

export default Text;
