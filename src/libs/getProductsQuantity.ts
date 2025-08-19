import { Product } from "../types/Product";

export function getProductsQuantity(products: Product[], cat: string) {
  return cat === "all"
    ? products.length
    : products.filter((product) => product.category === cat).length;
}
