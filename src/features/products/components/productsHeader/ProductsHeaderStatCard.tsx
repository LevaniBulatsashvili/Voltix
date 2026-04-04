interface IProductHeaderStatCard {
  value: string;
  label: string;
  statClass?: string;
}

const ProductHeaderStatCard = ({
  value,
  label,
  statClass = "",
}: IProductHeaderStatCard) => {
  return (
    <div className={`capitalize text-center sm:text-start ${statClass}`}>
      <span className="text-4xl sm:text-5xl font-semibold">{value}</span>
      <br />
      {label}
    </div>
  );
};

export default ProductHeaderStatCard;
