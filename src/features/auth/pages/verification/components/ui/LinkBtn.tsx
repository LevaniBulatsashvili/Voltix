import { cn } from "@/utils/cn";
import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

const LinkBtn = ({
  children,
  ...props
}: LinkProps & { children: ReactNode }) => (
  <Link
    {...props}
    className={cn(
      "bg-primary text-background font-semibold px-6 py-3 rounded-lg shadow hover:opacity-80 transition-colors duration-200",
      props.className,
    )}
  >
    {children}
  </Link>
);

export default LinkBtn;
