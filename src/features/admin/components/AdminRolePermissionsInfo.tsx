import InfoDropdown from "@/components/common/InfoDropdown";
import { useTranslation } from "react-i18next";

const AdminRolePermissionsInfo = () => {
  const { t } = useTranslation();

  return (
    <InfoDropdown
      title="Role Permissions"
      className="relative"
      contentClassName="-left-27"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold px-2 py-0.5 rounded-full w-fit bg-amber-50 text-amber-700">
            {t("common.admin")}
          </span>
          <p className="text-xs opacity-80 leading-relaxed">
            {t("admin_management.can_create_edit_and_delete_their_own_items")}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold px-2 py-0.5 rounded-full w-fit bg-blue-50 text-blue-700">
            {t("common.developer")}
          </span>
          <p className="text-xs opacity-80 leading-relaxed">
            {t("admin_management.can_create_edit_and_delete_all_items")}
          </p>
        </div>
      </div>
    </InfoDropdown>
  );
};

export default AdminRolePermissionsInfo;
