import { useCart } from "../context/CartContext";

import { CartItem } from "./display-cart/CartItem";
import "./DisplayCart.css";

import { useState } from "react";

export const DisplayCart = () => {
  const [show, setShow] = useState(false);
  const toggleCart = () => setShow(!show);
  const { cart } = useCart();
  return (
    <>
      <button className="nav-link l1" onClick={toggleCart}>
        <span className="material-icons">shopping_cart</span>
        Carrito ({cart.length})
      </button>
      <div
        onClick={toggleCart}
        className={`cart-bg ${show ? "" : "hidden"}`}
      ></div>
      <div className={`cart ${show ? "" : "closed"}`}>
        <h3>Carrito</h3>
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
        {cart.length === 0 && (
          <p className="empty-cart">El carrito está vacío</p>
        )}
      </div>
    </>
  );
};
