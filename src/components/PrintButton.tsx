import { usePrint } from "../hooks/usePrint";
interface PrintButton {
  paramsToChange: Record<string, string>;
  template: string;
  disabled?: boolean;
  label?: string;
}

export const PrintButton = ({
  template,
  paramsToChange,
  disabled,
  label,
}: PrintButton) => {
  const { handleClick, isOpen } = usePrint();
  const print = () => {
    handleClick({
      template: template,
      paramsToChange: paramsToChange,
    });
  };
  return (
    <button
      className="btn btn-primary"
      disabled={isOpen || disabled}
      onClick={print}
    >
      {label ? label : "Imprimir"}
    </button>
  );
};
