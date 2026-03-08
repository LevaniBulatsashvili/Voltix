import electronicsImg from "../../../assets/images/Electronics.png";
import Carousel from "../../../components/carousel/Carousel";
import appleLogo from "../../../assets/logos/apple.svg";
import samsungLogo from "../../../assets/logos/samsung.svg";
import sonyLogo from "../../../assets/logos/sony.svg";
import dellLogo from "../../../assets/logos/dell.svg";
import hpLogo from "../../../assets/logos/hp.svg";
import lenovoLogo from "../../../assets/logos/lenovo.svg";
import { useTranslation } from "react-i18next";
import ProductsHeader from "./ProductsHeader";
import NewProducts from "./NewProducts";
import { dummyProducts } from "../utils/dummyProducts";

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
        carouselClassName="my-10 border-4 border-background bg-white"
      />
      <NewProducts products={dummyProducts.slice(0, 4)} />
    </div>
  );
};

export default Products;
