import PageContainer from "./PageContainer.tsx";
import Footer from "./footer/index.tsx";
import Header from "./header/index.tsx";
import { useAppSelector } from "../hooks/redux.ts";
import { themeSelector } from "../store/theme/theme.slice.ts";

const MainLayout = () => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <div className={`${theme}`}>
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
