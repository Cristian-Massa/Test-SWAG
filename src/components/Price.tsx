interface PriceProps {
  value: number;
}

export const Price = ({ value }: PriceProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return <p className="price p1-medium">{formatPrice(value)}</p>;
};
