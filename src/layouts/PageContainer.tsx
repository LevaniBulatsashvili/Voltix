import { Outlet } from "react-router-dom";

const PageContainer = () => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center min-h-[88dvh]">
      <Outlet />
    </main>
  );
};

export default PageContainer;
