interface IStatCard {
  value: string;
  label: string;
  statClass?: string;
}

const StatCard = ({ value, label, statClass = "" }: IStatCard) => {
  return (
    <div className={`capitalize text-center sm:text-start ${statClass}`}>
      <span className="text-4xl sm:text-5xl font-semibold">{value}</span>
      <br />
      {label}
    </div>
  );
};

export default StatCard;
