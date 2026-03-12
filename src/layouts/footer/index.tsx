import { useTranslation } from "react-i18next";
import Brand from "./Brand";
import Section, { type ISection } from "./Section";

const Footer = () => {
  const { t } = useTranslation();

  const sections: ISection[] = [
    {
      title: t("footer-company"),
      links: [
        t("footer-about"),
        t("footer-careers"),
        t("footer-blog"),
        t("footer-press"),
      ],
    },
    {
      title: t("footer-help"),
      links: [
        t("footer-contact us"),
        t("footer-shipping & delivery"),
        t("footer-returns"),
        t("footer-order tracking"),
      ],
    },
    {
      title: t("footer-FAQ"),
      links: [
        t("footer-account"),
        t("footer-manage deliveries"),
        t("footer-orders"),
        t("footer-payments"),
      ],
    },
    {
      title: t("footer-resources"),
      links: [
        t("footer-guides"),
        t("footer-tutorials"),
        t("footer-product reviews"),
        t("footer-comparison charts"),
      ],
    },
  ];

  return (
    <footer className="bg-background text-primary py-5 px-6 sm:px-10 lg:px-24">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 ">
        <Brand />

        {sections.map((section, idx) => (
          <Section key={idx} title={section.title} links={section.links} />
        ))}
      </div>

      <div className="mt-12 border-t border-primary pt-6 text-center text-sm capitalize">
        © {new Date().getFullYear()} {t("footer-voltix. all rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;
