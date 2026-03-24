import { Linkedin, Github } from "lucide-react";
import AppLink from "../../components/button/AppLink";
import { useTranslation } from "react-i18next";

const SocialLinks = () => (
  <ul className="flex gap-4 mt-4">
    <li>
      <AppLink to="#">
        <Linkedin className="size-5 hover:scale-110 transition-transform" />
      </AppLink>
    </li>
    <li>
      <AppLink to="#">
        <Github className="size-5 hover:scale-110 transition-transform" />
      </AppLink>
    </li>
  </ul>
);

const Brand = () => {
  const { t } = useTranslation();

  return (
    <div className="text-left grid col-span-2 lg:col-span-1 min-h-30 gap-4">
      <p className="text-4xl font-extrabold capitalize">{t("voltix")}</p>
      <p>
        {t(
          "footer.Voltix_is_your_trusted_source_for_the_latest_electronics,_gadgets,_and_smart_devices",
        )}
      </p>
      <SocialLinks />
    </div>
  );
};

export default Brand;
