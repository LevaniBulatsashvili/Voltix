import { useAppSelector } from "@/hooks/redux";
import UserHeader from "./UserHeader";
import GuestHeader from "./GuestHeader";
import { useTranslation } from "react-i18next";
import { buildCategoryLink } from "@/features/public/products/utils/buildCategoryLink";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const navLinks = [
    { label: t("header.on_sale"), to: buildCategoryLink("on-sale") },
    { label: t("header.new_arrivals"), to: buildCategoryLink("new-arrivals") },
    { label: t("products.top_selling"), to: buildCategoryLink("top-selling") },
  ];
  const languages = [
    { value: "en", language: "Eng", code: "us" },
    { value: "ka", language: "ქარ", code: "ge" },
  ];

  if (user?.email_verified)
    return <UserHeader navLinks={navLinks} languages={languages} />;
  return <GuestHeader languages={languages} />;
};

export default Header;
