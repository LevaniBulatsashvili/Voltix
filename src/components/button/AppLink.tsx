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
      className={`text-primary hover:text-primary/70 transition capitalize ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default AppLink;
