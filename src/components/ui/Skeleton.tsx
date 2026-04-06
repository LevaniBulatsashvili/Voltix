interface ISkeleton {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton = ({ className = "", style }: ISkeleton) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-md
        bg-gray-200
        ${className}
      `}
      style={style}
    >
      <div
        className="
          absolute inset-0
          -translate-x-full
          animate-shimmer
          bg-linear-to-r
          from-transparent
          via-white/60
          to-transparent
        "
      />
    </div>
  );
};
