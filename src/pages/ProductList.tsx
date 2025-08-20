import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { products as allProducts } from "../data/products";
import { Product } from "../types/Product";
import "./ProductList.css";

const sortFunctions: Record<string, (products: Product[]) => Product[]> = {
  name: (products) =>
    [...products].sort((a, b) => a.name.localeCompare(b.name)),
  price: (products) =>
    [...products].sort((a, b) => (a.basePrice || 0) - (b.basePrice || 0)),
  stock: (products) => [...products].sort((a, b) => b.stock - a.stock),
};

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [supplier, setSupplier] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    filteredProducts.reduce(
      (max, product) => Math.max(max, product.basePrice || 0),
      1000
    ),
  ]);

  // Filtrado y ordenamiento de productos
  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerSearch) ||
          product.sku.toLowerCase().includes(lowerSearch)
      );
    }

    if (supplier) {
      filtered = filtered.filter((product) =>
        product.supplier.toLowerCase().includes(supplier.toLowerCase())
      );
    }

    // Filtrado por rango de precios
    filtered = filtered.filter(
      (product) =>
        (product.basePrice || 0) >= priceRange[0] &&
        (product.basePrice || 0) <= priceRange[1]
    );

    if (sortBy && sortFunctions[sortBy]) {
      filtered = sortFunctions[sortBy](filtered);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortBy, supplier, priceRange]);

  // Handlers de filtros y búsqueda
  const handleCategoryChange = (category: string) =>
    setSelectedCategory(category);
  const handleSupplierChange = (supplier: string) =>
    setSupplier(supplier.toLowerCase().replaceAll(" ", "-"));
  const handleSearchChange = (search: string) => setSearchQuery(search);
  const handleSortChange = (sort: string) => setSortBy(sort);
  const handlePriceRangeChange = (range: [number, number]) =>
    setPriceRange(range);
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSupplier("");
    setPriceRange([
      0,
      allProducts.reduce(
        (max, product) => Math.max(max, product.basePrice || 0),
        1000
      ),
    ]);
    setSortBy("name");
  };

  return (
    <div className="product-list-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-info">
            <h1 className="page-title h2">Catálogo de Productos</h1>
            <p className="page-subtitle p1">
              Descubre nuestra selección de productos promocionales premium
            </p>
          </div>

          <div className="page-stats">
            <div className="stat-item">
              <span className="stat-value p1-medium">
                {filteredProducts.length}
              </span>
              <span className="stat-label l1">productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value p1-medium">6</span>
              <span className="stat-label l1">categorías</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <ProductFilters
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onSupplierChange={handleSupplierChange}
          priceRange={priceRange}
          handlePriceRangeChange={handlePriceRangeChange}
        />

        <div className="filters-actions">
          <button className="btn btn-secondary" onClick={resetFilters}>
            Limpiar todos los filtros
          </button>
        </div>

        {/* Productos */}
        <div className="products-section">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <span className="material-icons">search_off</span>
              <h3 className="h2">No hay productos</h3>
              <p className="p1">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
              <button className="btn btn-primary cta1" onClick={resetFilters}>
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
