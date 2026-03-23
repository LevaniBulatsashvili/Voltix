import { type ReactNode } from "react";

interface IInfoRow {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

const InfoRow = ({ icon, title, subtitle }: IInfoRow) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <p className="text-lg font-medium">{title}</p>
      {subtitle && <p className="opacity-80">{subtitle}</p>}
    </div>
  </div>
);

export default InfoRow;
