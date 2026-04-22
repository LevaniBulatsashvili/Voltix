import AppLink from "@/components/button/AppLink";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export interface IAdminNavItem {
  label: string;
  value: string;
}

interface IAdminNavigation {
  items: IAdminNavItem[];
  className?: string;
}

const AdminNavigation = ({ items, className }: IAdminNavigation) => {
  const { t } = useTranslation();
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <nav className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 ${className}`}>
      {items.map((item) => (
        <AppLink
          key={item.value}
          to={item.value}
          className={`
            bg-primary text-background text-center py-2 font-semibold
            ${
              activePath === item.value
                ? ""
                : "opacity-75 hover:opacity-100 transition duration-200"
            }`}
        >
          {t(item.label)}
        </AppLink>
      ))}
    </nav>
  );
};

export default AdminNavigation;
