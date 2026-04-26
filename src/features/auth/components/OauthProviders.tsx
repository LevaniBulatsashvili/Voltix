import { oauthProviders } from "../config/oauthProviders";
import OAuthButton from "./OauthButton";
import { useTranslation } from "react-i18next";

const OAuthProviders = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-sm opacity-50">{t("common.or")}</span>
        <hr className="flex-1" />
      </div>

      {oauthProviders.map((provider) => {
        const { trigger, isPending } = provider.useHook();
        return (
          <OAuthButton
            key={provider.id}
            labelKey={provider.labelKey}
            icon={provider.icon}
            onClick={trigger}
            disabled={isPending}
          />
        );
      })}
    </div>
  );
};

export default OAuthProviders;
