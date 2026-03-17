import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/PageLayout";
import ProductsPage from "../pages/products/ProductsPage";
import ProductPage from "../pages/product/ProductPage";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
// import AdminPage from "../pages/admin/AdminPage";
import AuthRoute from "./AuthRoute";
import { PAGE } from "../pages/pageConfig";
import VerifyEmailPage from "../pages/auth/verification/VerifyEmailPage";
import VerificationSuccessPage from "../pages/auth/verification/VerificationSuccessPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path={PAGE.BASE}>
          {/* Guest */}
          <Route element={<AuthRoute guestOnly />}>
            <Route path={PAGE.LOGIN} element={<LoginPage />} />
            <Route path={PAGE.REGISTER} element={<RegisterPage />} />
          </Route>

          {/* Unverified */}
          <Route
            element={
              <AuthRoute requireAuth={true} requireEmailVerified={false} />
            }
          >
            <Route path={PAGE.VERIFY_EMAIL} element={<VerifyEmailPage />} />
            <Route
              path={PAGE.VERIFY_SUCCESS}
              element={<VerificationSuccessPage />}
            />
          </Route>

          {/* Protected */}
          <Route
            element={
              <AuthRoute requireAuth={true} requireEmailVerified={true} />
            }
          >
            <Route index element={<Navigate to={PAGE.PRODUCTS} />} />
            <Route path={PAGE.PRODUCTS} element={<ProductsPage />} />
            <Route
              path={`${PAGE.SHOP}/:categories/:subcategories/:id`}
              element={<ProductPage />}
            />
          </Route>

          {/* Admin */}
          <Route
            element={
              <AuthRoute
                requireAuth={true}
                allowedRoles={["admin"]}
                requireEmailVerified={true}
              />
            }
          >
            {/* <Route path={PAGE.ADMIN} element={<AdminPage />} /> */}
          </Route>
        </Route>

        <Route path={PAGE.NOT_FOUND} element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
