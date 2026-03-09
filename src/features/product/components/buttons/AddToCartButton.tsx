interface IAddToCartButton {
  onClick?: () => void;
}

const AddToCartButton = ({ onClick }: IAddToCartButton) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-6 py-2 text-background bg-primary flex-1"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
