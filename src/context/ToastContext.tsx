import "./toast.css";
import { createContext, useContext, useState, ReactNode } from "react";

export interface Toast {
  id: number;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 3s
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Render container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook para usar fácilmente
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
};
