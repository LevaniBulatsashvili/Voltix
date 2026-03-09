import { useLocation } from "react-router-dom";
import BreadcrumbItem from "./BreadCrumbItem";
import { buildCrumbs } from "../../utils/buildCrumbs";
import type { ICrumb } from "../../../../types/Crumbs";

const Breadcrumbs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const crumbs: ICrumb[] = buildCrumbs(searchParams);

  return (
    <nav className="text-primary mb-6" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, idx) => (
          <BreadcrumbItem
            key={idx}
            crumb={crumb}
            isLast={idx === crumbs.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
