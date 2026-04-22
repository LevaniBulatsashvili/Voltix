import { TableRow } from "@/components/ui/table/TableRow";
import TableCell from "@/components/ui/table/TableCell";
import AdminTable from "@/features/admin/components/AdminTable";
import type { IMainCategory } from "@/types/public/product";
import { useTranslation } from "react-i18next";

interface IMainCategoriesTable {
  mainCategories: IMainCategory[];
  isLoading: boolean;
  onEdit: (mc: IMainCategory) => void;
  onDelete: (mc: IMainCategory) => void;
}

export const MainCategoriesTable = ({
  mainCategories,
  isLoading,
  onEdit,
  onDelete,
}: IMainCategoriesTable) => {
  const { t } = useTranslation();

  return (
    <AdminTable
      data={mainCategories}
      isLoading={isLoading}
      columns={[
        { label: t("admin_management.form.name"), className: "w-1/2" },
        { label: t("admin_management.form.thumbnail"), className: "w-1/2" },
      ]}
      renderRow={(mc) => (
        <TableRow key={mc.id}>
          <TableCell>{mc.id}</TableCell>
          <TableCell className="font-medium">{mc.name}</TableCell>
          <TableCell>
            {mc.thumbnail ? (
              <img
                src={mc.thumbnail}
                alt={mc.name}
                className="h-10 w-10 object-contain rounded"
              />
            ) : (
              "—"
            )}
          </TableCell>
          <TableCell>
            <div className="flex gap-4">
              <button onClick={() => onEdit(mc)}>✏️</button>
              <button onClick={() => onDelete(mc)}>🗑</button>
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
};
