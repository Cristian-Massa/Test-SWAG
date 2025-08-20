import { Product } from "../types/Product";

export function getProductsQuantity(
  products: Product[],
  value: string = "all",
  filterBy: "cat" | "supplier" = "cat"
) {
  if (filterBy === "supplier" && value !== "all") {
    return products.filter((product) =>
      product.supplier.toLowerCase().includes(value.toLowerCase())
    ).length;
  } else if (filterBy === "cat" && value !== "all") {
    return products.filter((product) => product.category === value).length;
  } else {
    return products.length;
  }
}
