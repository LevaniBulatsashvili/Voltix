import SearchBar from "../components/ui/SearchBar";
import { ShoppingCart, User } from "lucide-react";
import AppLink from "../components/button/AppLink";
import { useTranslation } from "react-i18next";
import { PAGE } from "../pages/pageConfig";
import LangSelector from "../components/inputs/LangSelector";
import { useAppDispatch } from "../hooks/redux";
import { toggleTheme } from "../store/theme/theme.slice";
import ToggleBtn from "../components/button/ToggleBtn";

interface NavLinksProps {
  links: { label: string; to: string }[];
}

const NavLinks = ({ links }: NavLinksProps) => (
  <nav className="flex">
    <ul className="flex items-center text-primary gap-6 whitespace-nowrap">
      {links.map((link) => (
        <li key={link.to}>
          <AppLink to={link.to}>{link.label}</AppLink>
        </li>
      ))}
    </ul>
  </nav>
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
    { value: "en", language: "Eng", code: "us" },
    { value: "ka", language: "ქარ", code: "ge" },
  ];

  const dispatch = useAppDispatch();
  const toggleMode = () => dispatch(toggleTheme());

  return (
    <header className="my-6 mx-25 flex gap-10 items-center">
      <AppLink to={PAGE.BASE} className="text-4xl font-extrabold text-primary">
        {t("voltix")}
      </AppLink>
      <NavLinks links={navLinks} />
      <SearchBar />
      <div className="flex items-center gap-4">
        <AppLink to={PAGE.CART}>
          <div className="relative">
            <ShoppingCart className="size-7" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartProducts}
            </span>
          </div>
        </AppLink>
        <AppLink to={PAGE.PROFILE} className="border-2 p-0.5 rounded-full">
          <User className="size-7" />
        </AppLink>

        <LangSelector
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          languages={languages}
        />

        <ToggleBtn
          onToggle={toggleMode}
          className="border border-indigo-400 shadow-md hover:border-indigo-600"
          inactiveToggleClassName="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-300 border-gray-400"
          activeToggleClassName="bg-gradient-to-r from-indigo-800 via-blue-900 to-gray-900 border-gray-700"
          inactiveThumbClassName="bg-yellow-400"
          activeThumbClassName="bg-gray-200"
        />
      </div>
    </header>
  );
};

export default Navbar;
