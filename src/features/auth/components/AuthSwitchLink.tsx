import { useTranslation } from "react-i18next";
import AppLink from "@/components/button/AppLink";
import { cn } from "@/utils/cn";

interface IAuthFooter {
  to: string;
  text: string;
  linkText: string;
  className?: string;
}

const AuthSwitchLink = ({
  to,
  text,
  linkText,
  className,
}: IAuthFooter) => {
  const { t } = useTranslation();

  return (
    <p className={cn("mt-7 text-center text-sm", className)}>
      {t(text)}
      <AppLink
        className="ml-1.5 font-semibold underline hover:opacity-80"
        to={to}
      >
        {t(linkText)}
      </AppLink>
    </p>
  );
};

export default AuthSwitchLink;
