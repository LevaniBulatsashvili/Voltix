import { type ReactNode } from "react";

interface ITableCell {
  children: ReactNode;
  className?: string;
}

const TableCell = ({ children, className = "" }: ITableCell) => {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
};

export default TableCell;
