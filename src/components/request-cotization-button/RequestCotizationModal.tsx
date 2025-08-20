import { ChangeEvent, useState } from "react";
import { Product } from "../../types/Product";
import facturaTemplate from "../../template/pdf-report.html?raw";
import "./RequestCotizationModal.css";
import { PrintButton } from "../PrintButton";
import { getDiscount } from "../../libs/calculateDiscount";
import { calculatePrice } from "../../libs/calculatePrice";
import { useToast } from "../../context/ToastContext";

interface RequestCotizationModalProps {
  open: boolean;
  handleClose: () => void;
  product: Product;
  quantity: number;
}

export const RequestCotizationModal = ({
  open,
  handleClose,
  quantity,
  product,
}: RequestCotizationModalProps) => {
  // Form state editable
  const { addToast } = useToast();
  const [client, setClient] = useState({
    name: "",
    email: "",
    company: "",
  });
  const discountedPrice = calculatePrice(quantity, product);
  const discount = getDiscount(quantity, product);
  const unitPrice = discountedPrice / quantity;
  const cotizationData: Record<string, string> = {
    "{{ name }}": client.name,
    "{{ email }}": client.email,
    "{{ clientCompany }}": client.company,
    "{{ product }}": product.name,
    "{{ quantity }}": quantity.toString(),
    "{{ productDescription }}": product.description ?? "Sin descripción",
    "{{ price }}": unitPrice.toString(),
    "{{ discount }}": discount.toString(),
    "{{ totalPrice }}": discountedPrice.toString(),
  };

  const handleRequest = () => {
    addToast(`Se envio la cotización solicitada`, "success");
    handleClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setClient((prev) => ({ ...prev, [id]: value }));
  };

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Cotización</h2>

        <label>Nombre del Cliente</label>
        <div className=" search-box">
          <input
            placeholder="Jorge Pérez"
            className="search-input pl1"
            type="text"
            id={"name"}
            value={client.name}
            onChange={handleChange}
          />
        </div>
        <label>Email del Cliente</label>
        <div className=" search-box">
          <input
            placeholder="jorge.perez@example.com"
            className="search-input pl1"
            id="email"
            type="email"
            value={client.email}
            onChange={handleChange}
          />
        </div>
        <label>Empresa del cliente</label>
        <div className="search-box">
          <input
            placeholder="Empresa XYZ"
            className="search-input pl1"
            id="company"
            value={client.company}
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleRequest}>
            Enviar por correo
          </button>
          <PrintButton
            template={facturaTemplate}
            paramsToChange={cotizationData}
            label="Generar PDF"
          />
        </div>
      </div>
    </div>
  );
};
