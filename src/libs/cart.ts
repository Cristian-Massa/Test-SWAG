// utils/cartStorage.ts

import { CartItem } from "../interfaces/cart";

const CART_KEY = "cart_products";

export function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
