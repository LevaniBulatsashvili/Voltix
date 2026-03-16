import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/PageLayout";
import ProductsPage from "../pages/products/ProductsPage";
import { PAGE } from "../pages/pageConfig";
import ProductPage from "../pages/product/ProductPage";
// import AdminPage from "./pages/admin/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path={PAGE.BASE}>
          <Route path={PAGE.LOGIN} element={<LoginPage />} />
          <Route path={PAGE.REGISTER} element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route index element={<Navigate to={PAGE.PRODUCTS} />} />

            <Route path={PAGE.PRODUCTS} element={<ProductsPage />} />

            <Route
              path={`${PAGE.SHOP}/:categories/:subcategories/:id`}
              element={<ProductPage />}
            />

            {/* <Route path={PAGE.Admin} element={<AdminPage />} /> */}
          </Route>
        </Route>

        <Route path={PAGE.NOT_FOUND} element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
