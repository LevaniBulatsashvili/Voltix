import PrimaryButton from "@/components/button/PrimaryBtn";
import AdminRolePermissionsInfo from "./AdminRolePermissionsInfo";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

const AdminHeader = ({
  title,
  description,
  actionText,
  onAction,
}: AdminHeaderProps) => {
  return (
    <div className="flex justify-between flex-col sm:flex-row sm:items-center gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <AdminRolePermissionsInfo />
        </div>
        {description && (
          <p className="text-md opacity-80 mt-0.5">{description}</p>
        )}
      </div>
      {actionText && onAction && (
        <PrimaryButton text={actionText} onClick={onAction} />
      )}
    </div>
  );
};

export default AdminHeader;
