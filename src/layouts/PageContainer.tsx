import { Outlet } from "react-router-dom";

const PageContainer = () => {
  return (
    <main className="bg-background grow flex flex-col justify-center items-center">
      <Outlet />
    </main>
  );
};

export default PageContainer;
