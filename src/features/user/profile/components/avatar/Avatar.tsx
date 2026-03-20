interface IAvatar {
  src?: string;
  size?: number;
}

const Avatar = ({ src, size = 50 }: IAvatar) => {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt="User Avatar"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar;
