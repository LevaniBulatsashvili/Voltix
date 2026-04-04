import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../../../hooks/redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../../store/cart.slice";
import CartItemView from "./CartItemView";
import type { ICartItem } from "../../../../../../../types/common/cart";

interface ICartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: ICartItemProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  return (
    <CartItemView
      t={t}
      product={product}
      quantity={quantity}
      onRemove={() => dispatch(removeFromCart(product.id))}
      onIncrease={() => dispatch(increaseQuantity(product.id))}
      onDecrease={() => dispatch(decreaseQuantity(product.id))}
    />
  );
};

export default CartItem;
