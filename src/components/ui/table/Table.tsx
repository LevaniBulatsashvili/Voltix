import { type ReactNode } from "react";

interface ITableProps {
  children: ReactNode;
}

const Table = ({ children }: ITableProps) => {
  return <table className="w-full text-sm table-fixed">{children}</table>;
};

export default Table;
