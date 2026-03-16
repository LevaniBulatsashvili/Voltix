import { useAppSelector } from "../../hooks/redux";
import UserHeader from "./UserHeader";
import GuestHeader from "./GuestHeader";
import { useTranslation } from "react-i18next";
import { PAGE } from "../../pages/pageConfig";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const navLinks = [
    { label: t("header-shop"), to: PAGE.SHOP },
    { label: t("header-on sale"), to: PAGE.SALE },
    { label: t("header-new arrivals"), to: PAGE.ARRIVALS },
    { label: t("header-categories"), to: PAGE.CATEGORIES },
  ];
  const languages = [
    { value: "en", language: "Eng", code: "us" },
    { value: "ka", language: "ქარ", code: "ge" },
  ];
  const cartProducts = 2;

  if (user)
    return (
      <UserHeader
        cartProducts={cartProducts}
        navLinks={navLinks}
        languages={languages}
      />
    );
  return <GuestHeader languages={languages} />;
};

export default Header;
