import PageContainer from "./PageContainer.tsx";
import Footer from "./Footer.tsx";
import Header from "./Navbar.tsx";

const MainLayout = () => {
  return (
    <div className=" h-dvh gap-2 flex flex-col">
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default MainLayout;
