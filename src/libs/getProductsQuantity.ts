import { Product } from "../types/Product";

export function getProductsQuantity(products: Product[], cat: string) {
  let productQuantity = 0;
  products.forEach((product) => {
    if (product.category === cat || product.category === "all")
      productQuantity++;
  });

  return productQuantity;
}
