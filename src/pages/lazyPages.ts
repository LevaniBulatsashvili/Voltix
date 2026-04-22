import { lazy } from "react";

// Auth
export const LoginPage = lazy(() => import("@/features/auth/login/components"));
export const RegisterPage = lazy(() => import("@/features/auth/register/components"));
export const VerifyEmailPage = lazy(() => import("@/pages/auth/verification/VerifyEmailPage"));
export const VerificationSuccessPage = lazy(() => import("@/pages/auth/verification/VerificationSuccessPage"));

// Public
export const ProductsPage = lazy(() => import("@/pages/public/products/ProductsPage"));
export const ProductPage = lazy(() => import("@/pages/public/product/ProductPage"));
export const SearchPage = lazy(() => import("@/pages/public/search/SearchPage"));
export const CategoryPage = lazy(() => import("@/pages/public/category/CategoryPage"));
export const SearchResultsPage = lazy(() => import("@/pages/public/searchResults/SearchResultsPage"));

// User
export const ProfilePage = lazy(() => import("@/pages/user/profile/ProfilePage"));
export const CartPage = lazy(() => import("@/pages/user/cart/CartPage"));
export const SettingsPage = lazy(() => import("@/pages/user/settings/SettingsPage"));
export const WishlistPage = lazy(() => import("@/pages/user/wishlist/WishlistPage"));
export const OrdersPage = lazy(() => import("@/pages/user/orders/OrdersPage"));

// Admin
export const AdminProductPage = lazy(() => import("@/pages/admin/product/AdminProductsPage"));

// Error
export const NotFoundPage = lazy(() => import("@/pages/error/notFound/NotFoundPage"));