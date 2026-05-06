import { cn } from "@/utils/cn";

interface IAvatar {
  src?: string;
  alt?: string;
  className?: string;
}

const Avatar = ({ src, alt = "avatar", className }: IAvatar) => {
  return (
    <img
      src={src || "/images/user.webp"}
      alt={alt}
      className={cn("w-full h-full object-cover rounded-full", className)}
    />
  );
};

export default Avatar;
