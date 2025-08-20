import { Product } from "../types/Product";

export interface CartItem
  extends Pick<Product, "id" | "name" | "image" | "basePrice" | "stock"> {
  quantity?: number;
}
