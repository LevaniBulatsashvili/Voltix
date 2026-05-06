import { shallowEqual } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import { useFlicker } from "@/hooks/useFlicker";
import Spinner from "@/components/feedback/Spinner";
import TableEmpty from "./TableEmpty";
import type { ReactNode } from "react";
import type { RootState } from "@/store";

interface IDataTableProps<T> {
  data: T[];
  isLoading: boolean;
  colSpan: number;
  renderRow: (item: T) => ReactNode;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
}

const selectTableSettings = (state: RootState) => ({
  permaNoDataState: state.settings.permaNoDataState,
  permaLoadingState: state.settings.permaLoadingState,
  flickerNoDataState: state.settings.flickerNoDataState,
  flickerLoadingState: state.settings.flickerLoadingState,
});

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
  } = useAppSelector(selectTableSettings, shallowEqual);

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
