import { useTranslation } from "react-i18next";
import AppLink from "../../../components/button/AppLink";
import { PAGE } from "../../pageConfig";

const OopsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[88dvh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        {t("errors.oops_something_went_wrong")}
      </h1>
      <p className="text-lg mb-11">
        {t("errors.try_refreshing_the_page_or_come_back_later")}
      </p>
      <AppLink
        className="w-45 py-4 rounded-full! text-background bg-primary hover:opacity-85"
        to={PAGE.BASE}
      >
        {t("errors.go_home")}
      </AppLink>
    </div>
  );
};
export default OopsPage;
