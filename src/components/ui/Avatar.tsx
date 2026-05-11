import { cn } from "@/utils/cn";

interface IAvatar {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const Avatar = ({
  src,
  alt = "avatar",
  className,
  width = 32,
  height = 32,
}: IAvatar) => {
  return (
    <img
      src={src || "/images/user.webp"}
      alt={alt}
      width={width}
      height={height}
      className={cn("w-full h-full object-cover rounded-full", className)}
    />
  );
};

export default Avatar;
