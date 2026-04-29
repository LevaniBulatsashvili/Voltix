import type { IProduct } from "../public/product";

export interface ICartItem {
  product: IProduct;
  quantity: number;
  total: number;
}
