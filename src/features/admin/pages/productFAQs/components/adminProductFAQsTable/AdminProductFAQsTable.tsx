import TableCell from "@/components/ui/table/TableCell";
import { TableRow } from "@/components/ui/table/TableRow";
import type { IProductFAQ } from "@/types/public/product";
import { useTranslation } from "react-i18next";
import AdminTable from "@/features/admin/components/AdminTable";

interface IAdminProductFAQsTable {
  faqs: (IProductFAQ & { product?: { name: string } })[];
  isLoading: boolean;
  onEdit: (f: IProductFAQ) => void;
  onDelete: (f: IProductFAQ) => void;
}

const AdminProductFAQsTable = ({
  faqs,
  isLoading,
  onEdit,
  onDelete,
}: IAdminProductFAQsTable) => {
  const { t } = useTranslation();

  return (
    <AdminTable
      data={faqs}
      isLoading={isLoading}
      columns={[
        { label: t("admin_management.form.product"), className: "w-1/4" },
        { label: t("admin_management.form.question"), className: "w-1/3" },
        { label: t("admin_management.form.answer"), className: "w-1/3" },
      ]}
      renderRow={(faq) => (
        <TableRow key={faq.id}>
          <TableCell>-</TableCell>
          <TableCell>{faq.product?.name ?? faq.product_id}</TableCell>
          <TableCell className="truncate max-w-xs">{faq.question}</TableCell>
          <TableCell className="truncate max-w-xs">
            {faq.answer ?? (
              <span className="opacity-40 italic">
                {t("admin_management.product_faqs.no_answer")}
              </span>
            )}
          </TableCell>
          <TableCell>
            <div className="flex gap-4">
              <button onClick={() => onEdit(faq)}>✏️</button>
              <button onClick={() => onDelete(faq)}>🗑</button>
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default AdminProductFAQsTable;
