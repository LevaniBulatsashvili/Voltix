import type { ReactNode } from "react";

export const TableRow = ({ children }: { children: ReactNode }) => (
  <tr className="border-b border-primary/60 hover:bg-primary/10 transition-colors">
    {children}
  </tr>
);
