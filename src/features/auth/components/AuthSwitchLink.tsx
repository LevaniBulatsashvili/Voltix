import { useTranslation } from "react-i18next";
import AppLink from "../../../components/button/AppLink";

interface IAuthFooter {
  to: string;
  text: string;
  linkText: string;
}

const AuthSwitchLink = ({ to, text, linkText }: IAuthFooter) => {
  const { t } = useTranslation();

  return (
    <p className="mt-10 text-center text-sm">
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
