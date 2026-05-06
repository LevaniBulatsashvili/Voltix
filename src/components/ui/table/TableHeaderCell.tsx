import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface ITableHeadCell {
  children: ReactNode;
  className?: string;
}

const TableHeadCell = ({ children, className }: ITableHeadCell) => (
  <th
    className={cn(
      "text-left px-4 py-2.5 text-md font-medium uppercase tracking-wide",
      className,
    )}
  >
    {children}
  </th>
);

export default TableHeadCell;
