import { cn } from "@/utils/cn";
import { Link, type LinkProps } from "react-router-dom";
import type { ReactNode } from "react";

interface AppLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const AppLink = ({ to, children, className, ...props }: AppLinkProps) => (
  <Link
    to={to}
    className={cn(
      "capitalize border-b-2 border-transparent hover:border-current transition-colors duration-300",
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);

export default AppLink;
