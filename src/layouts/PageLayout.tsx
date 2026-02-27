import PageContainer from "./Container.tsx";
import Footer from "./Footer.tsx";
import Header from "./Navbar.tsx";

const MainLayout = () => {
  return (
    <div className=" h-[100dvh] gap-2 flex flex-col">
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
