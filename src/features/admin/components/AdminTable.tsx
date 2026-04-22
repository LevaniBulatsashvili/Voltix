import { DataTable } from "@/components/ui/table/DataTable";
import Table from "@/components/ui/table/Table";
import TableBody from "@/components/ui/table/TableBody";
import TableCell from "@/components/ui/table/TableCell";
import TableHeader from "@/components/ui/table/TableHeader";
import { useTranslation } from "react-i18next";
import AdminTableSkeleton from "./AdminTableSkeleton";

interface IColumn {
  label: string;
  className?: string;
}

interface IAdminTable<T> {
  data: T[];
  isLoading: boolean;
  columns: IColumn[];
  colSpan?: number;
  renderRow: (item: T) => React.ReactNode;
}

const AdminTable = <T,>({
  data,
  isLoading,
  columns,
  colSpan,
  renderRow,
}: IAdminTable<T>) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableCell className="w-10">#</TableCell>
        {columns.map((col, idx) => (
          <TableCell key={idx} className={col.className}>
            {col.label}
          </TableCell>
        ))}
        <TableCell className="w-1/7">{t("common.manage")}</TableCell>
      </TableHeader>

      <TableBody>
        <DataTable
          data={data}
          isLoading={isLoading}
          colSpan={colSpan ?? columns.length + 2}
          loadingComponent={<AdminTableSkeleton />}
          renderRow={renderRow}
        />
      </TableBody>
    </Table>
  );
};

export default AdminTable;
