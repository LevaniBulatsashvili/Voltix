interface IProductBtn {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ProductBtn = ({
  text,
  onClick,
  disabled = false,
  className = "",
}: IProductBtn) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-6 py-2 capitalize ${className}`}
    >
      {text}
    </button>
  );
};

export default ProductBtn;
