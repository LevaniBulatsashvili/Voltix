interface IProductHeaderStatCard {
  value: string;
  label: string;
  statClass?: string;
}

const ProductHeaderStatCard = ({
  value,
  label,
  statClass = "",
}: IProductHeaderStatCard) => (
  <div className={`flex flex-col ${statClass}`}>
    <span className="text-4xl sm:text-5xl font-semibold">{value}</span>
    <span className="text-start">{label}</span>
  </div>
);

export default ProductHeaderStatCard;
