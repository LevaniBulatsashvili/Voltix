interface IAvatar {
  src: string;
  alt?: string;
  className?: string;
}

const Avatar = ({ src, alt = "avatar", className = "" }: IAvatar) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover rounded-full ${className}`}
    />
  );
};

export default Avatar;
