import { useTranslation } from "react-i18next";

interface IStatCard {
  value: string;
  label: string;
  statClass?: string;
}

const StatCard = ({ value, label, statClass = "" }: IStatCard) => {
  const { t } = useTranslation();

  return (
    <div className={`capitalize text-center sm:text-start ${statClass}`}>
      <span className="text-4xl sm:text-5xl font-semibold">{value}</span>
      <br />
      {t(label)}
    </div>
  );
};

export default StatCard;
