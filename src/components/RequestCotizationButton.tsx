import { useState } from "react";
import { Product } from "../types/Product";
import { RequestCotizationModal } from "./request-cotization-button/RequestCotizationModal";

interface RequestCotizationButtonProps {
  product: Product;
  quantity: number;
}

export const RequestCotizationButton = ({
  product,
  quantity,
}: RequestCotizationButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-secondary cta1"
        onClick={() => setShowModal(true)}
      >
        <span className="material-icons">email</span>
        Solicitar cotización oficial
      </button>
      <RequestCotizationModal
        open={showModal}
        product={product}
        quantity={quantity}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};
