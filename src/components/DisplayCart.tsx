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
        <p className="link-text">Carrito</p> ({cart.length})
      </button>
      <div
        onClick={toggleCart}
        className={`cart-bg ${show ? "" : "hidden"}`}
      ></div>
      <div className={`cart ${show ? "" : "closed"}`}>
        <button className="close-button" onClick={toggleCart}>
          <span> x</span>
        </button>
        <h3>Carrito</h3>
        <div className="products">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
          {cart.length === 0 && (
            <p className="empty-cart">El carrito está vacío</p>
          )}
        </div>
        <div className="cart-actions">
          <button className="btn btn-secondary cta1">
            <span className="material-icons">send</span>
            Pagar
          </button>
        </div>
      </div>
    </>
  );
};
