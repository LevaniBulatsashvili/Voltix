import electronicsImg from "../../../assets/images/Electronics.png";
import Carousel from "../../../components/carousel/Carousel";
import appleLogo from "../../../assets/logos/apple.svg";
import samsungLogo from "../../../assets/logos/samsung.svg";
import sonyLogo from "../../../assets/logos/sony.svg";
import dellLogo from "../../../assets/logos/dell.svg";
import hpLogo from "../../../assets/logos/hp.svg";
import lenovoLogo from "../../../assets/logos/lenovo.svg";
import { useTranslation } from "react-i18next";
import ProductsHeader from "./productsHeader";
import ProductShowcase from "./productsShowcase";
import { PAGE } from "../../../pages/pageConfig";
import ProductCategories from "./productsCategories";
import AsyncBoundary from "../../../components/feedback/AsyncBoundary";
import useFetchNewestProducts from "../../../hooks/useFetchNewestProducts";
import useFetchTopSellingProducts from "../../../hooks/useFetchTopSellingProducts";
import ProductShowcaseSkeleton from "./productsSkeleton/ProductShowcaseSkeleton";
import ProductComments from "./ProductComments";

const logos = [
  { src: appleLogo, alt: "Apple" },
  { src: samsungLogo, alt: "Samsung" },
  { src: sonyLogo, alt: "Sony" },
  { src: dellLogo, alt: "Dell" },
  { src: hpLogo, alt: "HP" },
  { src: lenovoLogo, alt: "Lenovo" },
];

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
  } = useFetchNewestProducts(4);
  const {
    data: topSellingProductsData,
    isLoading: topSellingProductsLoading,
    error: topSellingProductsError,
  } = useFetchTopSellingProducts(4);

  return (
    <div className="grid">
      <ProductsHeader
        title="products.header"
        description="products.description"
        buttonText="products.shop_btn"
        image={electronicsImg}
        imageAlt="products.electronics"
        stats={stats}
      />

      <Carousel
        items={logos.map((logo, idx) => (
          <img key={idx} src={logo.src} alt={logo.alt} />
        ))}
        carouselClassName="my-4 xl:my-10 border-y-4 border-primary bg-white"
        itemClassName="size-[4em] sm:size-[4.5em] lg:size-[5em] text-[2.5rem] sm:text-[3rem]"
      />

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

      <ProductCategories />

      <ProductComments />
    </div>
  );
};

export default Products;
