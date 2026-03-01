import SearchBar from "../components/ui/SearchBar";
import { ShoppingCart, User } from "lucide-react";
import AppLink from "../components/button/AppLink";
import { type ChangeEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { PAGE } from "../pages/pageConfig";
import LangSelector from "../components/inputs/LangSelector";

interface NavLinksProps {
  links: { label: string; to: string }[];
}

const NavLinks = ({ links }: NavLinksProps) => (
  <nav className="flex">
    <ul className="flex items-center gap-6 whitespace-nowrap">
      {links.map((link) => (
        <li key={link.to}>
          <AppLink to={link.to}>{link.label}</AppLink>
        </li>
      ))}
    </ul>
  </nav>
);

interface IconButtonProps {
  to: string;
  icon: ReactNode;
  badge?: number;
}

const IconButton = ({ to, icon, badge }: IconButtonProps) => (
  <AppLink to={to} className="relative">
    {icon}
    {badge !== undefined && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {badge}
      </span>
    )}
  </AppLink>
);

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const cartProducts = 2;
  const navLinks = [
    { label: t("shop"), to: "/shop" },
    { label: t("on sale"), to: "/sale" },
    { label: t("new arrivals"), to: "/arrrivals" },
    { label: t("brands"), to: "/brands" },
  ];

  const languages = [
    { value: "en", language: "Eng" },
    { value: "ka", language: "ქარ" },
  ];

  const onLangChange = (e: ChangeEvent<HTMLSelectElement>) =>
    i18n.changeLanguage(e.target.value);

  return (
    <header className="my-6 mx-25 flex gap-10 items-center">
      <AppLink to={PAGE.BASE} className="text-4xl font-extrabold">
        {t("voltix")}
      </AppLink>
      <NavLinks links={navLinks} />
      <SearchBar />
      <div className="flex items-center gap-4">
        <IconButton
          to={PAGE.CART}
          icon={<ShoppingCart className="size-7" />}
          badge={cartProducts}
        />
        <IconButton to={PAGE.PROFILE} icon={<User className="size-7" />} />
        <LangSelector
          value={i18n.language}
          onChange={onLangChange}
          languages={languages}
        />
      </div>
    </header>
  );
};

export default Navbar;
