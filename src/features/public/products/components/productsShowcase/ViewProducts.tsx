import { useTranslation } from "react-i18next";
import AppLink from "@/components/button/AppLink";

interface IViewProducts {
  to: string;
  text: string;
  className?: string;
}

const ViewProducts = ({ to, text, className = "" }: IViewProducts) => {
  const { t } = useTranslation();

  return (
    <AppLink
      to={to}
      className={`px-16 py-3 rounded-full bg-accent hover:opacity-80 text-white font-semibold ${className}`}
    >
      {t(text)}
    </AppLink>
  );
};

export default ViewProducts;
