import TableCell from "@/components/ui/table/TableCell";
import { TableRow } from "@/components/ui/table/TableRow";
import AdminTable from "@/features/admin/components/AdminTable";
import type { ICategory } from "@/types/public/product";
import { useTranslation } from "react-i18next";

interface IAdminCategoriesTable {
  categories: ICategory[];
  isLoading: boolean;
  onEdit: (c: ICategory) => void;
  onDelete: (c: ICategory) => void;
}

const AdminCategoriesTable = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: IAdminCategoriesTable) => {
  const { t } = useTranslation();

  return (
    <AdminTable
      data={categories}
      isLoading={isLoading}
      columns={[
        { label: t("admin_management.items.category"), className: "w-1/2" },
        {
          label: t("admin_management.items.main_category"),
          className: "w-1/2",
        },
      ]}
      renderRow={(category) => (
        <TableRow key={category.id}>
          <TableCell>{category.id}</TableCell>
          <TableCell className="font-medium truncate">
            {category.name}
          </TableCell>
          <TableCell>{category.main_category!.name}</TableCell>
          <TableCell>
            <div className="flex gap-4">
              <button onClick={() => onEdit(category)}>✏️</button>
              <button onClick={() => onDelete(category)}>🗑</button>
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default AdminCategoriesTable;
