const TableLoading = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-12 opacity-80 text-lg">
        Loading...
      </td>
    </tr>
  );
};

export default TableLoading;
