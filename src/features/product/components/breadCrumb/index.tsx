import type { IProduct } from "../../../../types/Product";
import type { ICrumb } from "../../../../types/Crumbs";
import { PAGE } from "../../../../pages/pageConfig";
import { useTranslation } from "react-i18next";
import AppLink from "../../../../components/button/AppLink";

interface IBreadcrumbs {
  product: IProduct;
}

const Breadcrumbs = ({ product }: IBreadcrumbs) => {
  const { t } = useTranslation();

  const crumbs: ICrumb[] = [
    { label: t("product.home"), to: PAGE.BASE },
    {
      label: t(`product.${product.main_category.name.toLowerCase()}`),
      to: `${PAGE.CATEGORIES}/${product.main_category.id}`,
    },
    {
      label: t(`product.${product.category.name.toLowerCase()}`),
      to: `${PAGE.CATEGORIES}/${product.main_category.id}/${product.category.id}`,
    },
    { label: product.name },
  ];

  return (
    <nav className="text-primary mb-6" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, idx) => (
          <li key={idx}>
            {crumb.to ? (
              <AppLink to={crumb.to}>{crumb.label}</AppLink>
            ) : (
              <span>{crumb.label}</span>
            )}
            {idx < crumbs.length - 1 && " / "}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
