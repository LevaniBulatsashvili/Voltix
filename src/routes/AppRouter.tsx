import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthRoute from "@/routes/AuthRoute";
import { PAGE } from "@/pages/pageConfig";
import MainLayout from "@/layouts/PageLayout";
import * as Page from "@/pages/lazyPages";
import AdminLayout from "@/features/admin/layouts/AdminLayout";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />} path={PAGE.PUBLIC.BASE}>
        <Route index element={<Navigate to={PAGE.PUBLIC.SHOP} replace />} />

        {/* Authentication */}
        <Route element={<AuthRoute guestOnly />}>
          <Route path={PAGE.AUTH.LOGIN} element={<Page.LoginPage />} />
          <Route path={PAGE.AUTH.REGISTER} element={<Page.RegisterPage />} />
        </Route>

        {/* Waiting Verification */}
        <Route element={<AuthRoute verifyPagesOnly />}>
          <Route
            path={PAGE.AUTH.VERIFY_EMAIL}
            element={<Page.VerifyEmailPage />}
          />
          <Route
            path={PAGE.AUTH.VERIFY_SUCCESS}
            element={<Page.VerificationSuccessPage />}
          />
        </Route>

        {/* Public */}
        <Route path={PAGE.PUBLIC.SHOP} element={<Page.ProductsPage />} />
        <Route path={PAGE.PUBLIC.PRODUCT} element={<Page.ProductPage />} />
        <Route path={PAGE.PUBLIC.SEARCH} element={<Page.SearchPage />} />
        <Route path={PAGE.PUBLIC.CATEGORY} element={<Page.CategoryPage />} />
        <Route
          path={PAGE.PUBLIC.SEARCH_RESULTS}
          element={<Page.SearchResultsPage />}
        />

        {/* Authenticated */}
        <Route element={<AuthRoute requireAuth />}>
          <Route path={PAGE.USER.PROFILE} element={<Page.ProfilePage />} />
          <Route path={PAGE.USER.SETTINGS} element={<Page.SettingsPage />} />
        </Route>

        {/* User */}
        <Route element={<AuthRoute requireAuth allowedRoles="user" />}>
          <Route path={PAGE.USER.ORDERS} element={<Page.OrdersPage />} />
          <Route path={PAGE.USER.WISHLIST} element={<Page.WishlistPage />} />
          <Route path={PAGE.USER.CART} element={<Page.CartPage />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayout />} path={PAGE.ADMIN.BASE}>
          <Route element={<AuthRoute requireAuth allowedRoles={"admin"} />}>
            <Route
              path={PAGE.ADMIN.PRODUCTS}
              element={<Page.AdminProductsPage />}
            />
            <Route
              path={PAGE.ADMIN.CATEGORIES}
              element={<Page.AdminCategoriesPage />}
            />
            <Route
              path={PAGE.ADMIN.MAIN_CATEGORIES}
              element={<Page.AdminMainCategoriesPage />}
            />
            <Route
              path={PAGE.ADMIN.BRANDS}
              element={<Page.AdminBrandsPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Page.NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
