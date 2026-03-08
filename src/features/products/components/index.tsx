import electronicsImg from "../../../assets/images/Electronics.png";
import Carousel from "../../../components/carousel/Carousel";
import appleLogo from "../../../assets/logos/apple.svg";
import samsungLogo from "../../../assets/logos/samsung.svg";
import sonyLogo from "../../../assets/logos/sony.svg";
import dellLogo from "../../../assets/logos/dell.svg";
import hpLogo from "../../../assets/logos/hp.svg";
import lenovoLogo from "../../../assets/logos/lenovo.svg";
import { useTranslation } from "react-i18next";
import ProductsHeader from "./layouts/ProductsHeader";
import { dummyProducts } from "../utils/dummyProducts";
import ProductShowcase from "./ProductShowcase";
import { PAGE } from "../../../pages/pageConfig";
import ProductCategories from "./ProductCategories";
import Customers from "./customers";
import { dummyCustomers } from "../utils/dummyCustomers";

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
      label: t("products-international brands"),
    },
    {
      value: "2,000+",
      label: t("products-high quality products"),
    },
    {
      value: "30,000+",
      label: t("products-happy customers"),
    },
  ];

  return (
    <div className="grid">
      <ProductsHeader
        title={t("products-header")}
        description={t("products-description")}
        buttonText={t("products-shopBtn")}
        image={electronicsImg}
        imageAlt={t("products-electronics")}
        stats={stats}
      />
      <Carousel
        items={logos.map((logo, idx) => (
          <img key={idx} src={logo.src} alt={logo.alt} />
        ))}
        itemClassName="size-[4em]"
        carouselClassName="my-10 border-y-4 border-background bg-white"
      />
      <ProductShowcase
        title={t("products-new arrivals")}
        products={dummyProducts.slice(0, 4)}
        viewAllLink={PAGE.PRODUCTS}
      />
      <hr className="w-[90%] mx-auto opacity-20" />
      <ProductShowcase
        title={t("products-top selling")}
        products={dummyProducts.slice(4, 8)}
        viewAllLink={PAGE.PRODUCTS}
      />
      <ProductCategories />
      <Customers
        title={t("products-our happy customers")}
        customers={dummyCustomers}
      />
    </div>
  );
};

export default Products;
