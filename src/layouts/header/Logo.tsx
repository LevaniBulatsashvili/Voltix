import AppLink from "@/components/button/AppLink";
import { PAGE } from "@/pages/pageConfig";
import { memo } from "react";

interface ILogo {
  label: string;
  className?: string;
}

const Logo = ({ label, className = "" }: ILogo) => (
  <AppLink
    to={PAGE.PUBLIC.BASE}
    className={`text-3xl sm:text-4xl font-extrabold ${className}`}
  >
    {label}
  </AppLink>
);

export default memo(Logo);
