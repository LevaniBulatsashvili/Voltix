const TableContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between border border-primary/60 rounded-xl overflow-hidden min-h-167">
      {children}
    </div>
  );
};

export default TableContainer;
