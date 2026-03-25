import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthRoute from "../routes/AuthRoute";
import { PAGE } from "../pages/pageConfig";
import LoginPage from "../features/auth/login/components";
import RegisterPage from "../features/auth/register/components";
import VerifyEmailPage from "../pages/auth/verification/VerifyEmailPage";
import VerificationSuccessPage from "../pages/auth/verification/VerificationSuccessPage";
import ProductsPage from "../pages/products/ProductsPage";
import MainLayout from "../layouts/PageLayout";
import ProductPage from "../pages/product/ProductPage";
import ProfilePage from "../pages/user/profile/ProfilePage";
import CartPage from "../pages/user/cart/CartPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />} path={PAGE.BASE}>
        <Route index element={<Navigate to={PAGE.PRODUCTS} replace />} />

        {/* Guest-only pages */}
        <Route element={<AuthRoute guestOnly />}>
          <Route path={PAGE.LOGIN} element={<LoginPage />} />
          <Route path={PAGE.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<AuthRoute verifyPagesOnly />}>
          <Route path={PAGE.VERIFY_EMAIL} element={<VerifyEmailPage />} />
          <Route
            path={PAGE.VERIFY_SUCCESS}
            element={<VerificationSuccessPage />}
          />
        </Route>

        {/* Protected pages for any logged-in user */}
        <Route element={<AuthRoute requireAuth />}>
          <Route path={PAGE.PRODUCTS} element={<ProductsPage />} />
          <Route path={PAGE.PRODUCT} element={<ProductPage />} />
          <Route path={PAGE.PROFILE} element={<ProfilePage />} />
          <Route path={PAGE.CART} element={<CartPage />} />
        </Route>

        {/* Admin-only pages */}
        <Route element={<AuthRoute requireAuth allowedRoles={["admin"]} />}>
          {/* <Route path={PAGE.ADMIN} element={<AdminPage />} /> */}
        </Route>

        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<Navigate to={PAGE.PRODUCTS} replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
