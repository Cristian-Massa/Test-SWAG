import { useCart } from "../../context/CartContext";
import { CartItem as ICartItem } from "../../interfaces/cart";

interface CartItemProps {
  item: ICartItem;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  return (
    <div className="cart-item">
      <div>
        <img
          src={item.image}
          alt={"item-image" + item.id}
          className="item-image"
        />
        <div>
          <span className="item-name">{item.name}</span>
          <div className="item-quantity-container">
            <button
              onClick={() => decrementQuantity(item.id)}
              className="btn btn-secondary"
            >
              -
            </button>
            <div className="item-quantity">
              <p>{item.quantity}</p>
            </div>
            <button
              onClick={() => incrementQuantity(item.id)}
              className="btn btn-secondary"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.id)}>quitar</button>
    </div>
  );
};
