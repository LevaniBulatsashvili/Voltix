import placeholderImg from "@/assets/images/Electronics.png";
import AppLink from "@/components/button/AppLink";

interface IProductsMainCategoryCard {
  title: string;
  to: string;
  image?: string;
  imgClassName?: string;
}

const ProductsMainCategoryCard = ({
  title,
  to,
  image = placeholderImg,
  imgClassName,
}: IProductsMainCategoryCard) => {
  return (
    <AppLink to={to}>
      <div className="relative bg-gray-100 p-6 rounded-2xl overflow-hidden h-72.5 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-3xl sm:text-4xl font-medium text-black">{title}</h2>

        <img
          src={image}
          alt={title}
          className={`absolute -bottom-8 right-0 sm:-right-8 w-full h-full object-contain ${imgClassName}`}
        />
      </div>
    </AppLink>
  );
};

export default ProductsMainCategoryCard;
