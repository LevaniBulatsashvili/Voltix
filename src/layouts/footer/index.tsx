import { useTranslation } from "react-i18next";
import Brand from "./Brand";
import Section, { type ISection } from "./Section";
import { memo, useMemo } from "react";

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  const { t } = useTranslation();

  const sections: ISection[] = useMemo(
    () => [
      {
        title: t("footer.company"),
        links: [
          t("footer.about"),
          t("footer.careers"),
          t("footer.blog"),
          t("footer.press"),
        ],
      },
      {
        title: t("footer.help"),
        links: [
          t("footer.contact_us"),
          t("footer.shipping_delivery"),
          t("footer.returns"),
          t("footer.order_tracking"),
        ],
      },
      {
        title: t("footer.FAQ"),
        links: [
          t("footer.account"),
          t("footer.manage_deliveries"),
          t("footer.orders"),
          t("footer.payments"),
        ],
      },
      {
        title: t("footer.resources"),
        links: [
          t("footer.guides"),
          t("footer.tutorials"),
          t("footer.product_reviews"),
          t("footer.comparison_charts"),
        ],
      },
    ],
    [t],
  );

  return (
    <footer className="py-5 px-6 sm:px-10 lg:px-24">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 ">
        <Brand />

        {sections.map((section) => (
          <Section
            key={section.title}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>

      <div className="mt-12 border-t border-primary pt-6 text-center text-sm capitalize">
        © {CURRENT_YEAR} {t("footer.voltix_all_rights_reserved")}
      </div>
    </footer>
  );
};

export default memo(Footer);
