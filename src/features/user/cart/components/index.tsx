import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../hooks/redux";
import { useCartPricing } from "../hooks/useCartPricing";
import CartView from "./cartView/CartView";

const Cart = () => {
  const { t } = useTranslation();
  const { items } = useAppSelector((state) => state.cart);
  const pricing = useCartPricing();

  return <CartView t={t} items={items} pricing={pricing} />;
};

export default Cart;
