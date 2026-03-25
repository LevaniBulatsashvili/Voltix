import type { ICrumb } from "../../types/Crumbs";
import AppLink from "../button/AppLink";

interface IBreadcrumbs {
  items: ICrumb[];
  separator?: string;
  className?: string;
}

const Breadcrumbs = ({
  items,
  separator = "/",
  className = "",
}: IBreadcrumbs) => {
  return (
    <nav className={`text-primary mb-6 ${className}`} aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((crumb, idx) => (
          <li
            key={`${crumb.label}-${idx}`}
            className="flex items-center capitalize"
          >
            {crumb.to ? (
              <AppLink to={crumb.to}>{crumb.label}</AppLink>
            ) : (
              <span className="text-gray-500">{crumb.label}</span>
            )}

            {idx < items.length - 1 && (
              <span className="mx-1 text-gray-400">{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
