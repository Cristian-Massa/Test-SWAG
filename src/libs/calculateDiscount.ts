import { Product } from "../types/Product";
import { calculatePrice } from "./calculatePrice";

export const getDiscount = (qty: number, product: Product) => {
  if (!product.priceBreaks || product.priceBreaks.length === 0) {
    return 0;
  }

  const baseTotal = product.basePrice * qty;
  const discountedTotal = calculatePrice(qty, product);

  // Calculate savings percentage
  return ((baseTotal - discountedTotal) / baseTotal) * 100;
};
