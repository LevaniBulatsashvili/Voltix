import { useTranslation } from "react-i18next";
import AppLink from "@/components/button/AppLink";
import { cn } from "@/utils/cn";

interface IViewProducts {
  to: string;
  text: string;
  className?: string;
  "aria-label"?: string;
}

const ViewProducts = ({
  to,
  text,
  className,
  "aria-label": ariaLabel,
}: IViewProducts) => {
  const { t } = useTranslation();

  return (
    <AppLink
      to={to}
      aria-label={ariaLabel}
      className={cn(
        "px-16 py-3 rounded-full bg-accent hover:opacity-80 text-white font-semibold",
        className,
      )}
    >
      {t(text)}
    </AppLink>
  );
};

export default ViewProducts;
