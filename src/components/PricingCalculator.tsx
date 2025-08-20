import { useState } from "react";
import { Product } from "../types/Product";
import "./PricingCalculator.css";
import { Price } from "./Price";
import { clampQuantity } from "../libs/validations/clampQuantity";
import { AddCartButton } from "./AddCartButton";
import { RequestCotizationButton } from "./RequestCotizationButton";
import { calculatePrice } from "../libs/calculatePrice";
import { getDiscount } from "../libs/calculateDiscount";

interface PricingCalculatorProps {
  product: Product;
}

const PricingCalculator = ({ product }: PricingCalculatorProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedBreak, setSelectedBreak] = useState<number>(0);

  const currentPrice = calculatePrice(quantity, product);
  const discountPercent = getDiscount(quantity, product);

  return (
    <div className="pricing-calculator">
      <div className="calculator-header">
        <h3 className="calculator-title p1-medium">Calculadora de Precios</h3>
        <p className="calculator-subtitle l1">
          Calcula el precio según la cantidad que necesitas
        </p>
      </div>

      <div className="calculator-content">
        {/* Quantity Input */}
        <div className="quantity-section">
          <label className="quantity-label p1-medium">Cantidad</label>
          <div className="quantity-input-group">
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setQuantity(clampQuantity(value, 1, product.stock));
              }}
              className="quantity-input p1"
              min="1"
              max="10000"
            />
            <span className="quantity-unit l1">unidades</span>
          </div>
        </div>

        {/* Price Breaks */}
        {product.priceBreaks && product.priceBreaks.length > 0 && (
          <div className="price-breaks-section">
            <h4 className="breaks-title p1-medium">Descuentos por volumen</h4>
            <div className="price-breaks">
              {product.priceBreaks.map((priceBreak, index) => {
                const isActive = quantity >= priceBreak.minQty;
                const isSelected = selectedBreak === index;

                return (
                  <div
                    key={index}
                    className={`price-break ${isActive ? "active" : ""} ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedBreak(index);
                      setQuantity(priceBreak.minQty);
                    }}
                  >
                    <div className="break-quantity l1">
                      {priceBreak.minQty}+ unidades
                    </div>
                    <div className="break-price p1-medium">
                      <Price value={priceBreak.price} />
                    </div>
                    {priceBreak.discount && (
                      <div className="break-discount l1">
                        -{priceBreak.discount}%
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="price-summary">
          <div className="summary-row">
            <span className="summary-label p1">Precio unitario:</span>
            <span className="summary-value p1-medium">
              <Price value={calculatePrice(quantity, product) / quantity} />{" "}
            </span>
          </div>

          <div className="summary-row">
            <span className="summary-label p1">Cantidad:</span>
            <span className="summary-value p1-medium">{quantity} unidades</span>
          </div>

          {discountPercent > 0 && (
            <div className="summary-row discount-row">
              <span className="summary-label p1">Descuento:</span>
              <span className="summary-value discount-value p1-medium">
                -{Math.round(discountPercent)}%
              </span>
            </div>
          )}

          <div className="summary-row total-row">
            <span className="summary-label p1-medium">Total:</span>
            <span className="summary-value total-value h2">
              <Price value={currentPrice} />
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="calculator-actions">
          <RequestCotizationButton product={product} quantity={quantity} />
          <AddCartButton
            product={product}
            canAddToCart={true}
            quantity={quantity}
          />
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <div className="info-item">
            <span className="material-icons">local_shipping</span>
            <div className="info-content">
              <span className="info-title l1">Envío gratis</span>
              <span className="info-detail l1">En pedidos sobre $50.000</span>
            </div>
          </div>

          <div className="info-item">
            <span className="material-icons">schedule</span>
            <div className="info-content">
              <span className="info-title l1">Tiempo de producción</span>
              <span className="info-detail l1">7-10 días hábiles</span>
            </div>
          </div>

          <div className="info-item">
            <span className="material-icons">verified</span>
            <div className="info-content">
              <span className="info-title l1">Garantía</span>
              <span className="info-detail l1">30 días de garantía</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
