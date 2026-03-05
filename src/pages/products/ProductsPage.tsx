import AppLink from "../../components/button/AppLink";
import electronicsImg from "../../assets/images/Electronics.png";
import { PAGE } from "../pageConfig";
import Carousel from "../../components/carousel/Carousel";
import appleLogo from "../../assets/logos/apple.svg";
import samsungLogo from "../../assets/logos/samsung.svg";
import sonyLogo from "../../assets/logos/sony.svg";
import dellLogo from "../../assets/logos/dell.svg";
import hpLogo from "../../assets/logos/hp.svg";
import lenovoLogo from "../../assets/logos/lenovo.svg";

const logos = [
  { src: appleLogo, alt: "Apple" },
  { src: samsungLogo, alt: "Samsung" },
  { src: sonyLogo, alt: "Sony" },
  { src: dellLogo, alt: "Dell" },
  { src: hpLogo, alt: "HP" },
  { src: lenovoLogo, alt: "Lenovo" },
];

const ProductsPage = () => {
  return (
    <div className="grid">
      <div className="p-24.5 grid grid-cols-2 gap-16">
        <div className="flex flex-col justify-between h-full">
          <div className="grid gap-8">
            <h1 className="text-6xl font-extrabold">
              Discover Innovative Tech That Fits Your Lifestyle and Boosts
              Productivity
            </h1>
            <p className="text-xl text-gray-700">
              Explore the latest electronics, gadgets, and smart devices at
              Voltix. From high-performance laptops to smart home essentials,
              find everything you need to stay connected and inspired.
            </p>
          </div>

          <div className="mt-10 mb-14">
            <AppLink
              className="bg-black px-16 py-4 rounded-full text-white font-semibold"
              to={PAGE.PRODUCTS}
            >
              Shop Now
            </AppLink>
          </div>

          <div className="relative grid grid-cols-3 gap-16">
            <div>
              <span className="text-5xl font-semibold">200+</span>
              <br />
              International Brands
            </div>

            <div>
              <span className="text-5xl font-semibold">2,000+</span>
              <br /> High-Quality Products
            </div>

            <div>
              <span className="text-5xl font-semibold">30,000+</span>
              <br /> Happy Customers
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={electronicsImg}
            alt="Electronics"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>
      <Carousel
        items={logos.map((logo, idx) => (
          <img key={idx} src={logo.src} alt={logo.alt} />
        ))}
        itemClassName="size-[4em]"
        carouselClassName="my-10 border-4 border-background bg-white"
      />
    </div>
  );
};

export default ProductsPage;
