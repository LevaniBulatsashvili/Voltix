import AdminProductsPage from "@/pages/admin/products/AdminProductsPage";

interface IAdminPageTabs {
  currentPage: string;
}

const AdminPageTabs = ({ currentPage }: IAdminPageTabs) => {
  if (currentPage === "products") return <AdminProductsPage />;

  return <></>;
};

export default AdminPageTabs;
