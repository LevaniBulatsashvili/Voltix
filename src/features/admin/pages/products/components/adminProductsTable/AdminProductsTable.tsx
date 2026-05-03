import TableCell from "@/components/ui/table/TableCell";
import { TableRow } from "@/components/ui/table/TableRow";
import { usePrice } from "@/features/user/cart/hooks/usePrice";
import type { IProduct } from "@/types/public/product";
import { useTranslation } from "react-i18next";
import AdminTable from "@/features/admin/components/AdminTable";

interface IAdminProductsTable {
  products: IProduct[];
  isLoading: boolean;
  onEdit: (p: IProduct) => void;
  onDelete: (p: IProduct) => void;
}

const AdminProductsTable = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}: IAdminProductsTable) => {
  const { t } = useTranslation();
  const { format } = usePrice();

  return (
    <AdminTable
      data={products}
      isLoading={isLoading}
      columns={[
        { label: t("product.product"), className: "w-1/3" },
        { label: t("product.price"), className: "w-1/7" },
        { label: t("product.stock"), className: "w-1/7" },
        { label: t("product.rating"), className: "w-1/7" },
        { label: t("product.sold"), className: "w-1/7" },
      ]}
      renderRow={(product) => (
        <TableRow key={product.id}>
          <TableCell>{product.id}</TableCell>
          <TableCell>
            <p className="font-medium truncate">{product.name}</p>
            <p className="text-xs">{product.brand.name}</p>
          </TableCell>
          <TableCell>{format(product.price)}</TableCell>
          <TableCell className={product.stock === 0 ? "text-red-500" : ""}>
            {product.stock}
          </TableCell>
          <TableCell>{product.rating_avg?.toFixed(1) ?? "-"}</TableCell>
          <TableCell>{product.total_sold.toLocaleString()}</TableCell>
          <TableCell>
            <div className="flex gap-4">
              <button onClick={() => onEdit(product)}>✏️</button>
              <button onClick={() => onDelete(product)}>🗑</button>
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default AdminProductsTable;
