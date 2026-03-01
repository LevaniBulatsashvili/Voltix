import { Github, Linkedin } from "lucide-react";
import AppLink from "../components/button/AppLink";
import { useTranslation } from "react-i18next";

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <div>
    <p className="text-2xl font-semibold capitalize">{title}</p>
    <ul className="text-neutral-600 mt-6 space-y-3">
      {links.map((item, index) => (
        <li key={index}>
          <AppLink to="#" className="hover:text-black! capitalize">
            {item}
          </AppLink>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLinks = () => (
  <ul className="flex gap-4 mt-6">
    <li>
      <AppLink to="#">
        <Linkedin className="w-5 h-5" />
      </AppLink>
    </li>
    <li>
      <AppLink to="#">
        <Github className="w-5 h-5" />
      </AppLink>
    </li>
  </ul>
);

const Footer = () => {
  const { t } = useTranslation();
  const sections = [
    {
      title: t("company"),
      links: [t("about"), t("features"), t("works"), t("career")],
    },
    {
      title: t("help"),
      links: [
        t("customer support"),
        t("delivery details"),
        t("terms & conditions"),
        t("privacy policy"),
      ],
    },
    {
      title: t("FAQ"),
      links: [t("account"), t("manage deliveries"), t("orders"), t("payments")],
    },
  ];

  return (
    <footer className="bg-[#F0F0F0] py-25 px-35">
      <div className="grid grid-cols-4 gap-35">
        <div className="space-y-8">
          <div>
            <p className="text-4xl font-extrabold">{t("voltix")}</p>
            <p className="mt-6 text-neutral-600">
              {t(
                "Voltix is your trusted source for the latest electronics, gadgets, and smart devices.",
              )}
            </p>
          </div>
          <SocialLinks />
        </div>

        {sections.map((section, idx) => (
          <FooterSection
            key={idx}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>

      <div className="mt-13 border-t border-neutral-500 pt-6 text-center text-sm text-neutral-500 capitalize">
        © {new Date().getFullYear()} {t("voltix. all rights reserved.")}
      </div>
    </footer>
  );
};

export default Footer;
