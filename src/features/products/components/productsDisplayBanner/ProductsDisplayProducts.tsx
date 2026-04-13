interface IProductsDisplayProducts {
  items: { src: string; alt: string }[];
  refs: React.RefObject<(HTMLDivElement | null)[]>;
}

const ProductsDisplayProducts = ({ items, refs }: IProductsDisplayProducts) => (
  <div className="absolute inset-0">
    {items.map(({ src, alt }, i) => (
      <div
        key={src}
        ref={(el) => {
          refs.current[i] = el;
        }}
        className="absolute inset-0 w-full max-h-[60%] my-auto"
      >
        <img
          src={src}
          alt={alt}
          className="electronic absolute inset-0 size-full object-contain opacity-0 will-change-[clip-path,opacity]"
        />
      </div>
    ))}
  </div>
);

export default ProductsDisplayProducts;
