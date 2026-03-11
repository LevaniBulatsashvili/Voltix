import { useTranslation } from "react-i18next";
import AppLink from "../../../../components/button/AppLink";
import type { ICrumb } from "../../../../types/Crumbs";

interface IBreadcrumbItem {
  crumb: ICrumb;
  isLast: boolean;
}

const BreadcrumbItem = ({ crumb, isLast }: IBreadcrumbItem) => {
  const { t } = useTranslation();

  return (
    <li className="flex items-center">
      {crumb.path && !isLast ? (
        <AppLink
          to={crumb.path}
          className="transition-colors duration-200 capitalize"
        >
          {t(`product-${crumb.name}`)}
        </AppLink>
      ) : (
        <span className="font-semibold capitalize">
          {t(`product-${crumb.name}`)}
        </span>
      )}

      {!isLast && <span className="mx-2 text-primary">{`>`}</span>}
    </li>
  );
};

export default BreadcrumbItem;
