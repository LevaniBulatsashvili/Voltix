const TableEmpty = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-12 opacity-80 text-lg">
        No data found
      </td>
    </tr>
  );
};

export default TableEmpty;
