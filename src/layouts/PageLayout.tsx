import PageContainer from "./PageContainer.tsx";
import Footer from "./Footer.tsx";
import Header from "./Navbar.tsx";
import { useAppSelector } from "../hooks/redux.ts";
import { themeSelector } from "../store/theme/theme.slice.ts";

const MainLayout = () => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <div className={`${theme} h-dvh flex flex-col bg-background`}>
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
