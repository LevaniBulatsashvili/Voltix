import { cn } from "@/utils/cn";

interface IProductHeaderStatCard {
  value: string;
  label: string;
  statClass?: string;
}

const ProductHeaderStatCard = ({
  value,
  label,
  statClass,
}: IProductHeaderStatCard) => (
  <div className={cn("flex flex-col items-center xl:items-center", statClass)}>
    <div className="flex flex-col items-start w-fit">
      <span className="text-4xl sm:text-5xl font-semibold tracking-tight">
        {value}
      </span>
      <span>{label}</span>
    </div>
  </div>
);

export default ProductHeaderStatCard;
