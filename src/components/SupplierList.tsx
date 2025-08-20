import { useFetch } from "../hooks/useFetch";
import { suppliers as MockSuppliers } from "../data/products";
import { useToast } from "../context/ToastContext";
interface Supplier {
  id: string;
  name: string;
  products: number;
}

export default function SupplierList() {
  const { loading, data, error } = useFetch<Supplier[]>(MockSuppliers, {
    failRate: 0.1,
    minDelay: 500,
    maxDelay: 1500,
  });
  return (
    <div className="filter-section">
      <h3 className="filter-title p1-medium">Proveedores</h3>
      <div className="supplier-list">
        {loading && (
          <div className="loading-spinner">Cargando proveedores...</div>
        )}
        {error && (
          <div className="error-message">Error al cargar proveedores.</div>
        )}
        {!data ||
          (!loading && data.length === 0 && (
            <div className="no-suppliers">No hay proveedores disponibles.</div>
          ))}
        {data &&
          data.map((supplier) => (
            <div key={supplier.id} className="supplier-item">
              <span className="supplier-name l1">{supplier.name}</span>
              <span className="supplier-count l1">{supplier.products}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
