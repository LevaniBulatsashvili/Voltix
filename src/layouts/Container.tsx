import { Outlet } from "react-router-dom";

const Container = () => {
  return (
    <main className="flex-grow flex flex-col justify-center items-center m-6">
      <Outlet />
    </main>
  );
};

export default Container;
