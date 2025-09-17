import Loader from "@/components/Loader";
import ProductCard from "@/components/products/ProductCard";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ProductFilter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // local state( update ui/ from url )
  const [filters, setFilters] = useState({
    keyword: queryParams.get("keyword") || "",
    category: queryParams.get("category") || "",
  });

  // update local state (when url chnage)
  useEffect(() => {
    setFilters({
      keyword: queryParams.get("keyword") || "",
      category: queryParams.get("category") || "",
    });
  }, [location.search]);

  // sync url
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.keyword) params.append("keyword", filters.keyword);
    if (filters.category) params.append("category", filters.category);
    navigate(
      { pathname: `/products/filter?${params.toString()}` },
      { replace: true }
    );
  }, [filters, navigate]);

  const { data: products = [], isLoading } = useGetProductsQuery(filters) as {
    data: Product[];
    isLoading: boolean;
  };

  return (
    <div className="w-full py-6">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
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
      )}
    </div>
  );
};

export default ProductFilter;
