import AppLink from "@/components/button/AppLink";
import { PAGE } from "@/pages/pageConfig";
import ProductsDisplayBanner from "../productsDisplayBanner/ProductsDisplayBanner";
import ProductHeaderStatCard from "./ProductsHeaderStatCard";
import { memo } from "react";

interface IStat {
  value: string;
  label: string;
}

interface IProductsHeader {
  title: string;
  description: string;
  buttonText: string;
  stats: IStat[];
}

const ProductsHeader = ({
  title,
  description,
  buttonText,
  stats,
}: IProductsHeader) => (
  <div className="p-8 sm:p-10 md:p-15 lg:px-24.5 grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-16">
    <div className="flex flex-col justify-between h-full">
      <div className="grid gap-8">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center xl:text-start font-extrabold capitalize leading-tight break-words">
          {title}
        </h1>
        <p className="mt-4 text-sm sm:text-lg lg:text-xl text-center xl:text-start opacity-80 mx-auto sm:w-full sm:mx-0">
          {description}
        </p>
      </div>

      <div className="mt-10 mb-14 self-center xl:self-auto">
        <AppLink
          className="text-background bg-primary hover:opacity-80 rounded-full font-semibold transition-all hover:scale-105
                       px-8 sm:px-12 md:px-16 py-3 sm:py-4 text-sm sm:text-base md:text-lg"
          to={PAGE.PUBLIC.SEARCH}
        >
          {buttonText}
        </AppLink>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-16">
        {stats.map((stat) => (
          <ProductHeaderStatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            statClass="last:col-span-2 last:text-center sm:last:col-span-1"
          />
        ))}
      </div>
    </div>

    <ProductsDisplayBanner />
  </div>
);

export default memo(ProductsHeader);
