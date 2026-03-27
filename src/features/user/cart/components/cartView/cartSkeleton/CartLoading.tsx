import CartItemSkeleton from "./CartItemSkeleton";
import CartOrderSummarySkeleton from "./CartOrderSummarySkeleton";

const CartLoading = () => {
  return (
    <div className="grid lg:grid-cols-[5fr_3fr] gap-5">
      <div className="border px-5 rounded-xl divide-y">
        {Array.from({ length: 3 }).map((_, i) => (
          <CartItemSkeleton key={i} />
        ))}
      </div>
      <CartOrderSummarySkeleton />
    </div>
  );
};

export default CartLoading;
