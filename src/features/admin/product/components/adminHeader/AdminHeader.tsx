import PrimaryButton from "@/components/button/PrimaryBtn";

interface AdminHeader {
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
}: AdminHeader) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
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
