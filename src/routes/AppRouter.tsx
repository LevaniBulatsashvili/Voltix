import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthRoute from "@/routes/AuthRoute";
import { PAGE } from "@/pages/pageConfig";
import LoginPage from "@/features/auth/login/components";
import RegisterPage from "@/features/auth/register/components";
import VerifyEmailPage from "@/pages/auth/verification/VerifyEmailPage";
import VerificationSuccessPage from "@/pages/auth/verification/VerificationSuccessPage";
import ProductsPage from "@/pages/public/products/ProductsPage";
import MainLayout from "@/layouts/PageLayout";
import ProductPage from "@/pages/public/product/ProductPage";
import ProfilePage from "@/pages/user/profile/ProfilePage";
import CartPage from "@/pages/user/cart/CartPage";
import CategoryPage from "@/pages/public/category/CategoryPage";
import NotFoundPage from "@/pages/error/notFound/NotFoundPage";
import SettingsPage from "@/pages/user/settings/SettingsPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />} path={PAGE.PUBLIC.BASE}>
        <Route index element={<Navigate to={PAGE.PUBLIC.SHOP} replace />} />

        {/* Guest-only pages */}
        <Route element={<AuthRoute guestOnly />}>
          <Route path={PAGE.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={PAGE.AUTH.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<AuthRoute verifyPagesOnly />}>
          <Route path={PAGE.AUTH.VERIFY_EMAIL} element={<VerifyEmailPage />} />
          <Route
            path={PAGE.AUTH.VERIFY_SUCCESS}
            element={<VerificationSuccessPage />}
          />
        </Route>

        {/* Protected pages for any logged-in user */}
        <Route element={<AuthRoute requireAuth />}>
          <Route path={PAGE.PUBLIC.SHOP} element={<ProductsPage />} />
          <Route path={PAGE.PUBLIC.PRODUCT} element={<ProductPage />} />
          <Route path={PAGE.PUBLIC.SEARCH} element={<CategoryPage />} />

          {/* user */}
          <Route path={PAGE.USER.PROFILE} element={<ProfilePage />} />
          <Route path={PAGE.USER.CART} element={<CartPage />} />
          <Route path={PAGE.USER.SETTINGS} element={<SettingsPage />} />
        </Route>

        {/* Admin-only pages */}
        <Route element={<AuthRoute requireAuth allowedRoles={["admin"]} />}>
          {/* <Route path={PAGE.ADMIN} element={<AdminPage />} /> */}
        </Route>

        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
