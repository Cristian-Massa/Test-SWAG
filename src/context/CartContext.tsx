// context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "../interfaces/cart";
import { Product } from "../types/Product";
import { getCart, saveCart } from "../libs/cart";
import { clampQuantity } from "../libs/validations/clampQuantity";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const syncCart = (newCart: CartItem[]) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cart.find((p) => p.id === product.id);
    let updated: CartItem[];

    const clampedQty = clampQuantity(quantity, 1, product.stock);

    if (existing) {
      updated = cart.map((p) =>
        p.id === product.id
          ? {
              ...p,
              quantity: clampQuantity(
                (p.quantity || 1) + quantity,
                1,
                product.stock
              ),
            }
          : p
      );
    } else {
      updated = [...cart, { ...product, quantity: clampedQty }];
    }

    syncCart(updated);
  };
  const removeFromCart = (productId: number) => {
    const updated = cart.filter((p) => p.id !== productId);
    syncCart(updated);
  };

  const clearCart = () => {
    syncCart([]);
  };

  const incrementQuantity = (productId: number) => {
    const updated = cart.map((p) =>
      p.id === productId
        ? { ...p, quantity: clampQuantity((p.quantity || 1) + 1, 1, p.stock) }
        : p
    );
    syncCart(updated);
  };
  const decrementQuantity = (productId: number) => {
    const updated = cart
      .map((p) =>
        p.id === productId ? { ...p, quantity: (p.quantity || 1) - 1 } : p
      )
      .filter((p) => p.quantity && p.quantity > 0);
    syncCart(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
