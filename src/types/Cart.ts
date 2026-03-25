import { type IProduct } from "./Product";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
