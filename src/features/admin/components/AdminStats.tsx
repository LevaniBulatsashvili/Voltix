export interface IStatItem {
  label: string;
  value: string | number | undefined;
}

interface IAdminStats {
  stats: IStatItem[];
}

const AdminStats = ({ stats }: IAdminStats) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-primary text-background rounded-lg p-4"
        >
          <p className="text-xs mb-1">{stat.label}</p>
          <p className="text-2xl font-medium">{stat.value ?? "—"}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
