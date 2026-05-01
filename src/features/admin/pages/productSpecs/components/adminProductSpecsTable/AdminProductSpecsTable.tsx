import TableCell from "@/components/ui/table/TableCell";
import { TableRow } from "@/components/ui/table/TableRow";
import type { IProductSpec } from "@/types/public/product";
import { useTranslation } from "react-i18next";
import AdminTable from "@/features/admin/components/AdminTable";

interface IAdminProductSpecsTable {
  specs: (IProductSpec & { product?: { name: string } })[];
  isLoading: boolean;
  onEdit: (s: IProductSpec) => void;
  onDelete: (s: IProductSpec) => void;
}

const AdminProductSpecsTable = ({
  specs,
  isLoading,
  onEdit,
  onDelete,
}: IAdminProductSpecsTable) => {
  const { t } = useTranslation();

  return (
    <AdminTable
      data={specs}
      isLoading={isLoading}
      columns={[
        { label: t("admin_management.form.product"), className: "w-1/3" },
        { label: t("admin_management.form.product_spec"), className: "w-1/4" },
        { label: t("admin_management.form.spec_value"), className: "w-1/4" },
      ]}
      renderRow={(spec) => (
        <TableRow key={spec.id}>
          <TableCell>{spec.id}</TableCell>
          <TableCell>{spec.product?.name ?? spec.product_id}</TableCell>
          <TableCell>{spec.spec}</TableCell>
          <TableCell>{spec.value}</TableCell>
          <TableCell>
            <div className="flex gap-4">
              <button onClick={() => onEdit(spec)}>✏️</button>
              <button onClick={() => onDelete(spec)}>🗑</button>
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default AdminProductSpecsTable;
