import { type ReactNode } from "react";

const TableHeader = ({ children }: { children: ReactNode }) => {
  return (
    <thead>
      <tr className="bg-primary text-background">{children}</tr>
    </thead>
  );
};

export default TableHeader;
