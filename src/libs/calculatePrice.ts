import { Product } from "../types/Product";

export const calculatePrice = (qty: number, product: Product) => {
  if (!product.priceBreaks || product.priceBreaks.length === 0) {
    return product.basePrice * qty;
  }

  // Find applicable price break
  let applicableBreak = product.priceBreaks[0];

  for (let i = 0; i < product.priceBreaks.length; i++) {
    if (qty >= product.priceBreaks[i].minQty) {
      applicableBreak = product.priceBreaks[i];
    }
  }

  return applicableBreak.price * qty;
};
