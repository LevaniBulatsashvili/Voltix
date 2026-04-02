import PageContainer from "./PageContainer.tsx";
import Footer from "./footer/index.tsx";
import Header from "./header/index.tsx";
import { useAppSelector } from "../hooks/redux.ts";
import { themeSelector } from "../store/theme/theme.slice.ts";
import ErrorBoundary from "../components/feedback/ErrorBoundary.tsx";
import OopsPage from "../pages/error/oops/OopsPage.tsx";

const MainLayout = () => {
  const { theme } = useAppSelector(themeSelector);

  return (
    <div
      className={`${theme} flex flex-col min-h-screen text-primary bg-background`}
    >
      <Header />
      <ErrorBoundary fallback={<OopsPage />}>
        <PageContainer />
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default MainLayout;
