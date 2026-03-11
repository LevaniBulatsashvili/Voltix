interface IStatCard {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: IStatCard) => {
  return (
    <div className="capitalize">
      <span className="text-5xl font-semibold">{value}</span>
      <br />
      {label}
    </div>
  );
};

export default StatCard;
