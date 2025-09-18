import Loader from "@/components/Loader";
import ProductCard from "@/components/products/ProductCard";
import {
  useGetProductsMetaQuery,
  useGetProductsQuery,
} from "@/store/slices/productApi";
import type {
  Product,
  ProductFilter as ProductFilterType,
} from "@/types/product";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ProductFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilters = (): ProductFilterType => {
    const queryParams = new URLSearchParams(location.search);
    return {
      keyword: queryParams.get("keyword") || "",
      category: queryParams.get("category") || "",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      colors: queryParams.getAll("colors"),
      sizes: queryParams.getAll("sizes"),
      sortBy: queryParams.get("sortBy") || "",
    };
  };

  // local state ( ui update / from url)
  const [filters, setFilters] = useState(initialFilters);

  // update local state ( when url change )
  useEffect(() => {
    setFilters(initialFilters());
  }, [location.search]);

  // sync url
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.category) params.set("category", filters.category);

    filters.colors?.forEach((color) => params.append("colors", color));
    filters.sizes?.forEach((size) => params.append("sizes", size));

    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);

    const newSearchQuery = params.toString();
    const currentSearchQuery = location.search.slice(1);

    if (newSearchQuery !== currentSearchQuery) {
      const timeoutId = setTimeout(() => {
        navigate(
          { pathname: "/products/filter", search: newSearchQuery },
          { replace: true }
        );
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [filters, navigate, location.search]);

  const { data: products = [], isLoading } = useGetProductsQuery(filters) as {
    data: Product[];
    isLoading: boolean;
  };
  const { data: products_meta } = useGetProductsMetaQuery("none");

  // filter state -> {colors : ["Red","Blue"],sizes : ["S","M"],...}

  const toggleValue = (key: "colors" | "sizes", value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key]; // ["Red","Blue"]
      const newValues = currentValues?.includes(value)
        ? currentValues.filter((x) => x !== value)
        : [...currentValues!, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      category: "",
      colors: [],
      sizes: [],
      minPrice: "",
      maxPrice: "",
      sortBy: "",
    });
    navigate("/products/filter", { replace: true });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.keyword ||
      filters.category ||
      filters.colors!.length > 0 ||
      filters.sizes!.length > 0 ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.sortBy
    );
  }, [filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4">
      {/* Filters Section */}
      <aside className="sm:col-span-3 lg:col-span-2 bg-white rounded-2xl shadow-md p-4 space-y-6">
        <h2 className="text-xl font-bold mb-2">Product Filters</h2>

        {/* Sort By */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Sort By</h3>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="latest">Latest</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {products_meta?.colors.map((color, index) => (
              <label
                key={index}
                className="flex items-center px-2 py-1 border rounded-md cursor-pointer hover:bg-gray-100 transition"
              >
                <input
                  type="checkbox"
                  onChange={() => toggleValue("colors", color)}
                  checked={filters.colors?.includes(color)}
                  className="mr-2 accent-pink-500"
                />
                <span>{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {products_meta?.sizes.map((size, index) => (
              <label
                key={index}
                className="flex items-center px-2 py-1 border rounded-md cursor-pointer hover:bg-gray-100 transition"
              >
                <input
                  type="checkbox"
                  onChange={() => toggleValue("sizes", size)}
                  checked={filters.sizes?.includes(size)}
                  className="mr-2 accent-pink-500"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Price</h3>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={filters.minPrice || 0}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
              placeholder={`Min (${products_meta?.minPrice})`}
              className="w-1/2 border p-2 rounded-md focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="number"
              min={products_meta?.minPrice}
              value={filters.maxPrice || products_meta?.maxPrice}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
              placeholder={`Max (${products_meta?.maxPrice})`}
              className="w-1/2 border p-2 rounded-md focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters ? (
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
            onClick={clearAllFilters}
          >
            Clear Filters
          </button>
        ) : null}
      </aside>

      {/* Products Section */}
      <main className="sm:col-span-9 lg:col-span-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-gray-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="transform transition duration-300 hover:scale-105"
                >
                  <ProductCard
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]?.url}
                    ratingCount={product.rating}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductFilter;
