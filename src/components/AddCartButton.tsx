import { useCart } from "../context/CartContext";
import { Product } from "../types/Product";

interface CartButtonProps {
  canAddToCart: boolean;
  product: Product;
  quantity?: number;
}

export const AddCartButton = ({
  canAddToCart,
  product,
  quantity,
}: CartButtonProps) => {
  const { addToCart } = useCart();
  const onClick = () => {
    if (!canAddToCart) return;
    addToCart(product, quantity || 1);
  };
  return (
    <button
      className={`btn btn-primary cta1 ${!canAddToCart ? "disabled" : ""}`}
      disabled={!canAddToCart}
      onClick={onClick}
    >
      <span className="material-icons">shopping_cart</span>
      {canAddToCart ? "Agregar al carrito" : "No disponible"}
    </button>
  );
};
