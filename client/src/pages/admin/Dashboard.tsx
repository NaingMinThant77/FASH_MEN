import ProductStatusCard from "@/components/admin/ProductStatusCard";
import ProductChart from "@/components/products/ProductChart";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";

const Dashboard = () => {
  const { data: products = [], isLoading } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
  };

  const totalProductsLength = products.length;
  const featuredProductsLength = products.filter((p) => p.is_feature).length;
  const newArrivalProductsLength = products.filter(
    (p) => p.is_new_arrival
  ).length;
  const instockProductCount = products.reduce(
    (sum, p) => sum + p.instock_count,
    0
  );

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <ProductStatusCard
          title="Total Products"
          value={totalProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Featured Products"
          value={featuredProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="New Arrivals"
          value={newArrivalProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="In Stock"
          value={instockProductCount}
          isLoading={isLoading}
        />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Product Chart</h2>
        <ProductChart data={products} />
      </div>
    </section>
  );
};

export default Dashboard;
