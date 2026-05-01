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
  image = "/images/placeholders/product.webp",
  imgClassName,
}: IProductsMainCategoryCard) => {
  return (
    <AppLink to={to}>
      <div className="relative bg-gray-100 p-6 rounded-2xl overflow-hidden h-72.5 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black">
          {title}
        </h2>

        <img
          src={image}
          alt={title}
          className={`absolute bottom-2.5 right-2.5 w-3/4 h-4/5 object-contain ${imgClassName}`}
        />
      </div>
    </AppLink>
  );
};

export default ProductsMainCategoryCard;
