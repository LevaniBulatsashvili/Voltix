interface IProductsDisplayProducts {
  items: { src: string; alt: string }[];
  setRef: (el: HTMLDivElement | null, i: number) => void;
}

const ProductsDisplayProducts = ({
  items,
  setRef,
}: IProductsDisplayProducts) => (
  <div className="absolute inset-0">
    {items.map(({ src, alt }, i) => (
      <div
        key={src}
        ref={(el) => setRef(el, i)}
        className="absolute inset-0 w-full max-h-[60%] my-auto"
      >
        <img
          src={src}
          alt={alt}
          loading={i === 0 ? "eager" : "lazy"}
          className="electronic absolute inset-0 size-full object-contain opacity-0 will-change-[clip-path,opacity]"
        />
      </div>
    ))}
  </div>
);

export default ProductsDisplayProducts;
