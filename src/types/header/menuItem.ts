import type { ReactNode } from "react";

export interface MenuItem {
  label: string;
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "link" | "button";
}
