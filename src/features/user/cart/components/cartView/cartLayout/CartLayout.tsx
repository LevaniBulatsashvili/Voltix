import type { ICartItem } from "@/types/common/cart";
import CartItem from "./cartItem/CartItem";
import CartOrderSummary from "./cartOrderSummary/CartOrderSummary";

interface ICartLayoutProps {
  items: ICartItem[];
  pricing: {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    total: number;
  };
}

const CartLayout = ({ items, pricing }: ICartLayoutProps) => {
  return (
    <div className="grid lg:grid-cols-[5fr_3fr] gap-5">
      <div className="border px-5 rounded-xl divide-y h-139 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <CartOrderSummary {...pricing} />
    </div>
  );
};

export default CartLayout;
