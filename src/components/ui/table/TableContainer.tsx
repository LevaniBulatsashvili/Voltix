const TableContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-primary/60 scrollbar-thumb-gray-400 scrollbar-track-transparent">
      <div className="flex flex-col justify-between min-w-180 min-h-167">
        {children}
      </div>
    </div>
  );
};

export default TableContainer;
