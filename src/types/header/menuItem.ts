import type { ComponentType } from "react";

export interface MenuItem {
  label: string;
  icon: ComponentType<{ className?: string }>;
  to?: string;
  onClick?: () => void;
  type?: "link" | "button";
}
