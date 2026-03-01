import { Outlet } from "react-router-dom";

const PageContainer = () => {
  return (
    <main className="bg-primary grow flex flex-col justify-center items-center mx-25">
      <Outlet />
    </main>
  );
};

export default PageContainer;
