import TableCell from "@/components/ui/table/TableCell";
import { TableRow } from "@/components/ui/table/TableRow";
import AdminTable from "@/features/admin/components/AdminTable";
import type { IBrand } from "@/types/public/product";
import { useTranslation } from "react-i18next";

interface IBrandsTable {
  brands: IBrand[];
  isLoading: boolean;
  onEdit: (b: IBrand) => void;
  onDelete: (b: IBrand) => void;
}

export const BrandsTable = ({
  brands,
  isLoading,
  onEdit,
  onDelete,
}: IBrandsTable) => {
  const { t } = useTranslation();

  return (
    <AdminTable
      data={brands}
      isLoading={isLoading}
      columns={[
        { label: t("admin_management.form.name"), className: "w-1/3" },
        { label: t("admin_management.form.logo"), className: "w-1/3" },
        { label: t("admin_management.form.website_url"), className: "w-1/3" },
      ]}
      renderRow={(brand) => (
        <TableRow key={brand.id}>
          <TableCell>{brand.id}</TableCell>
          <TableCell className="font-medium">{brand.name}</TableCell>
          <TableCell>
            {brand.logo_url ? (
              <img
                src={brand.logo_url}
                alt={brand.name}
                className="h-10 w-10 object-contain rounded"
              />
            ) : (
              "—"
            )}
          </TableCell>
          <TableCell>
            {brand.website_url ? (
              <a
                href={brand.website_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm"
              >
                {brand.website_url}
              </a>
            ) : (
              "—"
            )}
          </TableCell>
          <TableCell>
            <div className="flex gap-4">
              <button onClick={() => onEdit(brand)}>✏️</button>
              <button onClick={() => onDelete(brand)}>🗑</button>
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
};
