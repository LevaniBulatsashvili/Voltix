import { type ReactNode } from "react";

interface IProfileInfoRow {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

const ProfileInfoRow = ({ icon, title, subtitle }: IProfileInfoRow) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <p className="text-lg font-medium">{title}</p>
      {subtitle && <p className="opacity-80">{subtitle}</p>}
    </div>
  </div>
);

export default ProfileInfoRow;
