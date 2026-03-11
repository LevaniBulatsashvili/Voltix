import PageContainer from "./PageContainer.tsx";
import Footer from "./footer/index.tsx";
import Header from "./header/index.tsx";
import { useAppSelector } from "../hooks/redux.ts";
import { themeSelector } from "../store/theme/theme.slice.ts";
import { PAGE } from "../pages/pageConfig.ts";
import { useTranslation } from "react-i18next";

const MainLayout = () => {
  const { t } = useTranslation();
  const { theme } = useAppSelector(themeSelector);

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

  return (
    <div className={`${theme}`}>
      <Header
        navLinks={navLinks}
        cartProducts={cartProducts}
        languages={languages}
      />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
