import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

interface ILinkBtn {
  children: ReactNode;
  to?: string;
}

const LinkBtn = ({ children, ...props }: ILinkBtn & LinkProps) => {
  return (
    <Link
      {...props}
      className="bg-primary text-background font-semibold px-6 py-3 rounded-lg shadow hover:opacity-80 transition-colors duration-200"
    >
      {children}
    </Link>
  );
};

export default LinkBtn;
