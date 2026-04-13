import { useTranslation } from "react-i18next";
import AppLink from "@/components/button/AppLink";
import { PAGE } from "../../pageConfig";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="mt-7 text-2xl font-semibold capitalize">
        {t("errors.page_not_found")}
      </h2>

      <p className="mt-2 max-w-md">
        {t(
          "errors.the_page_you’re_looking_for_doesn’t_exist_or_has_been_moved._Let’s_get_you_back_to_shopping",
        )}
      </p>

      <div className="mt-10 flex flex-col font-semibold sm:flex-row gap-3 w-full max-w-md">
        <AppLink
          className="w-full py-4 rounded-full! border! border-primary! hover:opacity-85 hover:shadow-lg"
          to={`${PAGE.PUBLIC.SEARCH}`}
        >
          {t("errors.continue_shopping")}
        </AppLink>

        <AppLink
          to={PAGE.PUBLIC.BASE}
          className="w-full py-4 rounded-full! text-background bg-primary hover:opacity-85"
        >
          {t("errors.go_home")}
        </AppLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
