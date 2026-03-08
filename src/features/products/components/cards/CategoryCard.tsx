import placeholderImg from "../../../../assets/images/Electronics.png";
import AppLink from "../../../../components/button/AppLink";

interface CategoryCardProps {
  title: string;
  to: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
}

const CategoryCard = ({
  title,
  to,
  image = placeholderImg,
  imageWidth = "w-1/2",
  imageHeight = "h-full",
}: CategoryCardProps) => {
  return (
    <AppLink to={to}>
      <div className="relative bg-gray-100 p-6 rounded-2xl overflow-hidden h-72.5 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-4xl font-medium text-black">{title}</h2>

        <img
          src={image}
          alt={title}
          className={`absolute bottom-0 right-0 ${imageWidth} ${imageHeight} object-contain`}
        />
      </div>
    </AppLink>
  );
};

export default CategoryCard;
