import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";

interface IDataTableProps<T> {
  data: T[];
  isLoading: boolean;
  colSpan: number;
  renderRow: (item: T) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function DataTable<T>({
  data,
  isLoading,
  colSpan,
  renderRow,
  loadingComponent,
  emptyComponent,
}: IDataTableProps<T>) {
  if (isLoading) return loadingComponent ?? <TableLoading colSpan={colSpan} />;
  if (!data.length) return emptyComponent ?? <TableEmpty colSpan={colSpan} />;

  return <>{data.map(renderRow)}</>;
}
