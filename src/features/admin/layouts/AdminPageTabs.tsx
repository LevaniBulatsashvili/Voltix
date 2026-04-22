import AdminProductsPage from "@/pages/admin/product/AdminProductsPage";

interface IAdminPageTabs {
  currentPage: string;
}

const AdminPageTabs = ({ currentPage }: IAdminPageTabs) => {
  if (currentPage === "products") return <AdminProductsPage />;

  return <></>;
};

export default AdminPageTabs;
