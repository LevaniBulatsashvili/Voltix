import { lazy } from "react";

// Auth
export const LoginPage = lazy(() => import("@/pages/auth/login/LoginPage"));
export const RegisterPage = lazy(
  () => import("@/pages/auth/register/RegisterPage"),
);
export const VerifyEmailPage = lazy(
  () => import("@/pages/auth/verification/VerifyEmailPage"),
);
export const VerificationSuccessPage = lazy(
  () => import("@/pages/auth/verification/VerificationSuccessPage"),
);
export const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/forgotPassword/ForgotPasswordPage"),
);
export const ResetPasswordPage = lazy(
  () => import("@/pages/auth/resetPassword/ResetPasswordPage"),
);

// Public
export const ProductsPage = lazy(
  () => import("@/pages/public/products/ProductsPage"),
);
export const ProductPage = lazy(
  () => import("@/pages/public/product/ProductPage"),
);
export const SearchPage = lazy(
  () => import("@/pages/public/search/SearchPage"),
);
export const CategoryPage = lazy(
  () => import("@/pages/public/category/CategoryPage"),
);
export const SearchResultsPage = lazy(
  () => import("@/pages/public/searchResults/SearchResultsPage"),
);

// User
export const ProfilePage = lazy(
  () => import("@/pages/user/profile/ProfilePage"),
);
export const CartPage = lazy(() => import("@/pages/user/cart/CartPage"));
export const SettingsPage = lazy(
  () => import("@/pages/user/settings/SettingsPage"),
);
export const WishlistPage = lazy(
  () => import("@/pages/user/wishlist/WishlistPage"),
);
export const OrdersPage = lazy(() => import("@/pages/user/orders/OrdersPage"));

// Admin
export const AdminProductsPage = lazy(
  () => import("@/pages/admin/products/AdminProductsPage"),
);
export const AdminCategoriesPage = lazy(
  () => import("@/pages/admin/categories/AdminCategoriesPage"),
);
export const AdminMainCategoriesPage = lazy(
  () => import("@/pages/admin/mainCategories/MainCategoriesPage"),
);
export const AdminBrandsPage = lazy(
  () => import("@/pages/admin/brands/AdminBrandsPage"),
);
export const AdminProductSpecsPage = lazy(
  () => import("@/pages/admin/productSpecs/AdminProductSpecsPage"),
);
export const AdminProductFAQsPage = lazy(
  () => import("@/pages/admin/productFAQs/AdminProductFAQsPage"),
);

// Error
export const NotFoundPage = lazy(
  () => import("@/pages/error/notFound/NotFoundPage"),
);
