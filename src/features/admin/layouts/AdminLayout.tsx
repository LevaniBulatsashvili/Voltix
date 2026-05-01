import AdminNavigation from "../components/AdminNavigation";
import PageWrapper from "@/components/ui/PageWrapper";
import { Outlet } from "react-router-dom";
import { PAGE } from "@/pages/pageConfig";

const ADMIN_PAGES = [
  { label: "admin_management.products.products", value: PAGE.ADMIN.PRODUCTS },
  {
    label: "admin_management.main_categories.main_categories",
    value: PAGE.ADMIN.MAIN_CATEGORIES,
  },
  {
    label: "admin_management.categories.categories",
    value: PAGE.ADMIN.CATEGORIES,
  },
  { label: "admin_management.brands.brands", value: PAGE.ADMIN.BRANDS },
  {
    label: "admin_management.product_specs.product_specs",
    value: PAGE.ADMIN.PRODUCT_SPECS,
  },
];

const AdminLayout = () => (
  <PageWrapper>
    <AdminNavigation items={ADMIN_PAGES} />

    <Outlet />
  </PageWrapper>
);

export default AdminLayout;
