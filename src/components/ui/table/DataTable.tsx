import { useAppSelector } from "@/hooks/redux";
import TableEmpty from "./TableEmpty";
import { useFlicker } from "@/hooks/useFlicker";
import Spinner from "@/components/feedback/Spinner";

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
  const {
    permaNoDataState,
    permaLoadingState,
    flickerNoDataState,
    flickerLoadingState,
  } = useAppSelector((state) => state.settings);

  const flicker = useFlicker({
    flickerLoading: flickerLoadingState,
    flickerEmpty: flickerNoDataState,
  });

  if (isLoading || permaLoadingState || flicker === "loading")
    return loadingComponent ?? <Spinner />;
  if (!data.length || permaNoDataState || flicker === "empty")
    return emptyComponent ?? <TableEmpty colSpan={colSpan} />;

  return <>{data.map(renderRow)}</>;
}
