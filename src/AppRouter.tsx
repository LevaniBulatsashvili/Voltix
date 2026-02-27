import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<></>} path={"/"}>
          <Route index element={<Navigate to={"/"} />} />
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
