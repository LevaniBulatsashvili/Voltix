import Carousel from "@/components/carousel/Carousel";
import { useTranslation } from "react-i18next";
import ProductsHeader from "./productsHeader";
import ProductShowcase from "./productsShowcase";
import ProductsMainCategories from "./productsMainCategories";
import ProductShowcaseSkeleton from "./productsSkeleton/ProductShowcaseSkeleton";
import { useFetchBrands } from "../../search/hooks/brandCRUD";
import ProductsCarouselSkeleton from "./productsSkeleton/ProductsCarouselSkeleton";
import ProductsComments from "./productsComments";
import { useFetchProducts } from "../../product/hooks/productCRUD";
import { QueryBoundary } from "@/components/feedback/QueryBoundary";
import { buildCategoryLink } from "../utils/buildCategoryLink";
import { PRODUCTSELECTFIELD } from "@/utils/consts";

const Products = () => {
  const { t } = useTranslation();
  const stats = [
    {
      value: "200+",
      label: t("products.international_brands"),
    },
    {
      value: "2,000+",
      label: t("products.high_quality_products"),
    },
    {
      value: "30,000+",
      label: t("products.happy_customers"),
    },
  ];

  const newestProductQuery = useFetchProducts({
    limit: 4,
    sort: [{ field: "created_at", ascending: false }],
    selectField: PRODUCTSELECTFIELD,
  });
  const topSellingProductsDataQuery = useFetchProducts({
    limit: 4,
    sort: [{ field: "total_sold", ascending: false }],
    selectField: PRODUCTSELECTFIELD,
  });
  const brandsQuery = useFetchBrands({
    selectField: "id, name, logo_url",
  });

  return (
    <div className="grid">
      <ProductsHeader
        title={t("products.header")}
        description={t("products.description")}
        buttonText={t("products.shop_btn")}
        stats={stats}
      />

      <QueryBoundary
        query={brandsQuery}
        loadingFallback={<ProductsCarouselSkeleton />}
        defaultFallbackOptions={{
          className: "h-50 my-11 border-y-4 rounded-none",
        }}
      >
        {(brands) => (
          <Carousel
            items={brands.map(({ id, name, logo_url }) => (
              <img key={id} src={logo_url} alt={name} />
            ))}
            carouselClassName="my-4 xl:my-10 border-y-4 border-primary bg-white"
            itemClassName="size-[4em] sm:size-[4.5em] lg:size-[5em] text-[2.5rem] sm:text-[3rem]"
          />
        )}
      </QueryBoundary>

      <QueryBoundary
        query={newestProductQuery}
        loadingFallback={<ProductShowcaseSkeleton />}
        defaultFallbackOptions={{
          className: "w-[90%]! my-15 h-160",
        }}
      >
        {(newestProducts) => (
          <ProductShowcase
            title="products.new_arrivals"
            products={newestProducts}
            viewAllLink={buildCategoryLink("new-arrivals")}
          />
        )}
      </QueryBoundary>

      <hr className="w-[90%] mx-auto opacity-20" />

      <QueryBoundary
        query={topSellingProductsDataQuery}
        loadingFallback={<ProductShowcaseSkeleton />}
        defaultFallbackOptions={{
          className: "w-[90%]! my-15 h-160",
        }}
      >
        {(topSellingProducts) => (
          <ProductShowcase
            title="products.top_selling"
            products={topSellingProducts}
            viewAllLink={buildCategoryLink("top-selling")}
          />
        )}
      </QueryBoundary>

      <ProductsMainCategories />

      <ProductsComments />
    </div>
  );
};

export default Products;
