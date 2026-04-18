import { DataTable } from "@/components/ui/table/DataTable";
import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/TableBody";
import TableCell from "@/components/ui/table/TableCell";
import TableHeader from "@/components/ui/table/TableHeader";
import { TableRow } from "@/components/ui/table/TableRow";
import { usePrice } from "@/features/user/cart/hooks/usePrice";
import type { IProduct } from "@/types/public/product";
import { useTranslation } from "react-i18next";
import AdminProductsTableSkeleton from "./AdminProductsTableSkeleton";

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
    <Table>
      <TableHeader>
        <TableCell className="w-10">#</TableCell>
        <TableCell className="w-1/3">{t("product.product")}</TableCell>
        <TableCell className="w-1/7">{t("product.price")}</TableCell>
        <TableCell className="w-1/7">{t("product.stock")}</TableCell>
        <TableCell className="w-1/7">{t("product.rating")}</TableCell>
        <TableCell className="w-1/7">{t("product.sold")}</TableCell>
        <TableCell className="w-1/7">{t("common.manage")}</TableCell>
      </TableHeader>

      <TableBody>
        <DataTable
          data={products}
          isLoading={isLoading}
          colSpan={8}
          loadingComponent={<AdminProductsTableSkeleton />}
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

              <TableCell>{product.rating_avg.toFixed(1)}</TableCell>

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
      </TableBody>
    </Table>
  );
};

export default AdminProductsTable;
