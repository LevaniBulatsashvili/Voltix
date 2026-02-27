import { Link, type LinkProps } from "react-router-dom";
import { type ReactNode } from "react";

interface AppLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const AppLink = ({ to, children, className = "", ...props }: AppLinkProps) => {
  return (
    <Link
      to={to}
      className={`hover:text-neutral-600 transition ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default AppLink;
