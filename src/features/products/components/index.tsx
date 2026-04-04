import electronicsImg from "../../../assets/images/Electronics.png";
import Carousel from "../../../components/carousel/Carousel";
import { useTranslation } from "react-i18next";
import ProductsHeader from "./productsHeader";
import ProductShowcase from "./productsShowcase";
import { PAGE } from "../../../pages/pageConfig";
import ProductsMainCategories from "./productsMainCategories";
import AsyncBoundary from "../../../components/feedback/AsyncBoundary";
import ProductShowcaseSkeleton from "./productsSkeleton/ProductShowcaseSkeleton";
import useFetchBrands from "../../category/hooks/useFetchBrands";
import ProductsCarouselSkeleton from "./productsSkeleton/ProductsCarouselSkeleton";
import ProductsComments from "./productsComments";
import useFetchProducts from "../hooks/useFetchProducts";

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

  const {
    data: newestProductsData,
    isLoading: newestProductsLoading,
    error: newestProductsError,
  } = useFetchProducts({ limit: 4, sortBy: "newest" });
  const {
    data: topSellingProductsData,
    isLoading: topSellingProductsLoading,
    error: topSellingProductsError,
  } = useFetchProducts({ limit: 4, sortBy: "topSelling" });
  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError,
  } = useFetchBrands();

  return (
    <div className="grid">
      <ProductsHeader
        title={t("products.header")}
        description={t("products.description")}
        buttonText={t("products.shop_btn")}
        image={electronicsImg}
        imageAlt={t("products.electronics")}
        stats={stats}
      />

      <AsyncBoundary
        data={brandsData}
        isLoading={brandsLoading}
        error={brandsError}
        loadingFallback={<ProductsCarouselSkeleton />}
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
      </AsyncBoundary>

      <AsyncBoundary
        data={newestProductsData}
        isLoading={newestProductsLoading}
        error={newestProductsError}
        loadingFallback={<ProductShowcaseSkeleton />}
        defaultFallbackOptions={{
          className: "my-15 h-120",
        }}
      >
        {(newestProducts) => (
          <ProductShowcase
            title="products.new_arrivals"
            products={newestProducts}
            viewAllLink={PAGE.PRODUCTS}
          />
        )}
      </AsyncBoundary>

      <hr className="w-[90%] mx-auto opacity-20" />

      <AsyncBoundary
        data={topSellingProductsData}
        isLoading={topSellingProductsLoading}
        error={topSellingProductsError}
        loadingFallback={<ProductShowcaseSkeleton />}
        defaultFallbackOptions={{
          className: "my-15 h-120",
        }}
      >
        {(topSellingProducts) => (
          <ProductShowcase
            title="products.top_selling"
            products={topSellingProducts}
            viewAllLink={PAGE.PRODUCTS}
          />
        )}
      </AsyncBoundary>

      <ProductsMainCategories />

      <ProductsComments />
    </div>
  );
};

export default Products;
