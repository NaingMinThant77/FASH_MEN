import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-7">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          image={product?.images[0]?.url || ""}
          price={product.price}
          ratingCount={product.rating_count}
        />
      ))}
    </main>
  );
};

export default ProductList;
