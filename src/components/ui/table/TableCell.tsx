import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface ITableCell {
  children: ReactNode;
  className?: string;
}

const TableCell = ({ children, className }: ITableCell) => (
  <td className={cn("px-4 py-3", className)}>{children}</td>
);

export default TableCell;
