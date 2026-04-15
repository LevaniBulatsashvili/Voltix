import type { IProduct } from "../public/product";
import type { IProfile } from "./profile";

export interface IWishlist {
  id: string;
  profile_id: IProfile["id"];
  product_id: IProduct["id"];
  created_at: string;

  product: IProduct;
}
