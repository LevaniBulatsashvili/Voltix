import AppLink from "../../../components/button/AppLink";
import { PAGE } from "../../../pages/pageConfig";
import StatCard from "./StatCard";

interface IStat {
  value: string;
  label: string;
}

interface IProductsHeader {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
  stats: IStat[];
}

const ProductsHeader = ({
  title,
  description,
  buttonText,
  image,
  imageAlt,
  stats,
}: IProductsHeader) => {
  return (
    <div className="p-24.5 grid grid-cols-2 gap-16">
      <div className="flex flex-col justify-between h-full">
        <div className="grid gap-8">
          <h1 className="text-6xl font-extrabold capitalize">{title}</h1>
          <p className="text-xl text-gray-700 capitalize">{description}</p>
        </div>

        <div className="mt-10 mb-14">
          <AppLink
            className="bg-black px-16 py-4 rounded-full text-white font-semibold"
            to={PAGE.PRODUCTS}
          >
            {buttonText}
          </AppLink>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      <div className="relative grid grid-cols-3 gap-16">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
};

export default ProductsHeader;
