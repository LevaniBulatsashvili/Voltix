import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/PageLayout";
import ProductsPage from "./pages/products/ProductsPage";
import { PAGE } from "./pages/pageConfig";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path={PAGE.BASE}>
          <Route index element={<Navigate to={PAGE.PRODUCTS} />} />
          <Route path={PAGE.PRODUCTS} element={<ProductsPage />} />
          <Route path={PAGE.NOT_FOUND} element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
